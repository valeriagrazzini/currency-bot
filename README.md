
  

# Bot - A command line node.js based application

  

  

## Step 1 - Setup the .env file

  

  

In the root of the application folder, rename the **`.env.example`** file to: **`.env`**.

  

Replace the variables values for the postgres database with *your own values* or leave them as is:

  

  

    DB_NAME=bot
    DB_USER=postgres
    DB_PASSWORD=postgres
    DB_HOST=localhost

  

## Step 2 - Install dependencies
from the root of the application, open the terminal and run the command:  `npm install`

  

## Step 3 - Run docker-compose

  

  

in the terminal, run the following command to setup the postgres docker image:

  

  

    docker-compose --env-file .env up

  

  

## Step 4 - run the bot

  

  

check if the database is already up and running, then in the terminal run:

  

  

    npm start

  

  

## Optional params

  

  

The application allows you to configure these optional params:

  

  

-  **pair**  *- the pair to watch f.i: BTC/EUR*

  

-  **percentage**  *- the percentage difference between prices to rise a Signal, f.i: 0.002*

  

-  **interval** - the quote interval expressed in seconds, f.i: 3

  

  

you can specify the value for the params directly in the command line as following:

  

  

    npm start pair=BTC-EUR percentage=0.002 interval=3

  

![Application screenshot](./Screenshot.png?raw=true "Application screenshot")


## Application description:

  

-  `bot.js` - Is the core of the application. It fetches the data from the upHold API and displays it on the console. It calls the DataAnalyzer class to analyze data and raise an event if a signal occurs.

-  `botDataModel.js` - is the relational model data representation.

-  `dataAnalyzer.js` - is the delegated class fo the data analysing.

-  `signalEvent.js` - is the event class derived from EventEmitter

-  `signalEventHandler.js` - is the function attached to the signalEvent Listener. It saves the bot data into the database.

to run the tests, in the terminal run the command:

  

  

    npm run test


## External Libraries:

The application references Sequelize ORM.