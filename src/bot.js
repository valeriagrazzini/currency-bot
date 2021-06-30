import { curly } from 'node-libcurl'
import DataAnalyzer from './dataAnalyzer'
import BotData from './botDataModel'
import SignalEvent from "./signalEvent"
import {dateFormat} from './utils'
class Bot {
    
    constructor() {
        this.firstPrice = undefined
        this.API_URL = 'https://api.uphold.com/v0/ticker'
        this.signalEvent = new SignalEvent()
    }

    async run(pair, percentage) {
        const now = new Date()

        // GET DATA FROM THE SOURCE API
        const {statusCode, data} = await curly.get(`${this.API_URL}/${pair}`)
       
        if(statusCode != 200) {
            console.log(`AN ERROR OCCURRED: ${data.message}`)
            return
        } 

        // THE THE PRICE TO CHECK
        const price = parseFloat(data.ask)

        // ASSIGN THE FIRST PRICE TO BE COMPARED WITH THE NEXT PRICES
        if(!this.firstPrice) {
            this.firstPrice = price
        }
    
        // ANALYZE OSCILLATION
        const {priceDifferencePercentage, isSignal, isError, errorMessage} = DataAnalyzer.checkOscillation(this.firstPrice, price, percentage)

        if(isError) {
            console.log(`DATA INPUT ERROR: ${errorMessage}`)
            return
        }

        // BIND THE MODEL
        const botData = new BotData()
        botData.pair = pair
        botData.percentage = percentage,
        botData.currency = data.currency
        botData.basePrice = this.firstPrice
        botData.currentPrice = price
        botData.percentageDifference = priceDifferencePercentage
        botData.isSignal = isSignal
      
        // EMIT THE 'SIGNAL' EVENT SO THAT AN HANDLER CAN CATCH IT
        if(isSignal) {
            this.signalEvent.emit('signal', botData)
        }
        let upDownSymbol = '--'
        if(isSignal) {
            if(botData.percentageDifference > botData.percentage ) {
                upDownSymbol = '↑'
            } else  if(botData.percentageDifference < botData.percentage ) {
                upDownSymbol = '↓'
            }
        }
        // DISPLAY DATA IN CONSOLE
        console.table([{
            dateTime: dateFormat(now),
            pair: botData.pair, 
            percentage: botData.percentage,
            currency: botData.currency, 
            basePrice: botData.basePrice,
            currentPrice: botData.currentPrice,
            percentageDifference: botData.percentageDifference, 
            isSignal: botData.isSignal,
            UpDown: upDownSymbol
        }])
        
    }

    addListener(listener) {
        this.signalEvent.addListener('signal', (botData) => listener(botData)) 
    }

}
export default Bot;