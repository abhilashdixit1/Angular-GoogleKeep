## Prerequisites

1. Install dependencies `npm install`
2. Run the frontend `npm run start` which shall run on port:4200
3. For backend run all the services from backend project.

On running `npm run serve`, following apis would be available for your use -

1. To authenticate user - POST - http://localhost:3000/auth/v1 - expecting data - { username, password }
2. To check if user is authenticated - POST - http://localhost:3000/auth/v1/isAuthenticated - expecting header - { 'Authorization', `Bearer ${token}` }
3. To get notes - GET - http://localhost:3000/api/v1/notes - expecting header - { 'Authorization', `Bearer ${token}` }
4. To add a note - POST - http://localhost:3000/api/v1/notes - expecting header - { 'Authorization', `Bearer ${token}` } and data - { note }
