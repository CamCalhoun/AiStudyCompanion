
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
  venv/Scripts/activate
  ```

  On Windows, the `source` command is not needed, and the script is located in `venv\Scripts\`.

### 8. Install backend dependencies

```bash
pip install -r requirements.txt
```

Install the required Python packages listed in `requirements.txt` into the virtual environment.

### 9. Verify backend installation

```bash
python main.py
```

This will run run the Python backend. With the frontend still open, send a request to the backend by adding a fruit, if the fruit pops up in the list, the backend is functional.
Alternatively, go to (localhost:8000/fruits), and verify that the fruits object is present.


---

# Running the Project

This section details running the project with dependencies installed.

---

## Frontend

### 1. Navigate to the frontend directory

```bash
cd frontend
```

### 2. Start the development server

```bash
npm run dev
```

---

## Backend

### 3. Navigate to the backend directory

```bash
cd backend
```

### 4. Activate the virtual environment

- **For Linux or macOS:**

  ```bash
  source venv/bin/activate
  ```

  On Linux or macOS, use the `source` command, and the activation script is located in `venv/bin/`.

- **For Windows:**

  ```bash
  venv/Scripts/activate
  ```

  On Windows, the `source` command is not needed, and the script is located in `venv\Scripts\`.

### 5. Run the backend

```bash
python main.py
```

