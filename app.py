from flask import Flask, jsonify, request
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

@app.route('/api/employees')
def get_employees():
    connect = connect_db()
    if connect:
        cursor = connect.cursor(dictionary=True)
        try:
            query = """
                SELECT
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
            companies = request.args.get('companies')
            if companies:
                companies_list = companies.split(',')
                query += " WHERE c.companyName IN (%s)" % ','.join(['%s'] * len(companies_list))
                cursor.execute(query, companies_list)
            else:
                cursor.execute(query)

            employees_data = cursor.fetchall()

            all_employees = []
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
                }
                all_employees.append(employee)

            cursor.close()
            close_db(connect)
            return jsonify(all_employees)
        except mysql.connector.Error as err:
            print(f"error fetching employees: {err}")
            cursor.close()
            close_db(connect)
            return jsonify({"error": "Failed to fetch employees"}), 500
    else:
        return jsonify({"error": "Could not connect to the database"}), 500

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

@app.route('/api/filtered_companies')
def get_filtered_companies():
    connect = connect_db()
    if connect:
        cursor = connect.cursor(dictionary=True)
        try:
            query = "SELECT * FROM company"
            company_ids = request.args.get('ids')
            if company_ids:
                company_ids_list = company_ids.split(',')
                query += " WHERE companyId IN (%s)" % ','.join(['%s'] * len(company_ids_list))
                cursor.execute(query, company_ids_list)
            else:
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
            print(f"error fetching filtered companies:{err}")
            cursor.close()
            close_db(connect)
            return jsonify({"error": "failed to fetch filtered companies"}), 500
    else:
        return jsonify({"error": "Could not connect to the database"}), 500

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=30000)