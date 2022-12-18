from flask import Flask, request
from db import User

app = Flask(__name__)

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
    user.save()

    return {'message':'User Created'}, 201

if __name__ == '__main__':
    app.run(debug=True, port=5000)