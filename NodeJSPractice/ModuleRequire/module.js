var counter = function(arr) {
    return 'This array has '  + arr.length + ' elements' ;
}
var sum = function(num1,num2) {
    return num1 + num2;
}
var sub  = function(num1,num2) {
    return num1 - num2;
}
var multiply = function(num1,num2) {
    return num1 * num2;
}
module.exports.counter = counter;
module.exports.sum = sum;
module.exports.sub = sub;
module.exports.multiply = multiply ; 

// Another way is below:-

// module.exports = {
//     sum : sum,
//     sub : sub,
//     multiply : multiply
// }