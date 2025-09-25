const resolvedPromise = Promise.resolve(3);

const rejectedPromise = Promise.reject("Boo!");

resolvedPromise
    .then(value => console.log("Resolved:", value))
    .catch(error => console.log("Error:", error));

rejectedPromise
    .then(value => console.log("Resolved:", value))
    .catch(error => console.log("Error:", error));
    