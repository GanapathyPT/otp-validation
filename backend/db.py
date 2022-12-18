class User:
    USERS = []

    def __init__(self, email, username, password):
        self.id = len(User.USERS) + 1
        self.email = email
        self.username = username
        self.password = password
        self.verified = False

    def _add_otp(self, otp_data):
        self.is_otp_in_progress = True
        self._otp_id = otp_data['otp_id']
        self._otp_secret = otp_data['otp_secret']
        self._otp_redirect_url = otp_data['link']

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
