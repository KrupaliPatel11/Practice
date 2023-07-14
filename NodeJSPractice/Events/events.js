// Events Module
// Node js has in built module called "Events"(We can create fire and listen)

const EventEmitter = require('events');
const event = new EventEmitter();

// EX:--1
// event.on('firstEvent' , () => {
// console.log("This is Krupali Patel");
// })
// event.emit('firstEvent');

// EX:--2
// event.on('checkPage', (sc, msg) => {
// console.log(`Event is listening with status code ${sc} and page is ${msg}`)
// })
// event.emit('checkPage', 200, "ok")

// EX:--3
//  <html>
// <head>
//     <script>
//         document.addEventListener("click", function click() {
//             alert("Hello")
//         })
//     </script>
// </head>
// <body>
//     <h1>Click Me</h1>
// </body>
// </html> 