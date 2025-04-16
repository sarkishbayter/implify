
# Implify Project Setup

This document outlines the steps to set up and run the Implify project, including the backend (Flask server) and frontend.

## Users

User1: `sarkis`
Password: `sako1234!!`

User2: `omar`
Password: `neumann1234`


## Clone the Repository

    
    git clone https://github.com/sarkishbayter/implify.git
  
  

## Backend Setup (Python Flask)


1.  **Install Python dependencies :**

    ```bash
    pip install -r requirements.txt
    ```


2.  **Run the Flask server:**

    ```bash
    python app.py
    ```

    The server will typically run on `http://127.0.0.1:30000/` 


# Database Setup

  **Import the database:**
  

        
        mysql -u [sql-username] -p < sql/implify_db_dump.sql
      
        
 * Replace `[sql-username]` with your MySQL username.
 * You'll be prompted for your MySQL password.
 * **Important:** user should update the mysql db password from sako1234!!@@ to their machine's mysql password


## Notes

* Ensure that the backend server is running before you run the page.
