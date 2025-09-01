# 🍽️ Restaurant Menu Manager (Flask + PostgreSQL)

A full-stack **Restaurant Menu Management System** built with **Python, Flask, PostgreSQL, and Jinja2 templates**. This project started as a **console application** and was extended into a **web-based manager dashboard** to make managing menu items more interactive and user-friendly.

![Python](https://img.shields.io/badge/Python-3.13-blue.svg)
![Flask](https://img.shields.io/badge/Flask-2.3-green.svg)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-15-blue.svg)
![License](https://img.shields.io/badge/License-MIT-yellow.svg)

## 🚀 Features

* **Add new menu items** with name and price.
* **Delete items** from the menu.
* **Update existing items** (name and/or price).
* **View all menu items** in a responsive table.
* **View a single item** by its ID.
* **Price range display** (lowest to highest item price).
* Styled with **Bootstrap 5** for a modern UI.
* Uses **PostgreSQL** as the backend database.

## 🛠️ Tech Stack

* **Backend:** Python, Flask
* **Database:** PostgreSQL (psycopg2)
* **Templates:** Jinja2 + Bootstrap 5
* **ORM/Logic:** Custom classes (`MenuItem`, `MenuManager`) for database operations
* **Version Control:** Git + GitHub

<details>
  <summary>📂 Project Structure</summary>

```
restaurant_menu/
├── app.py              # Flask application entry point
├── menu_item.py        # MenuItem class (save, update, delete)
├── menu_manager.py     # MenuManager class (get_by_name, all_items)
├── templates/          # Jinja2 templates
│   ├── base.html       # Common layout (Bootstrap)
│   ├── index.html      # Home page
│   ├── menu.html       # Restaurant menu table
│   ├── add_item.html   # Add item form
│   ├── update_item.html# Update item form
│   ├── view_item.html  # Single item details
└── static/             # (Optional) CSS/JS assets
```

</details>

## ⚙️ Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/restaurant-menu-manager.git
cd restaurant-menu-manager
```

### 2. Create a Virtual Environment

```bash
python -m venv venv
source venv/bin/activate  # Mac/Linux
venv\Scripts\activate     # Windows
```

### 3. Install Dependencies

```bash
pip install -r requirements.txt
```

### 4. Configure PostgreSQL

Create a database in PostgreSQL:

```sql
CREATE DATABASE restaurant_menu;
```

Create the table:

```sql
CREATE TABLE Menu_Items (
    item_id SERIAL PRIMARY KEY,
    item_name VARCHAR(30) NOT NULL,
    item_price SMALLINT DEFAULT 0
);
```

Update `app.py` with your PostgreSQL connection details.

### 5. Run the Flask App

```bash
flask run
```
