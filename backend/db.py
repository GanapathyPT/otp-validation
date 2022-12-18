class User:
    USERS = []

    def __init__(self, email, username, password):
        self.id = len(User.USERS) + 1
        self.email = email
        self.username = username
        self.password = password
        self.verified = False

    def save(self):
        if self not in User.USERS:
            # adding new user
            User.USERS.append(self)
        else:
            # updating existing user
            for user in User.USERS:
                if user.id == self.id:
                    user.email = self.email
                    user.username = self.username
                    user.password = self.password
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
