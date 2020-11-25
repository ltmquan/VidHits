from flask import Flask, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user, LoginManager, UserMixin
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'thisismysecretkeydonotstealit'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
# db.init_app(app)
db = SQLAlchemy(app)

# login_manager = LoginManager()
# login_manager.login_view = 'login'
# login_manager.init_app(app)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

login_manager = LoginManager()
login_manager.login_view = 'login'
login_manager.init_app(app)

@login_manager.user_loader
def load_user(user_id):
    print("working")
    return User.get(user_id)

@app.route('/')
def index():
    return render_template('index.html')



@app.route('/login')
def login():
    return render_template('login.html')

userName = ''

@app.route('/login', methods=['POST'])
def login_post():
    request_data = request.get_json()
    data = request_data['data']
    email = data['Email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if not user or not check_password_hash(user.password, password):
        return 'Please check your details login again'
    login_user(user, remember=True)
    global userName
    userName = current_user.username
    return 'You have successfully logged in'

@app.route('/signup')
def signup():
    return '<h1>Hello</h1>'

@app.route('/signup', methods=['POST'])
def signup_post():
    request_data = request.get_json()
    data = request_data['data']
    username = data['username']
    email = data['Email']
    password = data['password']

    user = User.query.filter_by(email=email).first()

    if user:
        message = 'User already exists'
        return message

    new_user = User(username=username,email=email, password=generate_password_hash(password, method='sha256'))

    db.session.add(new_user)
    db.session.commit()

    message = 'You have signed up successfully'
    return message

@app.route('/logout')
@login_required
def logout():
    logout_user()
    return redirect(url_for('main.index'))

@app.route('/profile')
# @login_required
def profile():
    # return render_template('profile.html', name=current_user.username)
    global userName
    return userName