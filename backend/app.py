from flask import Flask, request
from db import User

app = Flask(__name__)

@app.route('/api')
def hello_world():
    return 'Hello World!'

@app.route('/api/auth/register')
def register():
    email = request.data.get('email', None)
    username = request.data.get('username', None)
    password = request.data.get('password', None)

    if not email or not username or not password:
        return 'Invalid Data', 400

    if User.find_by_email(email):
        return 'User already exists', 400

    user = User(email, username, password)
    user.save()

    return 'User Created', 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)