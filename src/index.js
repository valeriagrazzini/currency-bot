
import Bot from './bot'
import signalEventHandler from './signalEventHandler'
import{ Sequelize } from 'sequelize'
import BotData from './botDataModel'
import {dateFormat} from './utils'
import dotenv from 'dotenv'

dotenv.config()

async function start() {

    // READ PARAMETERS FROM ENVIRONMENT (file .env)
    const {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST} = process.env
    
    if(!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST) {
        console.log('PLEASE, SET THE ENVIRONMENT VALUES!')
        return
    }

    // DEFAULT VALUES DEFINITION
    const DEFAULT_PAIR = 'BTC-USD';
    const DEFAULT_FETCH_INTERVAL = 5 //seconds;
    const DEFAULT_OSCILLATION_PERCENTAGE = 0.01;

    //INITIALIZE BOT
    const bot = new Bot()

    // ADD LISTENER TO 'ISSIGNAL EVENT' -> YOU CAN ATTACH ANY OTHER EVENT HANDLER
    bot.addListener(signalEventHandler)

    // INITIALIZING DB CONNECTION
    const sequelize = new Sequelize({
        database: DB_NAME,
        username: DB_USER,
        password: DB_PASSWORD,
        host: DB_HOST,
        dialect: 'postgres',
        logging: false
    });

    
    // CHECK DB CONNECTION HEALTH
    try {
        await sequelize.authenticate();
        console.log('DB CONFIGURATION: ', {DB_NAME, DB_USER, DB_PASSWORD, DB_HOST})
        console.log('Database Connection has been established successfully.');
    } catch (error) {
        console.error('Error: unable to connect to the database');
        return
    }

    await BotData.init(sequelize) 
    await BotData.sync(); // DINAMICALLY CREATES THE MODEL TABLE
    

    // READ AND PARSE VALUES FROM COMMANDLINE
    // admitted params: pair=BTC/EUR percentage=0.05 interval=3
    const commandLineArgs = getCommandLineArgs()

    // COMMADN LINE VALUES VALIDATION
    const pair = commandLineArgs.pair ? commandLineArgs.pair.toUpperCase() : DEFAULT_PAIR;
    const commandLinePercentage = parseFloat(commandLineArgs.percentage)
    const commandLineInterval = parseInt(commandLineArgs.interval)
    const percentage = !Number.isNaN(commandLinePercentage) ? commandLinePercentage : DEFAULT_OSCILLATION_PERCENTAGE
    const seconds = Number.isInteger(commandLineInterval) && commandLineInterval > 0 ? commandLineInterval : DEFAULT_FETCH_INTERVAL
    
    const now = dateFormat(new Date())
    console.log('---------------------------------------------------------------------------------------------------')
    console.log(`BOT STARTED AT ${now} WITH CONFIG:`, {pair, percentage, interval:seconds})
    console.log('---------------------------------------------------------------------------------------------------')
    setInterval(()=>bot.run(pair, percentage), seconds * 1000)
}

function getCommandLineArgs() {
    const args = process.argv.slice(2);
    let params = {};

    args.forEach(a => {
        const nameValue = a.split("=");
        params[nameValue[0]] = nameValue[1];
    });

    return params;
}

start();

