from flask import Flask, render_template, request, jsonify, session, make_response
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import app, db 
from models import Sales, Category 
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from models import User, Category, Sales  
from flask_cors import CORS


CORS(app)

@app.route('/')
def index():
    return render_template('Home.jsx')  # Serve frontend index.html or home page

@app.route('/sales', methods=['GET'])
def get_sales():
    sales = Sales.query.all()  # Fetch all sales data from the database
    sales_data = [{'id': sale.id, 'product_name': sale.product_name, 'price': sale.price} for sale in sales]
    return jsonify(sales_data)
    

@app.route('/api/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()  # Fetch all categories from the database
    category_data = [{'id': category.id, 'name': category.name, 'description': category.description} for category in categories]
    return jsonify(category_data)

@app.route('/add_to_cart', methods=['POST']) 
def add_to_cart():
    data = request.get_json()
    item_id = data.get('item_id')

    item = Sales.query.filter_by(id=item_id).first()
    if item:
        print(f'Added item to cart: {item.product_name}')
        return jsonify({'message': 'Item added to cart successfully'}), 200
    else:
        return jsonify({'message': 'Item not found'}), 404

@app.route('/remove_from_cart', methods=['POST'])
@login_required
def remove_from_cart():
    data = request.get_json()
    item_id = data.get('item_id')

    # Implement your logic to remove the item from the cart (e.g., update the cart in the database)

    return jsonify({'message': 'Item removed from cart successfully'}), 200

@app.route('/update_cart_item', methods=['POST'])
@login_required
def update_cart_item():
    data = request.get_json()
    item_id = data.get('item_id')
    new_quantity = data.get('quantity')

    # Implement your logic to update the quantity of the item in the cart (e.g., update the cart in the database)

    return jsonify({'message': 'Cart item quantity updated successfully'}), 200

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email= data['email']
    password_hash = data['password']

    user = User.query.filter_by(email=email).first()
    if user and user.authenticate(password_hash):
        session['user_id'] = user.id
        return jsonify({'message': 'Login successful'}), 200
    else:
        return jsonify({'message': 'Invalid username or password'}), 401

@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    email = data['email']
    password = data['password']

    existing_user = User.query.filter_by(email=email).first()
    if existing_user:
        return jsonify({'message': 'Username already exists. Please choose a different username.'}), 409

   
    new_user = User(email=email, password_hash=password)
    db.session.add(new_user)
    db.session.commit()
    session['user_id'] = new_user.id

    return jsonify({'message': 'User registered and logged in successfully'}), 201

@app.route('/logout', methods=['DELETE'])
def delete():
    if session.get('user_id'):
        session['user_id'] = None
    return make_response({},204)

@app.route('/UpdateEmail', methods = ['PATCH'])
def Patch ():
    user_id = session.get("user_id")
    if session.get('user_id'):
        data = request.get_json()
        new_email = data["email"]
        user = User.query.get(user_id)
        print(user)
        if user:
            user.email = new_email
            db.session.commit()
            return jsonify({'message': 'Updated'}), 200
        

if __name__ == '__main__':
    app.run(port=5555, debug=True)
