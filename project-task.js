/*
Scenario:
You’ve been hired to help a local pet shelter digitize its animal adoption records. The program is meant to:
  
  Allow users to enter an animal type and adoption fee.
  
  Add the animal and fee to a list.
  
  Retrieve the adoption fee for a specific animal when requested.

However, the initial developer left the program in a buggy state, with missing exception-handling logic
and some errors in the implementation. Your job is to fix it!



Instructions
Start by Understanding the Errors:
Run the program and observe the exceptions that occur. Document what the exceptions are and where they happen.

Write Exception Handling Code:
Use try/catch blocks to handle the errors so the program doesn’t crash when incorrect input or unexpected situations occur.

Test and Debug:
Test the program with valid and invalid inputs to confirm that exceptions are handled gracefully
and the program continues running as intended.
*/


// Will need to import / install readline-sync if not done so already within project dir: npm install readline-sync 
const readlineSync = require('readline-sync');

// Initial Code with Bugs (modified to use readline-sync)
let animalRecords = {}; // Store animals as keys and fees as values

function addAnimal(name, fee) {
    if (!name || isNaN(fee) || fee < 0) {
        throw new Error("Invalid animal name or adoption fee!");
    }
    if (animalRecords.hasOwnProperty(name)) {
        throw new Error("Animal already exists!");
    }
    animalRecords[name] = fee;
}

function getAdoptionFee(name) {
    if (!animalRecords.hasOwnProperty(name)) {
        throw new Error("Animal not found in records!");
    }
    return animalRecords[name];
}

function listAnimals() {
    if (Object.keys(animalRecords).length === 0) {
        console.log("No animals in the shelter currently.");
        return;
    }
    console.log("Animals and their adoption fees:");
    for (let [name, fee] of Object.entries(animalRecords)) {
        console.log(`- ${name}: $${fee}`);
    }
}
// Main program
console.log("Welcome to the Pet Shelter System");

while (true) {
    let action = readlineSync.question("Choose an action: 'add', 'fee', 'list', or 'exit': ").toLowerCase();
    
    if (action === "exit") {
        console.log("Goodbye!");
        break;
    } 
    
    if (action === "add") {
        let animal = readlineSync.question("Enter the animal's name: ");
        let fee = Number(readlineSync.question("Enter the adoption fee: "));
        try {
            addAnimal(animal, fee);
            console.log(`${animal} added with a fee of $${fee}.`);
        } catch (err) {
            console.log("Error:", err.message);
        }
    } else if (action === "fee") {
        let animal = readlineSync.question("Enter the animal's name to find its adoption fee: ");
        try {
            console.log(`${animal}'s adoption fee is $${getAdoptionFee(animal)}.`);
        } catch (err) {
            console.log("Error:", err.message);
        }
    } else if (action === "list") {
        listAnimals();
    } else {
        console.log("Invalid action. Please choose 'add', 'fee', 'list', or 'exit'.");
    }
}


/*
Problems to Solve

Invalid Input Errors:
  What happens if the user provides a negative adoption fee or leaves the name blank?
  What happens if the user tries to find the fee for an animal that hasn’t been added?

  // Invalid input isn’t handled – negative fees or blank names will throw errors and crash the program.

Code Flow Problems:
  What happens if the program throws an exception? Does the rest of the code continue running?

  // Looking up a non-existent animal – will throw an uncaught error and terminate the program.

Structured Exception Handling:
  Add try/catch blocks to handle the above errors gracefully.

  // No try/catch around the main logic – so any exception stops the whole program.
*/
