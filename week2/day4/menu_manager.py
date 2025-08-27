from config import get_db_connection
from menu_item import MenuItem

class MenuManager:
    @classmethod
    def get_by_name(cls, name):
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            cur.execute(
                "SELECT * FROM Menu_Items WHERE item_name = %s",
                (name,)
            )
            item = cur.fetchone()
            if item:
                return MenuItem(item[1], item[2])
            return None
        finally:
            cur.close()
            conn.close()

    @classmethod
    def all_items(cls):
        conn = get_db_connection()
        cur = conn.cursor()
        try:
            cur.execute("SELECT * FROM Menu_Items")
            items = cur.fetchall()
            return [MenuItem(item[1], item[2]) for item in items]
        finally:
            cur.close()
            conn.close()