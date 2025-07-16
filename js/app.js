// app.js
        class App {
            constructor() {
                this.currentSection = 'dashboard';
                this.init();
            }

            init() {
                this.setupEventListeners();
                this.checkAuth();
                this.updateMeetingStatusInterval();
            }

            setupEventListeners() {
                // Login form
                document.getElementById('loginForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleLogin();
                });

                // Logout button
                document.getElementById('logoutBtn').addEventListener('click', () => {
                    this.handleLogout();
                });

                // Navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.addEventListener('click', (e) => {
                        e.preventDefault();
                        this.showSection(link.dataset.section);
                    });
                });

                // Meeting buttons
                document.getElementById('joinDailyMeeting').addEventListener('click', () => {
                    Meeting.joinDailyMeeting();
                    Dashboard.updateMeetingHistory();
                });

                document.getElementById('joinWeeklyMeeting').addEventListener('click', () => {
                    Meeting.joinWeeklyMeeting();
                });

                document.getElementById('joinMonthlyMeeting').addEventListener('click', () => {
                    Meeting.joinMonthlyMeeting();
                });

                // Project modal
                document.getElementById('createProjectBtn').addEventListener('click', () => {
                    this.showModal('createProjectModal');
                });

                document.getElementById('createProjectForm').addEventListener('submit', (e) => {
                    e.preventDefault();
                    this.handleCreateProject();
                });

                // Close modals
                document.querySelectorAll('.close').forEach(closeBtn => {
                    closeBtn.addEventListener('click', () => {
                        this.hideAllModals();
                    });
                });

                // Close modal on outside click
                document.addEventListener('click', (e) => {
                    if (e.target.classList.contains('modal')) {
                        this.hideAllModals();
                    }
                });
            }

            handleLogin() {
                const username = document.getElementById('username').value;
                const password = document.getElementById('password').value;
                const result = Auth.login(username, password);
                
                if (result.success) {
                    this.showDashboard();
                } else {
                    document.getElementById('loginError').textContent = result.message;
                }
            }

            handleLogout() {
                Auth.logout();
                this.showLogin();
            }

            handleCreateProject() {
                const name = document.getElementById('projectName').value;
                const description = document.getElementById('projectDescription').value;
                const memberOptions = document.getElementById('projectMembers').selectedOptions;
                const members = Array.from(memberOptions).map(option => option.value);
                
                if (name.trim()) {
                    Project.createProject(name, description, members);
                    this.hideAllModals();
                    this.updateProjectsList();
                    document.getElementById('createProjectForm').reset();
                }
            }

            checkAuth() {
                if (Auth.isAuthenticated()) {
                    this.showDashboard();
                } else {
                    this.showLogin();
                }
            }

            showLogin() {
                document.getElementById('loginScreen').classList.remove('hidden');
                document.getElementById('dashboardScreen').classList.add('hidden');
                document.getElementById('loginError').textContent = '';
            }

            showDashboard() {
                document.getElementById('loginScreen').classList.add('hidden');
                document.getElementById('dashboardScreen').classList.remove('hidden');
                document.getElementById('currentUser').textContent = Auth.getCurrentUser().username;
                this.showSection('dashboard');
                this.updateAllData();
            }

            showSection(sectionName) {
                // Hide all sections
                document.querySelectorAll('.content-section').forEach(section => {
                    section.classList.add('hidden');
                });
                
                // Show selected section
                document.getElementById(sectionName + 'Section').classList.remove('hidden');
                
                // Update navigation
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                document.querySelector(`[data-section="${sectionName}"]`).classList.add('active');
                
                this.currentSection = sectionName;
                
                // Update section-specific data
                if (sectionName === 'dashboard') {
                    Dashboard.updateStats();
                    Dashboard.updateMeetingHistory();
                } else if (sectionName === 'meetings') {
                    Meeting.updateMeetingStatus();
                } else if (sectionName === 'projects') {
                    this.updateProjectsList();
                }
            }

            updateProjectsList() {
                const projects = Project.getUserProjects();
                const projectsList = document.getElementById('projectsList');
                
                projectsList.innerHTML = '';
                
                projects.forEach(project => {
                    const projectCard = document.createElement('div');
                    projectCard.className = 'project-card';
                    projectCard.innerHTML = `
                        <h3>${project.name}</h3>
                        <p>${project.description || 'No description'}</p>
                        <div class="project-members">
                            ${project.members.map(member => `<span class="member-tag">${member}</span>`).join('')}
                        </div>
                        <p><small>Created by: ${project.createdBy}</small></p>
                    `;
                    
                    projectCard.addEventListener('click', () => {
                        this.showProjectDetails(project.id);
                    });
                    
                    projectsList.appendChild(projectCard);
                });
            }

            showProjectDetails(projectId) {
                const project = Storage.getProject(projectId);
                if (!project) return;
                
                const modal = document.getElementById('projectDetailsModal');
                const content = document.getElementById('projectDetailsContent');
                
                content.innerHTML = `
                    <h2>${project.name}</h2>
                    <p><strong>Description:</strong> ${project.description || 'No description'}</p>
                    <p><strong>Members:</strong> ${project.members.join(', ')}</p>
                    <p><strong>Created by:</strong> ${project.createdBy}</p>
                    <p><strong>Created:</strong> ${Utils.formatDate(project.createdAt)}</p>
                    
                    <h3>Project Activities</h3>
                    <button class="add-activity-btn" onclick="app.addNewActivity('${projectId}')">Add New Activity</button>
                    
                    <table class="activity-table">
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Task</th>
                                <th>Status</th>
                                <th>User</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody id="activityTableBody">
                            ${this.renderActivities(project.activities, projectId)}
                        </tbody>
                    </table>
                `;
                
                modal.classList.remove('hidden');
            }

            renderActivities(activities, projectId) {
                return activities.map(activity => `
                    <tr>
                        <td>${Utils.formatDate(activity.date)}</td>
                        <td>
                            <input type="text" value="${activity.task}" 
                                   onchange="app.updateActivity('${projectId}', '${activity.id}', 'task', this.value)">
                        </td>
                        <td>
                            <select onchange="app.updateActivity('${projectId}', '${activity.id}', 'status', this.value)">
                                <option value="started" ${activity.status === 'started' ? 'selected' : ''}>Started</option>
                                <option value="in-progress" ${activity.status === 'in-progress' ? 'selected' : ''}>In Progress</option>
                                <option value="completed" ${activity.status === 'completed' ? 'selected' : ''}>Completed</option>
                            </select>
                        </td>
                        <td>${activity.user}</td>
                        <td>
                            <button class="delete-btn" onclick="app.deleteActivity('${projectId}', '${activity.id}')">Delete</button>
                        </td>
                    </tr>
                `).join('');
            }

            addNewActivity(projectId) {
                const activity = {
                    task: 'New Task',
                    status: 'started'
                };
                
                Project.addActivity(projectId, activity);
                this.showProjectDetails(projectId); // Refresh the modal
            }

            updateActivity(projectId, activityId, field, value) {
                Project.updateActivity(projectId, activityId, { [field]: value });
            }

            deleteActivity(projectId, activityId) {
                if (confirm('Are you sure you want to delete this activity?')) {
                    Project.deleteActivity(projectId, activityId);
                    this.showProjectDetails(projectId); // Refresh the modal
                }
            }

            showModal(modalId) {
                document.getElementById(modalId).classList.remove('hidden');
            }

            hideAllModals() {
                document.querySelectorAll('.modal').forEach(modal => {
                    modal.classList.add('hidden');
                });
            }

            updateAllData() {
                Dashboard.updateStats();
                Dashboard.updateMeetingHistory();
                Meeting.updateMeetingStatus();
                this.updateProjectsList();
            }

            updateMeetingStatusInterval() {
                // Update meeting status every minute
                setInterval(() => {
                    if (this.currentSection === 'meetings') {
                        Meeting.updateMeetingStatus();
                    }
                }, 60000);
            }
        }

        // Initialize the app
        const app = new App();