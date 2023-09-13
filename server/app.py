from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import app, db  # Import your app and db instances from config.py
from models import Sales, Category  # Import your database models

@app.route('/')
def index():
    return render_template('index.html')  # Serve your frontend index.html or home page

@app.route('/api/sales', methods=['GET'])
def get_sales():
    sales = Sales.query.all()  # Fetch all sales data from the database
    sales_data = [{'id': sale.id, 'product_name': sale.product_name, 'price': sale.price} for sale in sales]
    return jsonify(sales_data)

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()  # Fetch all categories from the database
    category_data = [{'id': category.id, 'name': category.name, 'description': category.description} for category in categories]
    return jsonify(category_data)

if __name__ == '__main__':
    app.run(port=5555, debug=True)
