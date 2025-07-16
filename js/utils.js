class Utils {
    static formatDate(date) {
        return new Date(date).toLocaleDateString();
    }

    static formatTime(date) {
        return new Date(date).toLocaleTimeString();
    }

    static getCurrentTime() {
        return new Date().toTimeString().slice(0, 5);
    }

    static isTimeInRange(currentTime, startTime, endTime) {
        return currentTime >= startTime && currentTime <= endTime;
    }

    static calculateLateness(joinTime, expectedTime) {
        const join = new Date(`2000-01-01 ${joinTime}`);
        const expected = new Date(`2000-01-01 ${expectedTime}`);
        const diff = join - expected;
        return diff > 0 ? Math.floor(diff / 60000) : 0;
    }

    static generateId() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    static showNotification(message, type = 'info') {
        // Simple notification system
        const notification = document.createElement('div');
        notification.className = `notification ${type}`;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.remove();
        }, 3000);
    }
}