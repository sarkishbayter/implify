from flask import Flask, jsonify
import mysql.connector
from flask_cors import CORS

app = Flask(__name__)  # __name__ is a built-in variable in python
CORS(app)

# db configuration
my_db = {
    'host':'localhost',
    'user':'root',
    'password':'sako1234!!@@',
    'database':'implify_db',
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
        cursor = connect.cursor(dictionary=True) # allow to executesql queries and fetch result from db
        try:
            query = """
                select
                    e.fname,
                    e.lname,
                    c.companyName,
                    c.companyColor,
                    e.address,
                    e.city,
                    e.country,
                    e.photo
                from employees e
                left join company c on e.companyId = c.companyId
            """
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

if __name__=='__main__':
   app.run( debug=True, host='0.0.0.0', port=30000 )
# 0.0.0.0 my flask app should be accessible from any ip address on my local network
