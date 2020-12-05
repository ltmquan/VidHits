from flask import Flask, render_template, request
from flask_bootstrap import Bootstrap
from flask_moment import Moment
from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired
from datetime import datetime
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate

app = Flask(__name__)
application  = app
app.config['SECRET_KEY'] = "DuongXinh"
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///history.db'

bootstrap = Bootstrap(app)
moment = Moment(app)
db = SQLAlchemy(app)


class AddForm(FlaskForm):
    name = StringField("Username", validators=[DataRequired()])
    vid = StringField("Video Link (Optional)")
    add = SubmitField("Add")

class Users(db.Model):
    id=db.Column(db.Integer, primary_key =True)
    name = db.Column(db.String(100), unique = True, nullable = False)
    history = db.relationship('History', backref='user_id')

class History(db.Model):
    user = db.Column(db.Integer, db.ForeignKey(Users.id), primary_key = True)
    vid = db.Column(db.String(400), primary_key = True)

@app.shell_context_processor
def make_shell_context():
    return dict(db=db, Users = Users, History = History)
    
@app.errorhandler(404)
def page_not_found(e):
    return render_template('404.html'), 404


@app.errorhandler(500)
def internal_server_error(e):
    return render_template('500.html'), 500

@app.route('/', methods = ['POST', 'GET'])
def index(): 
    form = AddForm()
   
    if request.method == "POST":
        name = form.name.data
        vid = form.vid.data

        foundUser= Users.query.filter_by(name=name).first()
        if form.add.data:
            if foundUser is None: #if the user name is already in the db
                newUser = Users(name = name)
                db.session.add(newUser)
                db.session.commit()
                id=newUser.id
            else: 
                id=foundUser.id

            newHistory = History(user=id, vid=vid)
            db.session.add(newHistory)
            db.session.commit()
       
    users = Users.query.all()
    history= History.query.all()
    form.name.data = ''
    form.vid.data=''
    return render_template('index.html', form = form, users = users, history=history)

