from os import environ
from jwt import encode, decode

JWT_SECRET = environ.get("JWT_SECRET")

def generate_token(user):
    payload = {
        'user_id': user.id,
    }
    return str(encode(payload, JWT_SECRET, algorithm='HS256'))


def verify_token(token):
    try:
        token = token.encode('utf-8')
        payload = decode(token, JWT_SECRET, algorithms=['HS256'])
        return payload
    except Exception as e:
        print("ERROR WHILE PARSING TOKEN", e)
        return None