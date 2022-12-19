from flask import request
from jwt_token import verify_token
from db import User

def auth_middleware(func):
    def wrapper(*args, **kwargs):
        token = request.headers.get('Authorization', None)
        if not token or not token.startswith('Bearer '):
            return {'message':'Token is missing'}, 401

        token = token[7:]
        try:
            data = verify_token(token)
            user = User.find_by_id(data['user_id'])
            return func(user, *args, **kwargs)
        except:
            return {'message':'Token Invalid'}, 401
    return wrapper