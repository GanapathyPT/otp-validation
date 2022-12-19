from flask import Flask, request, render_template
from db import User
from otp import send_otp
from jwt_token import generate_token
from middleware import auth_middleware
from os import environ

app = Flask(__name__,static_folder="static/assets",template_folder="static")
PORT = environ.get("PORT")
DEBUG = environ.get("DEBUG", False)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api')
def hello_world():
    return 'Hello World!'

@app.route('/api/auth/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email', None)
    username = data.get('username', None)
    password = data.get('password', None)

    if not email or not username or not password:
        return {'message':'Invalid Data'}, 400

    if User.find_by_email(email):
        return {'message':'User already exists'}, 400

    user = User(email, username, password)
    if DEBUG:
        user.save()
        return {'otp_url': '/otp-success'}, 201

    redirect_url = send_otp(user)

    if not redirect_url:
        return {'message': 'Failed to send OTP'}, 400

    user.save()
    return {'otp_url': redirect_url}, 201

@app.route('/api/otp/verify', methods=['POST'])
def verify_otp():
    data = request.get_json()
    otp_id = data.get('otp_id', None)
    email = data.get('email', None)
    otp_secret = data.get('otp_secret', None)
    auth_status = data.get('auth_status', None)

    user = User.find_by_email(email)
    if not user:
        return {'message':'User not found'}, 404

    if user.is_otp_in_progress and  \
        auth_status == "verified" and \
        otp_secret == user._otp_secret and \
        otp_id == user._otp_id:
            user.verified = True
            user.is_otp_in_progress = False
            user.save()
            return {'message':'OTP verified'}, 200

    return {'message':'OTP verification failed'}, 400

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email', None)
    password = data.get('password', None)

    if not email or not password:
        return {'message':'Invalid Data'}, 400

    user = User.find_by_email(email)
    if not user:
        return {'message':'User not found'}, 404

    if user.verify_password(password):
        if user.verified or DEBUG:
            return {'verified': True, 'token': generate_token(user)}, 200

        if user.is_otp_in_progress:
            return {'verified': False, 'otp_url': user._otp_redirect_url}, 200
        
        redirect_url = send_otp(user)
        if not redirect_url:
            return {'message': 'Failed to send OTP'}, 400

        user.save()
        return {'verified': False, 'otp_url': redirect_url}, 200

    return {'message':'Invalid Credentials'}, 401

@app.route('/api/me')
@auth_middleware
def me(user):
    return user.json(), 200

if __name__ == '__main__':
    app.run(debug=True, port=PORT)