// Exercise 1 : Find the numbers divisible by 23

// Create a function call displayNumbersDivisible() that takes no parameter.
// In the function, loop through numbers 0 to 500.
function displayNumbersDivisible() {
    let sum = 0;
    let numbers = [];
    
    for (let i = 0; i <= 500; i++) {
        if (i % 23 === 0) {
            numbers.push(i);
            sum += i;
        }
    }
    // Console.log all the numbers divisible by 23.
    console.log(numbers.join(' '));
    // At the end, console.log the sum of all numbers that are divisible by 23.
    console.log('Sum : ' + sum);
}

// Bonus: Add a parameter divisor to the function.
function displayNumbersDivisible(divis) {
    let sum = 0;
    let numbers = [];
    
    // If no divisor is provided, default to 23
    if (divis == undefined) {
        divis = 23;
    }
    
    for (let i = 0; i <= 500; i++) {
        if (i % divisor == 0) {
            numbers.push(i);
            sum += i;
        }
    }
    
    console.log(numbers.join(' '));
    console.log('Sum : ' + sum);
}

//  Exercise 2 : Shopping List

const stock = { 
    "banana": 6, 
    "apple": 0,
    "pear": 12,
    "orange": 32,
    "blueberry":1
}  

const prices = {    
    "banana": 4, 
    "apple": 2, 
    "pear": 1,
    "orange": 1.5,
    "blueberry":10
} 
// Add the stock and prices objects to your js file.
// Create an array called shoppingList with the following items: "banana", "orange”, and "apple”. It means that you have 1 banana, 1 orange and 1 apple in your cart.

let shoppingList=["banana", "orange", "apple"];

// Create a function called myBill() that takes no parameters.
// The function should return the total price of your shoppingList. In order to do this you must follow these rules:
// The item must be in stock. (Hint : check out if .. in)
// If the item is in stock find out the price in the prices object.
// Bonus: If the item is in stock, decrease the item’s stock by 1

function myBill() {
    let totalPrice=0;
    for (let i in shoppingList) {
        if (i in stock && stock[i] > 0) {
            totalPrice += prices[i];
            stock[i] -= 1;
        }
        
    }
    return totalPrice;
}

// Call the myBill() function.
console.log("Total price: " + myBill());


// Exercise 3 : What’s in my wallet ?

// Create a function named changeEnough(itemPrice, amountOfChange) that receives two arguments :
// an item price and an array representing the amount of change in your pocket.
// In the function, determine whether or not you can afford the item.
// If the sum of the change is bigger or equal than the item’s price (ie. it means that you can afford the item), the function should return true
// If the sum of the change is smaller than the item’s price (ie. it means that you cannot afford the item) the function should return false
// Change will always be represented in the following order: quarters, dimes, nickels, pennies.
let amountOfChange=[0,0,0,0];

function changeEnough(itemPrice, amountOfChange) {
    let sum=0 ;
    for (let i in amountOfChange) {
        const j = Number(i);
            if (j==0) {
            sum+=amountOfChange[i]*0.25;
            }else if (j===1) {
            sum+=amountOfChange[i]*0.10;  
            }else if (j===2) {
            sum+=amountOfChange[i]*0.05;  
            }else if (j===3) {
            sum+=amountOfChange[i]*0.01;  
            }
    };
    
    if (sum>=itemPrice) {
        return true;
    }else{

        return false;
    }
}

// Exercise 4 : Vacations Costs

// Let’s create functions that calculate your vacation’s costs:
// Define a function called hotelCost().
// It should ask the user for the number of nights they would like to stay in the hotel.
// If the user doesn’t answer or if the answer is not a number, ask again.
// The hotel costs $140 per night. The function should return the total price of the hotel.

function hotelCost() {
    while (true) {
        let nights = prompt("Enter nbr of nights you  wanna stay :");
        nights = Number(nights);
        
        if (!isNaN(nights) && nights > 0) {
            return nights*140;
        }
        
        alert("Please enter a valid number of nights.");
    }
}

// Define a function called planeRideCost().
// It should ask the user for their destination.
// If the user doesn’t answer or if the answer is not a string, ask again.
// The function should return a different price depending on the location.

function planeRideCost(){
        let dest;
    do {
        dest=prompt("Enter your destination please:");   
    } while (!dest|| typeof dest!== "string");
      
    if (dest === "London") return 183;
    if (dest === "Paris") return 220;
    return 300;
}



// Define a function called rentalCarCost().
// It should ask the user for the number of days they would like to rent the car.
// If the user doesn’t answer or if the answer is not a number, ask again.
// Calculate the cost to rent the car. The car costs $40 everyday.
// If the user rents a car for more than 10 days, they get a 5% discount.
// The function should return the total price of the car rental.

function rentalCarCost() {
    let days;
    
    while (true) {
        days = prompt("How many days would you like to rent the car?");
        days = Number(days);
        if (!isNaN(days) && days > 0) break;
        alert("Please enter a valid number of days.");
    }
    
    let total = days * 40;
    if (days > 10) total *= 0.95;
    
    return total;
}


// Define a function called totalVacationCost() that returns the total cost of the user’s vacation by calling the 3 functions that you created above.
// Example : The car cost: $x, the hotel cost: $y, the plane tickets cost: $z.
// Hint: You have to call the functions hotelCost(), planeRideCost() and rentalCarCost() inside the function totalVacationCost().

function totalVacationCost() {
    const hotel = hotelCost();
    const plane = planeRideCost();
    const car = rentalCarCost();
 
    const total = hotel + plane + car;
 
    console.log(`The car cost: $${car}, the hotel cost: $${hotel}, the plane tickets cost: $${plane}`);
    console.log(`Total vacation cost: $${total}`);
    
    return total;
}



// Call the function totalVacationCost()

totalVacationCost();


