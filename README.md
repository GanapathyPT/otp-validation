# OTP Validation

sample OTP validation application developed with `Python-Flask` and `TypeScript-ReactJS`

## Setup (Local)

### Backend

- Make sure you are inside `backend` directory
- Create a separate environment using venv
- Activate the environment

```bash
python3 -m venv venv
source venv/bin/activate
```

- Install the dependencies

```bash
pip3 install -r requirements.txt
```

- Copy the `.env.sample` file as `.env` and change the values accordingly
- Now start the server

```bash
python3 index.py
```

You can now see the backend flask app up and running on [localhost:5000](http://localhost:5000/api)

### Frontend

- Make sure you are inside `frontend` directory
- Make sure you have `node` installed
- Now execute the command

```bash
yarn install
yarn run dev
```

You can now see the frontend react app up and running on [localhost:3000](http://localhost:3000)

<hr />

## Build (production)

Just run the script file on the root directory in the project

`build.sh` for linux and `build.bat` for windows

Now that the current `build` created from the frontend is copied to the `static` folder of backend

You can directly visit the application as a standalone app in a single server

Now that the server is ready you can just build a docker image out of it with the specifed `Dockerfile` inside the backend folder

```bash
docker build -t <tagname>:latest .
```

<strong> Note: </strong>

In Local Server to make the `GetOTP` service working, we need add our `localhost` to the domain allowed in `GetOTP` website.

But the website does not support port number within the URL

So, I used [ngrok](https://ngrok.com/) to deploy my local server to a temporary domain provided, added the temporary domain to the website and made the `GetOTP` service to work on local

<hr />

## View Demo

For a live demo of the application, you can visit [https://otp-validation-getotp.up.railway.app/](https://otp-validation-getotp.up.railway.app/)

If the link is not working, I might have ran out of free trail on the OTP or the hosting service 😅
