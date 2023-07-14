var time = 0;
var timer = setInterval(function() {
    time += 1;
    console.log(time + ' Here is Krupali');
    if(time > 5) {
        clearInterval(timer);
    }
}, 2000);
