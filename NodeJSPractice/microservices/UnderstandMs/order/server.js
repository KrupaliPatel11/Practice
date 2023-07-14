const express = require('express');
const app = express();

const port = 8081;
app.get('/orderlist', (req, res) => {
    let response = {
        data: {
            item: [
                {
                    id: 1,
                    name: 'order 1'
                },
                {
                    id: 2,
                    name: 'order 2'
                },
                {
                    id: 3,
                    name: 'order 3'
                },
                {
                    id: 4,
                    name: 'order 4'
                },
            ]
        }
    }
    res.status(200).json(response);
})

app.get('/' , (req, res) => {
    res.status(200).json({message : "Order Called"})
})

app.listen(port, () => {
    console.log(`Order Listening at http://localhost:${port}` )
})
