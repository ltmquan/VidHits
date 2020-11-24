from flask import Flask, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user, LoginManager 
from .models import User
from . import db
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
db = SQLAlchemy()
app.config['SECRET_KEY'] = 'thisismysecretkeydonotstealit'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
db.init_app(app)

login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

from .models import User

@login_manager.user_loader
def load_user(user_id):
    return User.query.get(int(user_id))

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/profile')
@login_required
def profile():
    return render_template('profile.html', name=current_user.name)

@app.route('/login')
def login():
    return render_template('login.html')

@app.route('/login', methods=['POST'])
def login_post():
    request_data = request.get_json()
    data = request_data['data']
    email = data['Email']
    password = data['password']
    print(email)
    print(password)

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return 'Please check your details login again'
    login_user(user)
    return 'You have successfully logged in'

@app.route('/signup')
def signup():
    return '<h1>Hello</h1>'

@app.route('/signup', methods=['POST'])
def signup_post():
    request_data = request.get_json()
    data = request_data['data']
    email = data['Email']
    password = data['password']
    print(email)
    print(password)

    user = User.query.filter_by(email=email).first()

    if user:
        message = 'User already exists'
        return message

    new_user = User(email=email, password=generate_password_hash(password, method='sha256'))

    db.session.add(new_user)
    db.session.commit()

    message = 'You have signed up successfully'
    return message

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))