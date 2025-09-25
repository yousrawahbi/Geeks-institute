function toJs() {
    return new Promise((resolve, reject) => {
        try {
            const morseObj = JSON.parse(morse);
            
            if (Object.keys(morseObj).length === 0) {
                reject("Error: Morse object is empty");
            } else {
                resolve(morseObj);
            }
        } catch (error) {
            reject("Error: Invalid JSON format");
        }
    });
}

function toMorse(morseJS) {
    return new Promise((resolve, reject) => {
        const userInput = prompt("Please enter a word or sentence:");
        
        if (userInput === null || userInput.trim() === "") {
            reject("Error: No input provided");
            return;
        }
        
        const inputLower = userInput.toLowerCase();
        const morseTranslation = [];
        
        for (let i = 0; i < inputLower.length; i++) {
            const char = inputLower[i];
            
            if (morseJS[char] === undefined) {
                reject(`Error: Character "${char}" doesn't exist in morse code`);
                return;
            } else {
                morseTranslation.push(morseJS[char]);
            }
        }
        
        resolve(morseTranslation);
    });
}

function joinWords(morseTranslation) {
    const morseString = morseTranslation.join('\n');
    
    const paragraph = document.createElement('p');
    paragraph.textContent = morseString;
    paragraph.style.whiteSpace = 'pre-line'; 
    paragraph.style.fontFamily = 'monospace';
    paragraph.style.fontSize = '18px';
    paragraph.style.textAlign = 'center';
    paragraph.style.margin = '20px';
    
    document.body.appendChild(paragraph);
    
    return morseString;
}

toJs()
    .then((morseObj) => {
        console.log("Morse object loaded successfully!");
        return toMorse(morseObj);
    })
    .then((morseArray) => {
        console.log("Translation successful!");
        return joinWords(morseArray);
    })
    .then((finalResult) => {
        console.log("Morse code displayed on page!");
        console.log(finalResult);
    })
    .catch((error) => {
        console.error(error);
        alert(error);
    });