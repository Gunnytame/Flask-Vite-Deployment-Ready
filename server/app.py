# # export FLASK_APP=app.py
# # export FLASK_RUN_PORT=5555
# # flask db init
# # flask db revision --autogenerate -m 'Create tables' 
# # flask db upgrade 
# # Standard imports/boilerplate setup (We added session)


# from flask_bcrypt import Bcrypt
# from flask import Flask, request, make_response, jsonify, session
# from flask_migrate import Migrate
# from flask_restful import Api, Resource
# from flask_cors import CORS
# from models import db, User
# app = Flask(__name__)
# app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
# app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
# app.json.compact = False
# migrate = Migrate(app, db)
# db.init_app(app)
# api = Api(app)
# CORS(app)
# bcrypt = Bcrypt(app)

# #Used to hash the session data
# app.secret_key = b'\\\xc2,\xc77\xb5\xf7\xb4\xed\xf2|o\x90U\xe7\xb8'


#     # 3.1 Create a login class that inherits from Resource
#     # 3.2 Use api.add_resource to add the '/login' path
#     # 3.3 Build out the post method
#         # 3.3.1 convert the request from json and select the user name sent form the client. 
#         # 3.3.2 Use the name to query the user with a .filter
#         # 3.3.3 If found set the user_id to the session hash
#         # 3.3.4 convert the user to_dict and send a response back to the client 
# class User(Resource):
#     def post(self):
#         form_json = request.get_json()

#         new_user = User(
#             name = form_json['name'],
#             password = form_json['password'],
#         )
#         db.session.add(new_user)
#         db.session.commit()
#         session['user_id'] = new_user.id
#         print(session['user_id'])
#         return make_response(
#             new_user.to_dict(), 201)
# api.add_resource(User, '/Signup')



# class Logout(Resource):
#     def delete(self):
#         if session.get('user_id'):
#             session['user_id'] = None
#             print(session['user_id'])
#         return make_response({}, 204)
# api.add_resource(Logout, '/logout')


# @app.before_request
# def check_session():
#     print(session)
#     if session.get("user_id") is None:
#         session["user_id"] = None
#     else:
#         print("User is logged in")
#         print(session["user_id"])

# class Login(Resource):
#     def post(self):
#         form_json = request.get_json()
#         name = form_json["name"]
#         password = form_json["password"]
#         user = User.query.filter_by(name=name).first()
#         if user and user.authenticate(password):
#             session["user_id"] = user.id
#             return make_response(user.to_dict(), 200)
#         else:
#             return make_response("Invalid Credentials", 401)
        
# api.add_resource(Login, '/signin')

# if __name__ == '__main__':
#     app.run(port=5555)


from flask import Flask, render_template, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from config import app, db 
from models import Sales, Category 
from flask import Blueprint, jsonify
from flask_login import login_required, current_user
from models import User, Category, Sales  
from flask_cors import CORS
import bcrypt

CORS(app)

@app.route('/')
def index():
    return render_template('Home.jsx')  # Serve frontend index.html or home page

# @app.route('/sales', methods=['GET'])
# def get_sales():
#     sales = Sales.query.all()  # Fetch all sales data from the database
#     sales_data = [{'id': sale.id, 'product_name': sale.product_name, 'price': sale.price} for sale in sales]
#     return jsonify(sales_data)

# @app.route('/categories', methods=['GET'])
# def get_categories():
#     categories = Category.query.all()  # Fetch all categories from the database
#     category_data = [{'id': category.id, 'name': category.name, 'description': category.description} for category in categories]
#     return jsonify(category_data)

# api = Blueprint('api', __name__)

# Routes for fetching data (sales and categories)

@app.route('/sales', methods=['GET'])
@login_required  # Require authentication for this route
def get_sales():
    if not current_user.is_authenticated:
        return jsonify({'message': 'Unauthorized'}), 401

    sales = Sales.query.all()  # Fetch all sales data from the database
    sales_data = [{'id': sale.id, 'product_name': sale.product_name, 'price': sale.price} for sale in sales]
    return jsonify(sales_data)

# @app.route('/category', methods=['GET'])
# @login_required  # Require authentication for this route
# def get_categories():
#     if not current_user.is_authenticated:
#         return jsonify({'message': 'Unauthorized'}), 401

#     categories = Category.query.all()  # Fetch all categories from the database
#     category_data = [{'id': category.id, 'name': category.name, 'description': category.description} for category in categories]
#     return jsonify(category_data)

@app.route('/category', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    category_data = [{'id': category.id, 'name': category.name, 'description': category.description, 'items': [{'id': item.id, 'product_name': item.product_name, 'price': item.price} for item in category.items]} for category in categories]
    return jsonify(category_data)
    # Cart Connections made
@app.route('/add_to_cart', methods=['POST']) 
def add_to_cart():
    data = request.get_json()
    item_id = data.get('item_id')

    item = Sales.query.filter_by(id=item_id).first()
    if item:
        # Add the item to the user's cart.
        print(f'Added item to cart: {item.product_name}')
        return jsonify({'message': 'Item added to cart successfully'}), 200
    else:
        return jsonify({'message': 'Item not found'}), 404
# user login and password hashing
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    user = User.query.filter_by(username=username).first()
    if user and bcrypt.checkpw(password.encode('utf-8'), user.password):
        # Password is correct
        login_user(user)
        return jsonify({'message': 'Login successful'}), 200
    else:
        # Invalid username or password
        return jsonify({'message': 'Invalid username or password'}), 401
#         # Example to create a new user with a hashed password
# hashed_password = bcrypt.hashpw('password123'.encode('utf-8'), bcrypt.gensalt())
# # new_user = User(username='john_doe', password=hashed_password)
# db.session.add(new_user)
# db.session.commit()
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Check if the username already exists
    existing_user = User.query.filter_by(username=username).first()
    if existing_user:
        return jsonify({'message': 'Username already exists. Please choose a different username.'}), 409

    # Hash the password
    hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

    # Create a new user
    new_user = User(username=username, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    # Log the user in (create a session)
    login_user(new_user)

    return jsonify({'message': 'User registered and logged in successfully'}), 201
if __name__ == '__main__':
    app.run(port=5555, debug=True)
