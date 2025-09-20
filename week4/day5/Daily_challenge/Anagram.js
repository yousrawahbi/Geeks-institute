function isAnagram(str1, str2) {
  let cleanStr1 = str1.replace(/ /g, '').toLowerCase();
  let cleanStr2 = str2.replace(/ /g, '').toLowerCase();
  
  if (cleanStr1.length !== cleanStr2.length) {
    return false;
  }
  
  let sortedStr1 = cleanStr1.split('').sort().join('');
  let sortedStr2 = cleanStr2.split('').sort().join('');
  
  return sortedStr1 === sortedStr2;
}

console.log(isAnagram("Astronomer", "Moon starer"));
console.log(isAnagram("School master", "The classroom"));
console.log(isAnagram("The Morse Code", "Here come dots"));

console.log(isAnagram("hello", "world"));
console.log(isAnagram("listen", "silent"));
console.log(isAnagram("cat", "dog"));