// Create a variable called sentence. The value of the variable should be a string that contains the words “not” and “bad”.
// For example, “The movie is not that bad, I like it”.
let sentence = "This is not so bad"

// Create a variable called wordNot where it’s value is the first appearance (ie. the position) of the substring “not” (from the sentence variable).

let wordNot = "not";
let position = sentence.indexOf(wordNot);
console.log(position);
// Create a variable called wordBad where it’s value is the first appearance (ie. the position) of the substring “bad” (from the sentence variable).
let wordBad = "bad";
let position2 = sentence.indexOf(wordBad);
console.log(position2);
// If the word “bad” comes after the word “not”, you should replace the whole “not…bad” substring with “good”, then console.log the result.
// For example, the result here should be : “The movie is good, I like it”
// If the word “bad” does not come after “not” or the words are not in the sentence, console.log the original sentence.
if (position2>position){
        let beforeNot = sentence.substring(0, position);
        let afterBad = sentence.substring(position2 + 3);
        
        let result = beforeNot + "good" + afterBad;
        console.log(result);
        
} else {
        console.log(sentence);
    }
