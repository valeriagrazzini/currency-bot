
class DataAnalyzer {

    // CHECKS WHENEVER THERE IS AN OSCILLATION OF THE PRICE UP OR DOWN
    static checkOscillation(basePrice, currentPrice, percentage) {

        basePrice = parseFloat(basePrice)
        currentPrice = parseFloat(currentPrice)
        percentage = parseFloat(percentage)
        
        if(isNaN(basePrice) || isNaN(currentPrice) || isNaN(percentage)) {
            return {
                isError: true,
                errorMessage: 'INVALID VALUES',
                priceDifferencePercentage: 0, 
                isSignal: false
            }
        }
        
        let priceDifferencePercentage = 0;
        let isSignal = false;
        const numOfdecimals = 5

        // CALCULATE THE PRICE DIFFERENCE BETWEEN THE START PRICE AND THE CURRENT PRICE
        const priceDifference = parseFloat((currentPrice - basePrice).toFixed(numOfdecimals));

        // CALCULATE THE PERCENTAGE
        priceDifferencePercentage = parseFloat((priceDifference / basePrice * 100).toFixed(numOfdecimals));

        // CHECK IF THE PERCENTAGE CORRESPONDS TO THE SIGNAL PERCENTAGE
        if(Math.abs(priceDifferencePercentage) >= percentage) {
            isSignal = true
        }
    
        return {
            isError: false,
            priceDifferencePercentage, 
            isSignal
        }
    }
}
export default DataAnalyzer 