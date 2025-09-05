from flask import Flask, render_template, request, redirect, url_for, flash
from menu_item import MenuItem
from menu_manager import MenuManager
import math

app = Flask(__name__)
app.secret_key = 'your-secret-key-change-this'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/menu')
def menu():
    # search and pagination handled in Python using MenuManager.all_items()
    page = request.args.get('page', 1, type=int)
    search = request.args.get('search', '', type=str).strip()
    per_page = 6

    items = MenuManager.all_items() or []

    # Normalize items to a list of objects with attributes item_name, item_price, description, item_id
    # (we assume your MenuItem/MenuManager returns objects with those attributes)
    if search:
        s = search.lower()
        def item_matches(it):
            name = str(getattr(it, 'item_name', '') or '').lower()
            desc = str(getattr(it, 'description', '') or '').lower()
            return s in name or s in desc
        items = [it for it in items if item_matches(it)]

    total = len(items)
    total_pages = math.ceil(total / per_page) if per_page else 1
    start = (page - 1) * per_page
    end = start + per_page
    paginated = items[start:end]

    pagination = {
        'page': page,
        'per_page': per_page,
        'total': total,
        'total_pages': total_pages,
        'has_prev': page > 1,
        'has_next': page < total_pages,
        'prev_num': page - 1 if page > 1 else None,
        'next_num': page + 1 if page < total_pages else None
    }

    return render_template('menu.html', items=paginated, pagination=pagination, search=search, total_items=total)
@app.route('/search')
def search():
    query = request.args.get('q', '').strip()
    return redirect(url_for('menu', search=query))

@app.route('/item/add', methods=['GET', 'POST'])
def add_item():
    if request.method == 'POST':
        item_name = request.form.get('item_name', '').strip()
        item_price = request.form.get('item_price', '').strip()

        if not item_name:
            flash('Item name is required.', 'error')
            return render_template('add_item.html')

        if not item_price:
            flash('Item price is required.', 'error')
            return render_template('add_item.html')

        try:
            item_price = int(item_price)
            if item_price < 0:
                flash('Price cannot be negative.', 'error')
                return render_template('add_item.html')
        except ValueError:
            flash('Price must be a valid number.', 'error')
            return render_template('add_item.html')

        existing_item = MenuManager.get_by_name(item_name)
        if existing_item:
            flash(f'An item with the name "{item_name}" already exists.', 'error')
            return render_template('add_item.html')

        item = MenuItem(item_name, item_price)
        if item.save():
            flash(f'Item "{item_name}" was added successfully!', 'success')
            return redirect(url_for('menu'))
        else:
            flash('There was an error adding the item.', 'error')

    return render_template('add_item.html')

@app.route('/item/delete/<int:item_id>')
def delete_item(item_id):
    items = MenuManager.all_items()
    item_to_delete = None
    for item in items:
        if getattr(item, 'item_id', None) == item_id:
            item_to_delete = item
            break

    if not item_to_delete:
        flash('Item not found.', 'error')
        return redirect(url_for('menu'))

    if item_to_delete.delete():
        flash(f'Item "{item_to_delete.item_name}" was deleted successfully!', 'success')
    else:
        flash('There was an error deleting the item.', 'error')

    return redirect(url_for('menu'))

@app.route('/item/update/<int:item_id>', methods=['GET', 'POST'])
def update_item(item_id):
    items = MenuManager.all_items()
    item = None
    for i in items:
        if getattr(i, 'item_id', None) == item_id:
            item = i
            break

    if not item:
        flash('Item not found.', 'error')
        return redirect(url_for('menu'))

    if request.method == 'POST':
        new_name = request.form.get('item_name', '').strip()
        new_price = request.form.get('item_price', '').strip()

        if not new_name:
            flash('Item name is required.', 'error')
            return render_template('update_item.html', item=item)

        if not new_price:
            flash('Item price is required.', 'error')
            return render_template('update_item.html', item=item)

        try:
            new_price = int(new_price)
            if new_price < 0:
                flash('Price cannot be negative.', 'error')
                return render_template('update_item.html', item=item)
        except ValueError:
            flash('Price must be a valid number.', 'error')
            return render_template('update_item.html', item=item)

        if new_name != item.item_name:
            existing_item = MenuManager.get_by_name(new_name)
            if existing_item:
                flash(f'An item with the name "{new_name}" already exists.', 'error')
                return render_template('update_item.html', item=item)

        if item.update(new_name, new_price):
            flash('Item was updated successfully!', 'success')
            return redirect(url_for('menu'))
        else:
            flash('There was an error updating the item.', 'error')

    return render_template('update_item.html', item=item)

@app.route('/item/view/<int:item_id>')
def view_item(item_id):
    items = MenuManager.all_items()
    item = None
    for i in items:
        if getattr(i, 'item_id', None) == item_id:
            item = i
            break

    if not item:
        flash('Item not found.', 'error')
        return redirect(url_for('menu'))

    return render_template('view_item.html', item=item)


@app.route('/stats')
def stats():
    # Compute statistics and prepare chart data from MenuManager.all_items()
    items = MenuManager.all_items() or []
    prices = []
    names = []
    for it in items:
        try:
            p = float(getattr(it, 'item_price', 0) or 0)
        except (TypeError, ValueError):
            p = 0.0
        prices.append(p)
        names.append(getattr(it, 'item_name', 'Unknown'))

    total_items = len(items)
    avg_price = round(sum(prices) / total_items, 2) if total_items else 0
    min_price = round(min(prices), 2) if prices else 0
    max_price = round(max(prices), 2) if prices else 0

    # Price distribution buckets
    buckets = ['Under $10', '$10-$19.99', '$20-$29.99', '$30+']
    counts = [0, 0, 0, 0]
    for p in prices:
        if p < 10:
            counts[0] += 1
        elif p < 20:
            counts[1] += 1
        elif p < 30:
            counts[2] += 1
        else:
            counts[3] += 1

    # Top 5 priced items
    items_with_price = [(getattr(it, 'item_name', 'Unknown'), float(getattr(it, 'item_price', 0) or 0)) for it in items]
    items_with_price.sort(key=lambda x: x[1], reverse=True)
    top_items = items_with_price[:5]
    top_labels = [t[0] for t in top_items]
    top_values = [t[1] for t in top_items]

    chart = {
        'price_dist_labels': buckets,
        'price_dist_counts': counts,
        'top_labels': top_labels,
        'top_values': top_values
    }

    stats = {
        'total_items': total_items,
        'avg_price': avg_price,
        'min_price': min_price,
        'max_price': max_price
    }

    return render_template('stats.html', stats=stats, chart=chart)


if __name__ == '__main__':
    app.run(debug=True)
