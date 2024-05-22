# Setting Up a Heroku App
## Update Config Var Section in the future

1. Make an account with Heroku. Then go to app page: https://dashboard.heroku.com/apps
2. Create new app
![Create new App with Heroku](Images/heroku_setup/create_new_app_heroku.png)
3. Connect your new app with this GitHub Repository
    1. Go to "Deploy" header
    2. Select "GitHub" as deployment method
    3. search for repository to connect to (your heroku account should be connected to your github account)
    4. Connect
![Connect Heroku and Github](Images/heroku_setup/connect_heroku_github.png)
4. Add Heroku Postgres Add-On
    1. Go to "Resources" header
    2. Search for "Heroku Postgres" addon
![Add Heroku Postgres Add-On](Images/heroku_setup/add_heroku_postgres.png)
    3. Submit Order Form (it will take some time for the order to take effect)
![Postgress Order Form](Images/heroku_setup/postgres_order_form.png)
5. Set up Configuration Variables
    1. Go to "Settings" header
    2. Check that DATABASE_URL config var exists
![Initial Database Config Var](Images/heroku_setup/initial_database_config_var.png)
    3. Add new config vars
        1. DB_PRODUCTION = production
        2. SESSION_SECRET = secret
        3. UPDATE THIS IN THE FUTURE
![Final Config Vars](Images/heroku_setup/final_config_vars.png)



