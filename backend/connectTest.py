from db_connector import db_connect, db_close

def main():
    conn = db_connect(host='localhost', user='root', password='adminhere', database='task_better')
    if conn:
        try:
            cursor = conn.cursor()
            cursor.execute("SELECT * FROM user")
            rows = cursor.fetchall()
            for row in rows:
                print(row)

        except Exception as e:
            print(f"Error connecting to database: {e}")

        finally:
            db_close(conn)
if __name__ == "__main__":
    main()
