const gateway = require('fast-gateway');
const checkAuth = require('../midddleware/checkAuth');
const port = 3000;

const server = gateway({
    middlewares: [checkAuth],
    routes: [
        {
            prefix: '/order',
            target: 'http://localhost:8081',
            hooks: {
            }
        },
        {
            prefix: '/payment',
            target: 'http://localhost:8082',
            hooks: {
            }
        },

    ]
})

server.get('/testing', (req, res) => { res.send("Yes Gateway Called") });
server.start(port).then(server => {
    console.log(`Gateway is running at http://localhost:${port}`)
})