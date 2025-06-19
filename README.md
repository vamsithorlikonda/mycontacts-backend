The detailed steps followed to build a Node.js Express project from scratch are as follows:

1. **Project Initialization and Setup**  
   - Created a new directory for the backend project.  
   - Initialized the project with `npm init` to generate `package.json`.  
   - Created `.gitignore` to exclude `node_modules` and `.env` files.  

2. **Installing Dependencies and Creating Server**  
   - Installed Express.js for server creation and Nodemon for auto-restarting on file changes.  
   - Created a basic Express server in `server.js`.  
   - Configured the server to listen on a port (initially hardcoded, then moved to an environment variable using `.env` file and `dotenv` package).  

3. **Testing APIs with Thunder Client**  
   - Installed Thunder Client VS Code extension to test HTTP requests directly inside the IDE.  
   - Tested routes like GET `/api/contacts` and configured responses.  

4. **Routing and Controllers Setup**  
   - Created modular routes (in `routes/contactRoutes.js`) to organize API endpoints.  
   - Moved route handlers’ logic to separate controllers (`controllers/contactController.js`) for better maintainability.  
   - Defined CRUD routes: GET (all and by ID), POST, PUT, DELETE for contacts.  

5. **Middleware and Error Handling**  
   - Used Express middleware `express.json()` to parse incoming JSON request bodies.  
   - Implemented custom error handling middleware to catch errors and respond with JSON messages instead of HTML.  
   - Created detailed error responses with status codes using a constants file to standardize error handling.  

6. **Asynchronous Handling with express-async-handler**  
   - Introduced `express-async-handler` to simplify error handling in async route functions without repetitive try-catch blocks.  

7. **MongoDB and Mongoose Integration**  
   - Created a free cluster on MongoDB Atlas, set up user authentication and whitelisted IP addresses.  
   - Installed Mongoose and established database connection using a config file (`config/dbConnection.js`).  
   - Defined a Mongoose schema and model for contacts with fields like name, email, phone, and timestamps.  

8. **CRUD Operations with Database**  
   - Updated controllers to interact with MongoDB via Mongoose methods (`find`, `findById`, `create`, `findByIdAndUpdate`, `deleteOne`).  
   - Tested creating, fetching, updating, and deleting contacts stored persistently in the database.  

9. **User Authentication Setup**  
   - Created user registration and login routes and controllers.  
   - Defined a user Mongoose schema including fields for username, email, password, and ensured email uniqueness.  
   - Implemented password hashing using `bcrypt` during user registration to securely store passwords.  

10. **JWT-based Authentication**  
    - Installed and configured `jsonwebtoken` to issue JWT tokens on successful login.  
    - Created tokens embedding user info (username, email, ID) with an expiration time, stored secret in `.env`.  
    - Implemented login logic to validate user credentials and return JWT tokens.  

11. **Protecting Routes with Middleware**  
    - Developed a custom middleware (`validateTokenHandler.js`) that extracts tokens from request headers, verifies them using JWT, and attaches decoded user info to request objects.  
    - Applied this middleware globally to contact routes to ensure only authenticated users can access CRUD operations.  

12. **User Authorization on Data Access**  
    - Extended contact schema to include a reference to the `userId` indicating ownership.  
    - Modified CRUD operations to filter contacts by the authenticated user's ID, preventing cross-user data access.  
    - Added checks in update and delete operations to ensure a user can only modify or delete their own contacts, throwing 403 Forbidden errors when violated.  

13. **API Testing and Validation**  
    - Used Thunder Client to test registration, login, and protected APIs with JWT tokens.  
    - Demonstrated token expiry handling and re-login for refreshing tokens.  
    - Showed error scenarios like missing fields, unauthorized access, and duplicate user registration.  

14. **Code Optimization and Best Practices**  
    - Simplified route handler declarations by chaining methods.  
    - Made modular and reusable utilities, organized files in folders (`routes`, `controllers`, `models`, `middleware`, `config`).  
    - Used environment variables to keep sensitive data out of the source code.  
