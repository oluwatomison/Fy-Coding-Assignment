const fs = require('fs'); //importing the fs module to read, write, append and delete a file.
// Defining the stock command.
const SETSTOCK = "set-stock";
const ADDSTOCK = "add-stock";
const ORDERSTOCK = 'order'

var currentStock = {}; // This variable keeps track of the current stock

// Extracting the instruction from the string array
const getStockCommand = (data) => {
    try {
        return data.split(' ')[0]
    } catch (error) {
        
    }
}
// Converting array of strings into a key value pair
const getSKUAndStockInKeyValuePair = (data) => {
    try {
        var newObj = {}; // hold the key value pair.
        for (var i = 0; i < data.length; i+=2) {
            newObj[data[i]] = parseInt(data[i + 1]);
        }
        return newObj
    } catch (error) {
        
    }
}

const convertInstructionToArray = (data) => {
    try {
         return data.split(" "); 
    } catch (error) {
    }
}


// Function to set stock
const setStock = (stockInstruction) => {
    try {
        let instructionArray = convertInstructionToArray(stockInstruction)
        const [setStock,...rest] = instructionArray 
        let keyValue = [...rest]
        for (var i = 0; i < keyValue.length; i+=2) {
            currentStock[keyValue[i]] = parseInt(keyValue[i + 1]);
        }
        console.log(`Instruction:${setStock}`,currentStock)
    } catch (error) {
    }
}
// Function to add stock
const addStock = (stockInstruction) => {
    try {
        let instructionArray = convertInstructionToArray(stockInstruction)
        const [addStock,...rest] = instructionArray
        let keyValue = [...rest]
        let newObj = getSKUAndStockInKeyValuePair(keyValue)
        for (let key in newObj){
            if(currentStock.hasOwnProperty(key)){ // if the key exist update the value  for the key
                currentStock[key] += newObj[key]
            } else { // Add to current stock
                for (var i = 0; i < keyValue.length; i+=2) {
                    currentStock[keyValue[i]] = parseInt(keyValue[i + 1]);
                }
            }
        }
        console.log(`Instruction:${addStock}`,currentStock)
    } catch (error) {
        
    }
}

// Function to order stock
const orderStock = (stockInstruction) => {
    try {
        let instructionArray = convertInstructionToArray(stockInstruction)
        const [order, orderNo, ...rest] = instructionArray
        let keyValue = [...rest]
        let newObj = getSKUAndStockInKeyValuePair(keyValue)
        for (let key in newObj){
            if(currentStock.hasOwnProperty(key)){
                currentStock[key] -= newObj[key]
            } else { 
                console.log ("Stock not found")
            }
        }
        console.log(`Instruction:${order}`,currentStock)
    } catch (error) {
    }
}

const switchStockCommand = (stockCommand,stockInstruction) => {
    // switch between different command and call the function associated with the command.
    try {
        switch(stockCommand) {
            case SETSTOCK:
                 return setStock(stockInstruction);
            case ADDSTOCK:
                return addStock(stockInstruction);
            case ORDERSTOCK:
             return orderStock(stockInstruction)
            default:
               return console.log("Stock command not found")
          }
    } catch (error) {
    }
}

// Main Function
try {
    // reading content of the file.
    const readingStockInstruction = fs.readFileSync('stock.txt','utf8') 
    const stockInstruction = readingStockInstruction.split("\n"); // convert stock instructions into a array on a new line.
    for (let i = 0; i<stockInstruction.length; i++){ // reading each instruction one after the other
       let stockCommand =  getStockCommand(stockInstruction[i]) // Getting the stock command
       switchStockCommand(stockCommand,stockInstruction[i]) // switch between different stock command
    }
} catch (error) {
}
