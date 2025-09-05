// Exercice1
// Check whether a string is blank or not
function isBlank(str) {
     return str.length === 0;
}

// Exercice2
//function to convert a string into an abbreviated form

function abbrevName(fullName) {
  
    const nameParts = fullName.split(' ');
    
    if (nameParts.length === 1) {
        return nameParts[0];
    }

    const firstName = nameParts[0];
    const lastName = nameParts[nameParts.length - 1];
  
    return `${firstName} ${lastName.charAt(0)}.`;
}

// Exercice3

//function which takes a string as an argument and swaps the case of each character

function swapCase(str) {
    let result = '';
    
    for (let i = 0; i < str.length; i++) {
        const char = str[i];
        
        if (char === char.toUpperCase()) {
            result += char.toLowerCase();
        } else {
            result += char.toUpperCase();
        }
    }
    
    return result;
}


// Exercice4
//

function isOmnipresent(arr, value) {
    if (!Array.isArray(arr)) {
        return false;
    }
    
    if (arr.length === 0) {
        return false; 
    }
    
    return arr.every(subArray => {
        if (!Array.isArray(subArray)) {
            return false;
        }
        return subArray.includes(value);
    });
}
