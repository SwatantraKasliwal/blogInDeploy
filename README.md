# BlogIn

BlogIn is a modern blogging platform built using the **PERN stack** (PostgreSQL, Express.js, React.js, Node.js). This project allows users to create, read and delete blog posts with ease. The application is live and deployed on **Render**.

## 🌟 Features
- **User-Friendly Interface**: Built with React.js for a responsive and intuitive front-end.
- **Powerful Backend**: Node.js and Express.js ensure smooth API operations.
- **Secure Data Storage**: PostgreSQL powers the database for reliability and performance.
- **Full CRUD Support**: Seamlessly manage blog posts.
- **Deployed Online**: Easily accessible with Render hosting.

---

## 🚀 Tech Stack
- **Frontend**: React.js
- **Backend**: Node.js, Express.js
- **Database**: PostgreSQL (deployed on **Neon DB**)
- **Deployment**: Render

---

## 📖 Quick Start
Get the project up and running locally in just a few steps:

### Prerequisites
- **Node.js** and **npm** installed
- **PostgreSQL** installed and running

### Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/SwatantraKasliwal/blogInDeploy.git
   cd blogInDeploy
   ```

2. Install dependencies:
   - **Backend**:
     ```bash
     cd backend
     npm install
     ```
   - **Frontend**:
     ```bash
     cd frontend
     npm install
     ```

3. Set up the database:
   - Create a PostgreSQL database named `blogin`.
   - Execute the SQL scripts located in `backend/db` to create necessary tables.

4. Configure environment variables:
   - **Backend**: Create a `.env` file in the `backend` directory:
     ```env
     DATABASE_URL=your_neon_db_connection_string
     ```
   - **Frontend**: Update the API endpoint in `frontend/src/config.js` if needed.

### Run the Application
1. Start the **backend server**:
   ```bash
   cd backend
   npm start
   ```

2. Start the **frontend development server**:
   ```bash
   cd frontend
   npm run dev
   ```

3. Open your browser and visit: `http://localhost:3000`

---

## 🌍 Deployment
This application is deployed on **Render**:
- **Backend**: [Backend URL]((https://bloginserver.onrender.com))
- **Frontend**: [Frontend URL]((https://blogin-8kyz.onrender.com))
- **Database**: Hosted on **Neon DB**

---

## 📂 Folder Structure
```
blogInDeploy/
├── backend/       # Node.js and Express.js backend
│   ├── queries.sql/        # Database setup scripts   
│   ├── .env       # Backend environment variables
│   └── server.js  # Backend entry point
├── frontend/      # React.js frontend
│   ├── src/       # Source code
│   ├── public/    # Public assets
│   └── .env       # Frontend environment variables (if needed)
└── README.md      # Project documentation
```

---

## 🖼️ Screenshots

![image](https://github.com/user-attachments/assets/9a5ba1bc-a1f5-4f9a-9845-a0990364652b)
![image](https://github.com/user-attachments/assets/27b9b195-0b8d-479b-95f1-6a8ca6627872)
![image](https://github.com/user-attachments/assets/3e614e32-e25e-4fb7-93bb-a51e0e1f03a6)



---

## 🤝 Contributing
Contributions are welcome! If you find a bug or have a suggestion, feel free to open an issue or submit a pull request.

---

## 🙌 Acknowledgements
- **React.js** for the frontend
- **Node.js** and **Express.js** for the backend
- **PostgreSQL** for data storage (hosted on **Neon DB**)
- **Render** for deployment

