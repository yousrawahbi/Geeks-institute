// 1 Prompt the user for several words (separated by commas).
let input = prompt("Enter words separated by commas:");

// 2 Put the words into an array.
let words = input.split(",");


// 3 Console.log the words one per line, in a rectangular frame as seen below.

let maxLength = 0;
for (let word of words) {
    if (word.length > maxLength) {
        maxLength = word.length;
    }
}

let border = "*".repeat(maxLength + 4);
console.log(border);

for (let word of words) {
    let spaces = " ".repeat(maxLength - word.length);
    console.log("* " + word + spaces + " *");
}

console.log(border);