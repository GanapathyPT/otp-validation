class User:
    USERS = []

    def __init__(self, email: str, username: str, password: str):
        self.id = len(User.USERS) + 1
        self.email = email
        self.username = username
        self.password = password
        self.is_verified = False
        self.is_otp_in_progress = False

    def add_otp(self, id: str, secret: str, link: str):
        self.is_otp_in_progress = True
        self._otp_id = id
        self._otp_secret = secret
        self._otp_redirect_url = link

    def remove_otp(self):
        self.is_otp_in_progress = False
        self._otp_id = None
        self._otp_secret = None
        self._otp_redirect_url = None

    def verify_otp(self, otp_id: str, otp_secret: str, auth_status: str):
        if self.is_otp_in_progress and  \
            auth_status == "verified" and \
            otp_secret == self._otp_secret and \
            otp_id == self._otp_id:
                self.is_verified = True
                self.is_otp_in_progress = False
                self.save()
                return True
        return False

    def verify_password(self, password: str):
        return self.password == password

    def get_otp_redirect_url(self):
        if self.is_otp_in_progress:
            return self._otp_redirect_url
        return None

    def json(self):
        return {
            'id': self.id,
            'email': self.email,
            'username': self.username,
            'verified': self.is_verified,
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
        return f"User(id={self.id}, email={self.email}, username={self.username}, verified={self.is_verified})"


    def __repr__(self):
        return f"User(id={self.id}, email={self.email}, username={self.username}, verified={self.is_verified})"

    @classmethod
    def find_by_id(cls, _id: str):
        for user in User.USERS:
            if user.id == _id:
                return user

    @classmethod
    def find_by_email(cls, email: str):
        for user in User.USERS:
            if user.email == email:
                return user
