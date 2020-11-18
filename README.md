# README
## Deployment instructions
1. Open command prompt, go to desire directory and run the following command to clone the repository:
```
git clone https://github.com/ak2253/E2EE-project
```
2. Change to directory E2EE-project.
3. Make sure that npm and pip is already installed into your computer
4. Run the following commands
```
npm install
pip install -r requirements.txt
```
5.  Create an account on Heroku using the following [link](https://dashboard.heroku.com/).
6. After creating an account, you should be at the app menu. Click on the new button towards the top right and click `create new app` name it what ever you want.
7. You should be at the overboard menu. Click on the `Configure Add-ons` and type `Heorku Postgres` and confirm to the free option. You should not be paying anything.
8. Once the database has been created, you should be at the page where the database has been created. Click on `Settings` and then `View Credientials...` and there should be a URI link. Keep note of that link for a future step.
9. In the root of the repository, create an .env file and make sure the following variables are in the file
```
DATABASE_URL=[Enter url recieved from step 8]
SECREY_KEY=[Enter long and unguessable key]
```
10.  Have to separate command lines open located the the root directory of the repository.
11. One on command line run `npm start`
12. One the other run `python app.py`
13. Step 11 should lead you to a page where the apps runs
## TODO
- Debug any unexpected issues
- Apply End to End Encryption to the app
- Get the app to work on Heroku