from enum import unique
from flask import Flask, render_template, redirect, url_for, request, flash, json, jsonify
from sqlalchemy.orm import backref
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user, LoginManager, UserMixin
from flask_sqlalchemy import SQLAlchemy 
from flask_cors import CORS
from collections import defaultdict

app = Flask(__name__)
CORS(app)

app.config['SECRET_KEY'] = 'thisismysecretkeydonotstealit'
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
db = SQLAlchemy(app)
db.init_app(app)


class User(UserMixin, db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True)
    email = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    videos = db.relationship('Video', backref='owner')

class Video(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    video_url = db.Column(db.String(100), nullable=False)
    snippet_title = db.Column(db.String(300), nullable=False)
    snippet_channelTitle = db.Column(db.String(300), nullable=False)
    snippet_thumbnail = db.Column(db.String(300), nullable=False)
    snippet_description = db.Column(db.String(500), nullable=False)
    owner_id = db.Column(db.Integer, db.ForeignKey('user.id'))

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
# @login_required
def logout():
    logout_user()
    return 'User is logged out successfully'

@app.route('/profile')
# @login_required
def profile():
    # return render_template('profile.html', name=current_user.username)
    global userName
    return userName

@app.route('/addVideo' ,methods=['POST'])
def addVideo():
    request_data = request.get_json()
    video_url = request_data['video_url']
    user_name = request_data['user_name']
    snippet_title = request_data['snippet_title']
    snippet_channelTitle = request_data['snippet_channelTitle']
    snippet_thumbnail = request_data['snippet_thumbnail']
    snippet_description = request_data['snippet_description']

    video = Video.query.filter_by(video_url=video_url).first()
    current_user = User.query.filter_by(username=user_name).first()
    if video and video in current_user.videos:
        message = 'Video already added to history database'
        return message

    new_video = Video(video_url=video_url, snippet_title=snippet_title, snippet_channelTitle=snippet_channelTitle, snippet_thumbnail= snippet_thumbnail, snippet_description= snippet_description, owner= current_user)
    db.session.add(new_video)
    db.session.commit()
    return 'Hello'

@app.route('/viewhistory')
def history():
    global userName
    current_user = User.query.filter_by(username=userName).first()
    video_history = defaultdict(str)
    index = 1
    for video in current_user.videos:
        videoDict = {}
        videoDict['id'] = video.id
        videoDict['video_url'] = video.video_url
        videoDict['snippet_title'] = video.snippet_title
        videoDict['snippet_channelTitle'] = video.snippet_channelTitle
        videoDict['snippet_thumbnail'] = video.snippet_thumbnail
        videoDict['snippet_description'] = video.snippet_description
        video_history['video' + str(index)] = videoDict
        index += 1
    return jsonify(video_history)

@app.route('/deleteVideo/<int:id>', methods=["DELETE"])
def delete(id):
    video_to_delete = Video.query.filter_by(id=id).first()
    try:
        db.session.delete(video_to_delete)
        db.session.commit()
        return 'Delete successfully'
    except:
        return 'There was a problem deleting the video'