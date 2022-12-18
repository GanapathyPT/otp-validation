from os import environ
from db import User
from requests import post

SERVER_URL = environ.get("SERVER_URL")
GETOTP_API_KEY = environ.get("GETOTP_API_KEY")
GETOTP_AUTH_TOKEN = environ.get("GETOTP_AUTH_TOKEN")

OTP_URL = "https://otp.dev/api/"

def send_otp(user: User):
    files = {
        'channel': (None, 'email'),
        'email': (None, user.email),
        'callback_url': (None, SERVER_URL + "/api/otp/verify"),
        'success_redirect_url': (None, SERVER_URL + "/api/otp/success"),
        'fail_redirect_url': (None, SERVER_URL + "/api/otp/failure"),
        'metadata': (None, user.id),
        'embed': (None, 'compact'),
    }

    data = post(OTP_URL + "verify/", files=files, auth=(GETOTP_API_KEY, GETOTP_AUTH_TOKEN))
    data = data.json()

    user._add_otp(data)
    return data.get("link")
