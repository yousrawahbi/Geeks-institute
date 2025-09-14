// Exercice1:

function printFullName({first, last}) {
    return `Your full name is ${first} ${last}`;
}

// Exercice2:

function keysAndValues(obj) {
    const keys = Object.keys(obj).sort();
    const values = keys.map(key => obj[key]);
    return [keys, values];
}

// Exercice3:
// reponse 3