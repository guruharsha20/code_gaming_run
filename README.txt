CODEQUEST - FRONTEND + SPRING BOOT BACKEND

1. Install Java 17+ and Maven.
2. Open terminal in backend:
   cd backend
   mvn spring-boot:run
3. Keep Spring Boot running on http://localhost:8080
4. Open index.html using VS Code Live Server (recommended).
   Do NOT use file:// if your browser blocks local requests.
5. Register a user, login, choose a language, open levels, write code, check code,
   use AI Tutor, and complete levels.

API base: http://localhost:8080/api

IMPORTANT:
- This starter stores users/progress in memory. Restarting Spring Boot clears them.
- Passwords are plain text in this demo. Do not use this authentication in production.
- The code endpoint only performs simple structure checks; it does NOT execute arbitrary code.
- For a final project, add PostgreSQL, BCrypt/JWT authentication, and an isolated code runner.
