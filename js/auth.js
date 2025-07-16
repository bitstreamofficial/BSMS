class Auth {
    static login(username, password) {
        if (CONFIG.users[username] && CONFIG.users[username] === password) {
            const user = { 
                username, 
                loginTime: new Date().toISOString(),
                lastActivity: new Date().toISOString()
            };
            Storage.setUser(user);
            return { success: true, user };
        }
        return { success: false, message: 'Invalid credentials' };
    }

    static logout() {
        Storage.removeUser();
        return true;
    }

    static getCurrentUser() {
        return Storage.getUser();
    }

    static isAuthenticated() {
        const user = Storage.getUser();
        if (!user) return false;
        
        // Check if session is still valid (24 hours)
        const lastActivity = new Date(user.lastActivity);
        const now = new Date();
        const timeDiff = now - lastActivity;
        const hoursDiff = timeDiff / (1000 * 60 * 60);
        
        if (hoursDiff > 24) {
            this.logout();
            return false;
        }
        
        // Update last activity
        user.lastActivity = now.toISOString();
        Storage.setUser(user);
        return true;
    }

    static updateActivity() {
        const user = this.getCurrentUser();
        if (user) {
            user.lastActivity = new Date().toISOString();
            Storage.setUser(user);
        }
    }
}