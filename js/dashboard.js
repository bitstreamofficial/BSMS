// dashboard.js
        class Dashboard {
            static updateStats() {
                const projects = Project.getUserProjects();
                const activeProjects = projects.filter(p => p.status === 'active');
                
                document.getElementById('totalProjects').textContent = projects.length;
                document.getElementById('activeProjects').textContent = activeProjects.length;
                
                // Update attendance rate based on meeting history
                const meetingHistory = Storage.getMeetingHistory();
                const currentUser = Auth.getCurrentUser().username;
                const userMeetings = meetingHistory.filter(m => m.user === currentUser);
                const onTimeMeetings = userMeetings.filter(m => m.lateness === 0);
                const attendanceRate = userMeetings.length > 0 ? 
                    Math.round((onTimeMeetings.length / userMeetings.length) * 100) : 100;
                
                document.getElementById('attendanceRate').textContent = attendanceRate + '%';
            }

            static updateMeetingHistory() {
                const meetingHistory = Storage.getMeetingHistory();
                const currentUser = Auth.getCurrentUser().username;
                const userMeetings = meetingHistory.filter(m => m.user === currentUser);
                
                const tbody = document.getElementById('lateJoinTableBody');
                tbody.innerHTML = '';
                
                userMeetings.forEach(meeting => {
                    const row = document.createElement('tr');
                    const status = meeting.lateness > 0 ? 'Late' : 'On Time';
                    const statusClass = meeting.lateness > 0 ? 'style="color: #e74c3c;"' : 'style="color: #27ae60;"';
                    
                    row.innerHTML = `
                        <td>${meeting.date}</td>
                        <td>${meeting.joinTime}</td>
                        <td>${meeting.lateness > 0 ? meeting.lateness + ' min' : '-'}</td>
                        <td ${statusClass}>${status}</td>
                    `;
                    tbody.appendChild(row);
                });
            }
        }