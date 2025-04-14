from flask import Flask, jsonify, request
import bcrypt 
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# db configuration
my_db = {
    'host': 'localhost',
    'user': 'root',
    'password': 'sako1234!!@@',
    'database': 'implify_db',
}

# db connection
def connect_db():
    try:
        connect = mysql.connector.connect(**my_db)
        return connect
    except mysql.connector.Error as err:
        print(f"error connecting to mysql:{err}")
        return None

# close connection
def close_db(connect):
    if connect and connect.is_connected():
        connect.close()

# hash password
def hash_password(password):
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())
    return hashed_password.decode('utf-8')

# get employees based on companies and page 
@app.route('/api/employees/list', methods=['POST'])
def get_employees():
    connect = connect_db()
    if connect:
        cursor = connect.cursor(dictionary=True)
        try:
            data = request.get_json()
            page = data.get('page', 1)
            limit = data.get('limit', 7)
            companies = data.get('companies')
            offset = (page - 1) * limit

            query = """
                SELECT
                    e.Id,
                    e.fname,
                    e.lname,
                    c.companyName,
                    c.companyColor,
                    e.address,
                    e.city,
                    e.country,
                    e.photo
                FROM employees e
                LEFT JOIN company c ON e.companyId = c.companyId
            """
            params = []
            if companies and len(companies) > 0:
                query += " WHERE c.companyName IN (" + ",".join(["%s"] * len(companies)) + ")"
                params.extend(companies)
            query += " LIMIT %s OFFSET %s"
            params.extend([limit, offset])

            cursor.execute(query, params)
            employees_data = cursor.fetchall()
            employee_list = []
            for emp in employees_data:
                employee = {
                    'fname': emp['fname'],
                    'lname': emp['lname'],
                    'company': emp['companyName'],
                    'address': emp['address'],
                    'country': emp['country'],
                    'city': emp['city'],
                    'color': emp['companyColor'],
                    'photo': emp['photo'],
                    'employeeId': emp['Id'],
                }
                employee_list.append(employee)

            # Count total employees
            count_query = """
                SELECT COUNT(*) as total FROM employees e
                LEFT JOIN company c ON e.companyId = c.companyId
            """
            count_params = []
            if companies and len(companies) > 0:
                count_query += " WHERE c.companyName IN (" + ",".join(["%s"] * len(companies)) + ")"
                count_params.extend(companies)
                cursor.execute(count_query, count_params) 
            else:
                cursor.execute(count_query)

            total_employees = cursor.fetchone()['total']

            cursor.close()
            close_db(connect)
            return jsonify({'employees': employee_list, 'total': total_employees})

        except mysql.connector.Error as err:
            print(f"error fetching employees: {err}")
            cursor.close()
            close_db(connect)
            return jsonify({"error": "Failed to fetch employees"}), 500
    else:
        return jsonify({"error": "Could not connect to the database"}), 500

#get companies 
@app.route('/api/companies')
def get_companies():
    connect = connect_db()
    if connect:
        cursor = connect.cursor(dictionary=True)
        try:
            query = """
                SELECT * FROM company
            """
            cursor.execute(query)
            companies_data = cursor.fetchall()
            all_companies = []
            for comp in companies_data:
                company = {
                    'name': comp['companyName'],
                    'color': comp['companyColor'],
                    'id': comp['companyId'],
                }
                all_companies.append(company)
            cursor.close()
            close_db(connect)
            return jsonify(all_companies)
        except mysql.connector.Error as err:
            print(f"error fetching companies:{err}")
            cursor.close()
            close_db(connect)
            return jsonify({"error": "failed to fetch companies"}), 500
    else:
        return jsonify({"error": "Could not connect to the database"}), 500

    
#delete employee based on id 
@app.route('/api/employees/<int:employee_id>', methods=['DELETE'])
def delete_employee(employee_id):
    connect = connect_db()
    if connect:
        cursor = connect.cursor()
        try:
            query = "DELETE FROM employees WHERE Id = %s"
            cursor.execute(query, (employee_id,))
            connect.commit()
            cursor.close()
            close_db(connect)
            return jsonify({"message": "Employee deleted successfully"}), 200
        except mysql.connector.Error as err:
            print(f"Error deleting employee: {err}")
            cursor.close()
            close_db(connect)
            return jsonify({"error": "Failed to delete employee"}), 500
    else:
        return jsonify({"error": "Could not connect to the database"}), 500
    

# add employee 
@app.route('/api/employees/add',methods=['POST'])  
def add_employee():
    connect = connect_db()
    if connect:
        cursor = connect.cursor()
        try:
            data = request.get_json() # lot of data --> prefered json form 
            fname = data.get('fname')
            lname = data.get('lname')
            employee_id = data.get('id')
            company_id = data.get('companyId')
            address = data.get('address')
            city = data.get('city')
            country = data.get('country')
            photo = data.get('photo')

            query = """
                INSERT INTO employees (Id, fname, lname, companyId, address, city, country, photo)
                VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            """
            cursor.execute(query, (employee_id, fname, lname, company_id, address, city, country, photo))
            connect.commit()
            cursor.close()
            close_db(connect)
            return jsonify({"message": "Employee added successfully"}), 201
        except mysql.connector.Error as err:
            print(f"Error adding employee: {err}")
            cursor.close()
            close_db(connect)
            return jsonify({"error": "Failed to add employee"}), 500
    else:
        return jsonify({"error": "Could not connect to the database"}), 500

#edit employees based on id 
@app.route('/api/employees/<int:employee_id>', methods=['PUT'])
def edit_employee(employee_id):
    connect = connect_db()
    if connect:
        cursor = connect.cursor()
        try:
            data = request.get_json()
            fname = data.get('fname')
            lname = data.get('lname')
            company_id = data.get('companyId')
            address = data.get('address')
            city = data.get('city')
            country = data.get('country')
            photo = data.get('photo')

            query = """
                UPDATE employees
                SET fname = %s, lname = %s, companyId = %s, address = %s, city = %s, country = %s, photo = %s
                WHERE Id = %s
            """
            cursor.execute(query, (fname, lname, company_id, address, city, country, photo, employee_id))
            connect.commit()
            cursor.close()
            close_db(connect)
            return jsonify({"message": "Employee updated successfully"}), 200
        except mysql.connector.Error as err:
            print(f"Error updating employee: {err}")
            cursor.close()
            close_db(connect)
            return jsonify({"error": "Failed to update employee"}), 500
    else:
        return jsonify({"error": "Could not connect to the database"}), 500

# users login
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    if not username or not password:
        return jsonify({'success': False, 'message': 'Username and password are required'}), 400

    connection = connect_db()
    if connection:
        cursor = connection.cursor(dictionary=True)
        try:
            query = "SELECT * FROM users WHERE username = %s"
            cursor.execute(query, (username,))
            user = cursor.fetchone()

            if user:
                password_from_db = user['password'].encode('utf-8')
                password_from_form = password.encode('utf-8')

                if bcrypt.checkpw(password_from_form, password_from_db):
                    return jsonify({'success': True, 'message': 'Login successful'}), 200
                else:
                    return jsonify({'success': False, 'message': 'Invalid username or password'}), 401
            else:
                return jsonify({'success': False, 'message': 'Invalid username or password'}), 401

        except mysql.connector.Error as err:
            print(f"Error executing query: {err}")
            return jsonify({'success': False, 'message': 'Database error'}), 500
        finally:
            cursor.close()
            close_db(connection)
    else:
        return jsonify({'success': False, 'message': 'Database connection failed'}), 500


if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=30000)