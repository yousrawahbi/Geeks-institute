// Exercise 1 : Checking the BMI


// Create two objects, each object should hold a person’s details. Here are the details:
// Each object should also have a key which value is a function (ie. A method), that calculates the Body Mass Index (BMI) of each person
let pers1 = {
    FullName: "Ali Jaber",
    Mass: 70,
    Height: 180,
    BMI:function () {
    return this.Mass / ((this.Height / 100) ** 2);
}
    
};
    console.log(pers1.BMI());
let pers2 = {
    FullName: "Taha Ben",
    Mass: 90,
    Height: 170,
    BMI:function () {
    return this.Mass / ((this.Height / 100) ** 2);
}
    
};
    console.log(pers2.BMI());



// Outside of the objects, create a JS function that compares the BMI of both objects.

function compareBMI(pers1,pers2) {
   let bmi1=pers1.BMI();
   let bmi2=pers2.BMI();
    if (bmi1>bmi2) {
        console.log(`${pers1.FullName} has a higher BMI than ${pers2.FullName}`); 
    }else if(bmi1<bmi2) {
        console.log(`${pers2.FullName} has a higher BMI than ${pers1.FullName}`); 
    }else {
        console.log(`${pers2.FullName} and ${pers1.FullName} have the same BMI`); 
    }
    
}



// Display the name of the person who has the largest BMI.
compareBMI(pers1,pers2);




// Exercise 2 : Grade Average


// Create a function called findAvg(gradesList) that takes an argument called gradesList.
// Your function must calculate and console.log the average.
// If the average is above 65 let the user know they passed
// If the average is below 65 let the user know they failed and must repeat the course.
let gradesList = [85, 32, 78, 95, 88, 72, 40];
let sumGrades= 0;
function findAvg(gradesList) {
    for(let i=0;i<gradesList.length;i++){
         sumGrades+=gradesList[i];
    }
    avrgGrades=sumGrades/gradesList.length;

    console.log(avrgGrades);
    if (avrgGrades>=65) {
     console.log("congrats! you passed");
    }else{
     console.log("You failed and you must repeat the course");
}

}
findAvg(gradesList);






// Bonus Try and split parts 1,2 and 3,4 of this exercise to two separate functions.
//part1
let gradesList = [85, 32, 78, 95, 88, 72, 40];
let sumGrades= 0;
function findAvg(gradesList) {
    for(let i=0;i<gradesList.length;i++){
         sumGrades+=gradesList[i];
    }
    console.log(avrgGrades=sumGrades/gradesList.length);
    
}
findAvg(gradesList);
//part2
function results(avrgGrades){
    if (avrgGrades>=65) {
     console.log("congrats! you passed");
}else{
     console.log("You failed and you must repeat the course");
}
}


// Hint One function must call the other.
 results(findAvg(gradesList));
