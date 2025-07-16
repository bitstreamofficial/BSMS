// project.js
        class Project {
            static createProject(name, description, members) {
                const project = {
                    id: Utils.generateId(),
                    name,
                    description,
                    members,
                    createdBy: Auth.getCurrentUser().username,
                    createdAt: new Date().toISOString(),
                    activities: [],
                    status: 'active'
                };
                
                Storage.addProject(project);
                return project;
            }

            static getUserProjects() {
                const currentUser = Auth.getCurrentUser().username;
                const allProjects = Storage.getProjects();
                return allProjects.filter(project => 
                    project.members.includes(currentUser) || project.createdBy === currentUser
                );
            }

            static addActivity(projectId, activity) {
                const project = Storage.getProject(projectId);
                if (project) {
                    activity.id = Utils.generateId();
                    activity.user = Auth.getCurrentUser().username;
                    activity.date = new Date().toISOString();
                    project.activities.push(activity);
                    Storage.updateProject(projectId, { activities: project.activities });
                }
            }

            static updateActivity(projectId, activityId, updates) {
                const project = Storage.getProject(projectId);
                if (project) {
                    const activityIndex = project.activities.findIndex(a => a.id === activityId);
                    if (activityIndex !== -1) {
                        project.activities[activityIndex] = { ...project.activities[activityIndex], ...updates };
                        Storage.updateProject(projectId, { activities: project.activities });
                    }
                }
            }

            static deleteActivity(projectId, activityId) {
                const project = Storage.getProject(projectId);
                if (project) {
                    project.activities = project.activities.filter(a => a.id !== activityId);
                    Storage.updateProject(projectId, { activities: project.activities });
                }
            }
        }