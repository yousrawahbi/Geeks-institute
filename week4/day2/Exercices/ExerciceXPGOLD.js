////Exercise 1:
javascript
[1, 2, 3].map(num => {
  if (typeof num === 'number') return num * 2;
  return ;
});

////Exercise 2:
[[0, 1], [2, 3]].reduce(
  (acc, cur) => {
    return acc.concat(cur);
  },
  [1, 2],
);

////Exercise 3:
const arrayNum = [1, 2, 4, 5, 8, 9];
const newArray = arrayNum.map((num, i) => {
    console.log(num, i);
    alert(num);
    return num * 2;
})

////Exercise 4:
// 1
const array = [[1],[2],[3],[[[4]]],[[[5]]]];
const modifiedArray = array.flat(2);
console.log(modifiedArray);

// 2
const greeting = [["Hello", "young", "grasshopper!"], ["you", "are"], ["learning", "fast!"]];
const joinedGreeting = greeting.map(words => words.join(" "));
console.log(joinedGreeting);

// 3
const greetingString = joinedGreeting.join(" ");
console.log(greetingString);

// 4
const trapped = [[[[[[[[[[[[[[[[[[[[[[[[[[3]]]]]]]]]]]]]]]]]]]]]]]]]];
const freed = trapped.flat(Infinity);
console.log(freed);