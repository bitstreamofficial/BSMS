# BitStream Project Management System (BSMS)

A web-based project management system with meeting coordination features.

## Features

- **User Authentication**
  - Secure login/logout functionality
  - Session management
  - User activity tracking

- **Dashboard**
  - Project statistics overview
  - Meeting attendance tracking
  - Real-time meeting status updates

- **Meetings Management**
  - Daily meetings (8:00 PM - 9:00 PM)
  - Weekly meetings (Every Friday)
  - Monthly meetings (First Monday)
  - Automatic meeting availability status
  - Meeting join history tracking

- **Project Management**
  - Create and manage projects
  - Add project members
  - Track project activities
  - Real-time project status updates

## Technology Stack

- HTML5
- CSS3 (with responsive design)
- JavaScript (ES6+)
- Local Storage for data persistence
- Firebase integration ready

## Project Structure

```
├── css/
│   ├── dashboard.css    # Dashboard styles
│   ├── login.css        # Login screen styles
│   ├── main.css         # Base styles
│   ├── meeting.css      # Meeting section styles
│   ├── modal.css        # Modal components
│   ├── project.css      # Project management styles
│   └── responsive.css   # Responsive design rules
├── js/
│   ├── app.js          # Main application logic
│   ├── auth.js         # Authentication handling
│   ├── config.js       # Configuration settings
│   ├── dashboard.js    # Dashboard functionality
│   ├── meeting.js      # Meeting management
│   ├── project.js      # Project management
│   ├── storage.js      # Local storage operations
│   └── utils.js        # Utility functions
└── index.html          # Main entry point
```

## Setup

1. Clone the repository
2. Configure Firebase settings in `js/config.js`
3. Open `index.html` in a modern web browser

## Usage

### Login
- Use predefined credentials:
  - Username: Rafi, Password: rafi123
  - Username: Shakib, Password: shakib123
  - Username: Sabbir, Password: sabbir123

### Creating Projects
1. Navigate to Projects section
2. Click "Create New Project"
3. Fill in project details
4. Select team members
5. Submit the form

### Joining Meetings
1. Go to Meetings section
2. Check meeting availability status
3. Click "Join Meeting" when available
4. Meeting attendance is automatically tracked

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

See [LICENSE](LICENSE) file for details.
