const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');
require('dotenv').config()
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const port = process.env.PORT || 5000;

//middleware
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.preca8g.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();

        const userCollection = client.db("BistroDB").collection("users");
        const menuCollection = client.db("BistroDB").collection("menu");
        const reviewsCollection = client.db("BistroDB").collection("reviews");
        const cartCollection = client.db("BistroDB").collection("cart");
        const paymentCollection = client.db("BistroDB").collection("payments");

        //jwt related api
        app.post('/jwt', async (req, res) => {
            const user = req.body
            const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' })
            res.send({ token })
        })

        //middlewares 
        const varifyToken = (req, res, next) => {
            if (!req.headers.authorization) {
                return res.status(401).send({ message: 'unauthorized access' })
            }
            const token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
                if (error) {
                    return res.status(401).send({ message: 'unauthorized access' })
                }
                req.decoded = decoded
                next()
            })
        }

        //use varify admin after varifyToken
        const varifyAdmin = async (req, res, next) => {
            const email = req.decoded.email
            const query = { email: email }
            const user = await userCollection.findOne(query)
            const isAdmin = user?.role === 'admin'
            if (!isAdmin) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            next()
        }

        //users related api
        app.get('/users', varifyToken, varifyAdmin, async (req, res) => {
            const result = await userCollection.find().toArray()
            res.send(result)
        })

        app.get('/users/admin/:email', varifyToken, async (req, res) => {
            const email = req.params.email
            if (email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' })
            }
            const query = { email: email }
            const user = await userCollection.findOne(query)
            let admin = false;
            if (user) {
                admin = user?.role === 'admin'
            }
            res.send({ admin })
        })

        app.post('/users', async (req, res) => {
            const user = req.body

            const query = { email: user.email }
            const existingUser = await userCollection.findOne(query)
            if (existingUser) {
                return res.send({ message: 'user already exist', insertedId: null })
            }

            //insert email if user doesn't exist
            const result = await userCollection.insertOne(user)
            res.send(result)
        })

        app.patch('/users/admin/:id', varifyToken, varifyAdmin, async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const updatedDoc = {
                $set: {
                    role: 'admin'
                }
            }
            const result = await userCollection.updateOne(filter, updatedDoc)
            res.send(result)
        })

        app.delete('/users/:id', varifyToken, varifyAdmin, async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await userCollection.deleteOne(query)
            res.send(result)
        })


        //menu apis 
        app.get('/menu', async (req, res) => {
            const result = await menuCollection.find().toArray()
            res.send(result)
        })
        app.get('/menu/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await menuCollection.findOne(query)
            res.send(result)
        })

        app.post('/menu', varifyToken, varifyAdmin, async (req, res) => {
            const menuItem = req.body
            const result = await menuCollection.insertOne(menuItem)
            res.send(result)
        })

        app.patch('/menu/:id', varifyToken, varifyAdmin, async (req, res) => {
            const item = req.body;
            const id = req.params.id;
            const filter = { _id: new ObjectId(id) }
            const updatedDoc = {
                $set: {
                    name: item.name,
                    category: item.category,
                    price: item.price,
                    recipe: item.recipe,
                    image: item.image
                }
            }

            const result = await menuCollection.updateOne(filter, updatedDoc)
            res.send(result);
        })

        app.delete('/menu/:id', varifyToken, varifyAdmin, async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) }
            const result = await menuCollection.deleteOne(query)
            res.send(result)
        })

        //review apis
        app.get('/reviews', async (req, res) => {
            const result = await reviewsCollection.find().toArray()
            res.send(result)
        })

        //cart collection
        app.get('/carts', async (req, res) => {
            const email = req?.query?.email
            const query = { email: email }
            const result = await cartCollection.find(query).toArray()
            res.send(result);
        });
        app.post('/carts', async (req, res) => {
            const cartItem = req.body
            const result = await cartCollection.insertOne(cartItem)
            res.send(result);
        })
        app.delete('/carts/:id', async (req, res) => {
            const id = req?.params?.id
            const query = { _id: new ObjectId(id) }
            const result = await cartCollection.deleteOne(query)
            res.send(result);
        })

        //payment intent
        app.post('/create-payment-intent', async (req, res) => {
            const { price } = req.body;
            const amount = parseInt(price * 100);
            console.log(amount, 'amount inside the intent')

            const paymentIntent = await stripe.paymentIntents.create({
                amount: amount,
                currency: 'usd',
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret
            })
        });

        app.get('/payments/:email', varifyToken, async (req, res) => {
            const query = { email: req.params.email }
            if (req.params.email !== req.decoded.email) {
                return res.status(403).send({ message: 'forbidden access' });
            }
            const result = await paymentCollection.find(query).toArray();
            res.send(result);
        })

        app.post('/payments', async (req, res) => {
            const payment = req.body;
            const paymentResult = await paymentCollection.insertOne(payment);

            //  carefully delete each item from the cart
            // console.log('payment info', payment);
            const query = {
                _id: {
                    $in: payment.cartIds.map(id => new ObjectId(id))
                }
            };

            const deleteResult = await cartCollection.deleteMany(query);

            res.send({ paymentResult, deleteResult });
        })

        //stats or analytics
        app.get('/admin-stats', varifyToken, varifyAdmin, async (req, res) => {
            const users = await userCollection.estimatedDocumentCount();
            const menuItems = await menuCollection.estimatedDocumentCount();
            const orders = await paymentCollection.estimatedDocumentCount();

            const result = await paymentCollection.aggregate([
                {
                    $group: {
                        _id: null,
                        totalRevenue: {
                            $sum: '$price'
                        }
                    }
                }
            ]).toArray();

            const revenue = result.length > 0 ? result[0].totalRevenue : 0;

            res.send({
                users,
                menuItems,
                orders,
                revenue
            })
        })

        //order status
        app.get('/order-stats', varifyToken, varifyAdmin, async (req, res) => {
            const result = await paymentCollection.aggregate([
                {
                    $unwind: '$menuItemIds'
                },
                {
                    $lookup: {
                        from: 'menu',
                        localField: 'menuItemIds',
                        foreignField: '_id',
                        as: 'menuItems'
                    }
                },
                {
                    $unwind: '$menuItems'
                },
                {
                    $group: {
                        _id: '$menuItems.category',
                        quantity: { $sum: 1 },
                        revenue: { $sum: '$menuItems.price' }
                    }
                },
                {
                    $project: {
                        _id: 0,
                        category: '$_id',
                        quantity: '$quantity',
                        revenue: '$revenue'
                    }
                }
            ]).toArray();

            res.send(result);

        })


        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        //await client.close();
    }
}
run().catch(console.dir);



//api
app.get('/', (req, res) => {
    res.send('server is Active')
})


app.listen(port, () => {
    console.log(`Bistro-boss is running  on port ${port}`);
})