import mysql.connector


"""
    Function Name: db_connect(host='localhost', user='root', password='password', database='test')
    Connects to a MySQL database defined by the parameters passed.
    Args:
        host (str): The hostname or IP address of the MySQL server. Default is 'localhost'.
        user (str): The username to authenticate with the MySQL server. Default is 'root'.
        password (str): The password to authenticate with the MySQL server. Default is 'password'.
        database (str): The name of the database to connect to. Default is 'test'.
    Returns:
        conn (mysql.connector.connection.MySQLConnection): The MySQL database connection object if successful, None otherwise.
"""
def db_connect(host='localhost', user='root', password='password', database='test'):
    try:
        conn = mysql.connector.connect(host=host, user=user, password=password, database=database)
        print("Connected to database")
        return conn
    except mysql.connector.Error as e:
        print(f"Error connecting to database: {e}")
        return None
    

"""
    Function Name: db_close(connection)
    closes the database connection defined by the connection parameter.
    Args:
        connection: The database connection object.
"""    
def db_close(connection):
    try:
        if connection:
            connection.close()
            print("Database connection closed")
        else:
            print("No database connection to close")
    except mysql.connector.Error as e:
        print(f"Error closing database connection: {e}")

