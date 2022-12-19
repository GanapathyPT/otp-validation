from dotenv import load_dotenv
from os import environ, system

load_dotenv()
DEBUG = environ.get("DEBUG", None)

if __name__ == "__main__":
    if DEBUG == "True":
        system("flask --debug run")
    else:
        system("gunicorn app:app")
