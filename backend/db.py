class User:
    USERS = []

    def __init__(self, email, username, password):
        self.id = len(User.USERS) + 1
        self.email = email
        self.username = username
        self.password = password
        self.verified = False
        self.is_otp_in_progress = False

    def _add_otp(self, otp_data):
        self.is_otp_in_progress = True
        self._otp_id = otp_data['otp_id']
        self._otp_secret = otp_data['otp_secret']
        self._otp_redirect_url = otp_data['link']

    def verify_password(self, password):
        return self.password == password

    def json(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'verified': self.verified,
        }

    def save(self):
        if self not in User.USERS:
            # adding new user
            User.USERS.append(self)
        else:
            # updating existing user
            for user in User.USERS:
                if user.id == self.id:
                    user = self
                    break

    def __str__(self):
        return f"User(id={self.id}, email={self.email}, username={self.username}, verified={self.verified})"


    def __repr__(self):
        return f"User(id={self.id}, email={self.email}, username={self.username}, verified={self.verified})"

    @classmethod
    def find_by_id(cls, _id):
        for user in User.USERS:
            if user.id == _id:
                return user

    @classmethod
    def find_by_email(cls, email):
        for user in User.USERS:
            if user.email == email:
                return user
