// sk_test_51NzBuNGvFx3FC0kPjCvLaTcnAUSqAEXsTEAMFsCuqvFhe5bEU5HYu7QKX1QzmBSqH8gOrTdZJxN18g4H3br6pYZm004BY9Ro8t

const express = require('express');
var cors = require('cors');
const stripe= require('stripe')('sk_test_51NzBuNGvFx3FC0kPjCvLaTcnAUSqAEXsTEAMFsCuqvFhe5bEU5HYu7QKX1QzmBSqH8gOrTdZJxN18g4H3br6pYZm004BY9Ro8t')

const app = express()
app.use(cors());
app.use(express.static('public'))
app.use(express.json());

app.post('/checkout', async(req,res) => {
    const items = req.body.items;
    let lineItems = [];
    items.forEach(item => {
        lineItems.push(
            {
                price: item.id,
                quantity: item.quantity
            }
        )
    });

    const session = await stripe.checkout.sessions.create({
        lineItems: lineItems,
        mode: 'payment',
        success_url: "http://localhost:5173/success",
        cancel_url: "http://localhost:5173/cancel"
    });

    res.send(JSON.stringify({
        url: session.url
    }))
});

app.listen(4000 , () => console.log('Listening on port 4000'))


