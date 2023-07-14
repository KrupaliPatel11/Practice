// Normal Function Statement
function hi(){
    console.log('Hello');
}
hi();

// Function Expression
var bye = function() {
    console.log('Bye');
}
bye();

//  pass one function to another
function passFun(fun) {
    fun();
}
passFun(bye);
