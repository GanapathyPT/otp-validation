from flask import Flask, request
from db import User
from otp import send_otp
from dotenv import load_dotenv
from os import environ

load_dotenv()

app = Flask(__name__)
PORT = environ.get("PORT")
DEBUG = environ.get("DEBUG")

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

if __name__ == '__main__':
    app.run(debug=DEBUG == "True", port=PORT)