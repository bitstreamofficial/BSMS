// storage.js
        class Storage {
            static setUser(user) {
                localStorage.setItem('bitstream_user', JSON.stringify(user));
            }

            static getUser() {
                const user = localStorage.getItem('bitstream_user');
                return user ? JSON.parse(user) : null;
            }

            static removeUser() {
                localStorage.removeItem('bitstream_user');
            }

            static setMeetingHistory(history) {
                localStorage.setItem('bitstream_meetings', JSON.stringify(history));
            }

            static getMeetingHistory() {
                const history = localStorage.getItem('bitstream_meetings');
                return history ? JSON.parse(history) : [];
            }

            static addMeetingEntry(entry) {
                const history = this.getMeetingHistory();
                history.push(entry);
                this.setMeetingHistory(history);
            }

            static setProjects(projects) {
                localStorage.setItem('bitstream_projects', JSON.stringify(projects));
            }

            static getProjects() {
                const projects = localStorage.getItem('bitstream_projects');
                return projects ? JSON.parse(projects) : [];
            }

            static addProject(project) {
                const projects = this.getProjects();
                projects.push(project);
                this.setProjects(projects);
            }

            static updateProject(projectId, updates) {
                const projects = this.getProjects();
                const index = projects.findIndex(p => p.id === projectId);
                if (index !== -1) {
                    projects[index] = { ...projects[index], ...updates };
                    this.setProjects(projects);
                }
            }

            static getProject(projectId) {
                const projects = this.getProjects();
                return projects.find(p => p.id === projectId);
            }
        }