from random import randint, choice as rc
from faker import Faker
from app import app
from models import db, Sales, Category, User
# from sqlalchemy import create_engine, Column, Integer, String, ForeignKey
# from sqlalchemy.orm import sessionmaker, relationship
# from sqlalchemy.ext.declarative import declarative_base
from werkzeug.security import generate_password_hash, check_password_hash

# sample_user = User(username='sample_user', password='password123')
# sample_category1 = Category(name='Shirts')
# sample_category2 = Category(name='Skirts')
# sample_sale1 = Sales(product_name='Shirt A', price=20, category=sample_category1)
# sample_sale2 = Sales(product_name='Skirt B', price=30, category=sample_category2)

# session.add_all([sample_user, sample_category1, sample_category2, sample_sale1, sample_sale2])
# session.commit()

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

        sample_user = User(password="123", email="123@gmail.com")
        sample_category1 = Category(name='Shirts')
        sample_category2 = Category(name='Skirts')
        sample_sale1 = Sales(product_name='Shirt A', price=20, category=sample_category1,description="cool",quantity=2 )
        sample_sale2 = Sales(product_name='Skirt B', price=30, category=sample_category2, description="awesome", quantity=3)

        db.session.add_all([sample_user, sample_category1, sample_category2, sample_sale1, sample_sale2])
        db.session.commit()

        print("Database seeded successfully.")
