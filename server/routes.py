from flask import Blueprint, jsonify
from flask_login import login_required, current_user  # Import Flask-Login's current_user
from app.models import User, Category, Sales  # Import your models

api = Blueprint('api', __name__)

# Routes for fetching data (sales and categories)

@api.route('/api/sales', methods=['GET'])
@login_required  # Require authentication for this route
def get_sales():
    if not current_user.is_authenticated:
        return jsonify({'message': 'Unauthorized'}), 401

    sales = Sales.query.all()  # Fetch all sales data from the database
    sales_data = [{'id': sale.id, 'product_name': sale.product_name, 'price': sale.price} for sale in sales]
    return jsonify(sales_data)

@api.route('/api/categories', methods=['GET'])
@login_required  # Require authentication for this route
def get_categories():
    if not current_user.is_authenticated:
        return jsonify({'message': 'Unauthorized'}), 401

    categories = Category.query.all()  # Fetch all categories from the database
    category_data = [{'id': category.id, 'name': category.name, 'description': category.description} for category in categories]
    return jsonify(category_data)
