const express = require('express');
const app = express();

const port = 8082;
app.get('/paymentlist', (req, res) => {
    let response = {
        data: {
            item: [
                {
                    id: 1,
                    name: 'payment 1'
                },
                {
                    id: 2,
                    name: 'payment 2'
                },
                {
                    id: 3,
                    name: 'payment 3'
                },
                {
                    id: 4,
                    name: 'payment 4'
                },
            ]
        }
    }
    res.status(200).json(response);
})

app.get('/' , (req, res) => {
    res.status(200).json({message : "Payment Called"})
})

app.listen(port, () => {
    console.log(`Payment Listening at http://localhost:${port}` )
})
