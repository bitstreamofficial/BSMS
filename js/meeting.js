// meeting.js
        class Meeting {
            static checkDailyMeetingAvailability() {
                const currentTime = Utils.getCurrentTime();
                const { start, end, joinTime } = CONFIG.dailyMeetingTime;
                
                if (Utils.isTimeInRange(currentTime, joinTime, end)) {
                    return { available: true, canJoin: true };
                } else if (Utils.isTimeInRange(currentTime, start, end)) {
                    return { available: true, canJoin: false };
                } else {
                    return { available: false, canJoin: false };
                }
            }

            static joinDailyMeeting() {
                const currentTime = Utils.getCurrentTime();
                const user = Auth.getCurrentUser();
                const lateness = Utils.calculateLateness(currentTime, CONFIG.dailyMeetingTime.start);
                
                const entry = {
                    date: Utils.formatDate(new Date()),
                    joinTime: currentTime,
                    lateness: lateness,
                    user: user.username
                };
                
                Storage.addMeetingEntry(entry);
                window.open(CONFIG.meetingLinks.daily, '_blank');
            }

            static joinWeeklyMeeting() {
                window.open(CONFIG.meetingLinks.weekly, '_blank');
            }

            static joinMonthlyMeeting() {
                window.open(CONFIG.meetingLinks.monthly, '_blank');
            }

            static updateMeetingStatus() {
                const status = this.checkDailyMeetingAvailability();
                const statusElement = document.getElementById('dailyMeetingStatus');
                const joinButton = document.getElementById('joinDailyMeeting');
                
                if (status.available && status.canJoin) {
                    statusElement.textContent = 'Available - You can join now!';
                    statusElement.style.color = '#27ae60';
                    joinButton.disabled = false;
                } else if (status.available && !status.canJoin) {
                    statusElement.textContent = 'Meeting in progress - Join time passed';
                    statusElement.style.color = '#f39c12';
                    joinButton.disabled = true;
                } else {
                    statusElement.textContent = 'Not Available';
                    statusElement.style.color = '#e74c3c';
                    joinButton.disabled = true;
                }
            }
        }