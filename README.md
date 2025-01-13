
# Project Setup Guide

This guide will walk you through setting up the development environment on your machine. The numbered steps are the exact commands you need to run, with explanations provided below each.

---

## Frontend Setup

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Install dependencies

```bash
npm install
```

Run `npm install` to install missing dependencies listed in `package.json`.

### 3. Start the development server

```bash
npm run dev
```

Run `npm run dev` to verify that the dependencies installed correctly. This is also how you will run the frontend.

### 4. Return to the root directory

```bash
cd ..
```

---

## Backend Setup

### 5. Navigate to the backend directory

```bash
cd backend
```

### 6. Create a Python virtual environment

```bash
python -m venv venv
```

Create a Python virtual environment named `venv` in the `backend` directory.

### 7. Activate the virtual environment

- **For Linux or macOS:**

  ```bash
  source venv/bin/activate
  ```

  On Linux or macOS, use the `source` command, and the activation script is located in `venv/bin/`.

- **For Windows:**

  ```bash
  venv\Scripts#ctivate
  ```

  On Windows, the `source` command is not needed, and the script is located in `venv\Scripts\`.

### 8. Install backend dependencies

```bash
pip install -r requirements.txt
```

Install the required Python packages listed in `requirements.txt` into the virtual environment.

---

You're now ready to run the project! 🚀
