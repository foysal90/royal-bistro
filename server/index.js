const express = require("express");
const cors = require("cors");
const { MongoClient, ObjectId } = require("mongodb");
//const stripe = require("stripe")(process.env.PAYMENT_SECRET);

const app = express();
require("dotenv").config();
const jwt = require("jsonwebtoken");
const { verifyJwt } = require("./jwt");
const stripe = require("stripe")(process.env.PAYMENT_SECRET);

const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7fhovkc.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri);

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    const userCollection = client.db("authenticFood").collection("users");
    const menuCollection = client.db("authenticFood").collection("products");
    const reviewCollection = client.db("authenticFood").collection("reviews");
    const cartCollection = client.db("authenticFood").collection("carts");
    const paymentCollection = client.db("authenticFood").collection("payments");

    //jwt
    app.post("/jwt", async (req, res) => {
      const jwtUser = req.body;
      const token = jwt.sign(jwtUser, process.env.ACCESS_SECRET_TOKEN, {
        expiresIn: "1h",
      });
      res.send({ token });
    });

    //verifying admin middleware
    const verifyAdmin = async (req, res, next) => {
      const email = req.decoded.email;
      const query = { email: email };
      const user = await userCollection.findOne(query);
      if (user?.role !== "admin") {
        return res
          .status(403)
          .send({ error: true, message: "forbidden access" });
      }
      next();
    };

    //users apis
    app.get("/users", verifyJwt, verifyAdmin, async (req, res) => {
      const user = await userCollection.find().toArray();
      res.send(user);
    });

    app.post("/users", async (req, res) => {
      const user = req.body;
      //console.log(user);
      const query = { email: user.email };
      const existingUser = await userCollection.findOne(query);
      console.log("existing user", existingUser);
      if (existingUser) {
        return res.send({ message: "User already exists" });
      }
      const result = await userCollection.insertOne(user);
      res.send(user);
    });

    //security layer verifyJwt
    app.get("/users/admin/:email", verifyJwt, async (req, res) => {
      const email = req.params.email;
      //checking if the correct user email token or not
      const userEmailToken = req.decoded.email;
      if (userEmailToken !== email) {
        res.send({ admin: false });
      }
      const query = { email: email };
      const user = await userCollection.findOne(query);
      //checking if the user is admin or not
      const adminRole = { admin: user?.role === "admin" };
      res.send(adminRole);
    });

    app.patch("/users/admin/:id", async (req, res) => {
      const id = req.params.id;

      const filter = { _id: new ObjectId(id) };
      const doc = {
        $set: {
          role: "admin",
        },
      };
      const updatedRole = await userCollection.updateOne(filter, doc);
      res.send(updatedRole);
    });

    app.delete("/users/admin/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const deletedAdmin = await userCollection.deleteOne(filter);
      res.send(deletedAdmin);
    });

    //menu apis
    app.get("/menu", async (req, res) => {
      const query = await menuCollection.find().toArray();
      res.send(query);
    });
    app.post("/menu", verifyJwt, verifyAdmin, async (req, res) => {
      const newItem = req.body;
      console.log(newItem);
      const result = await menuCollection.insertOne(newItem);
      res.send(result);
    });

    app.delete("/menu/:id", verifyJwt, verifyAdmin, async (req, res) => {
      const id = req.params.id;

      //const filter = { _id: id };
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.deleteOne(query);
      res.send(result);
    });

    app.get("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await menuCollection.findOne(query);
      res.send(result);
    });
    app.patch("/menu/:id", async (req, res) => {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const item = req.body;
      const updatedDoc = {
        $set: {
          name: item.name,
          category: item.category,
          price: item.price,
          recipe: item.recipe,
          image: item.image,
        },
      };

      const result = await menuCollection.updateOne(
        filter,
        updatedDoc,
        options
      );
      res.send(result);
    });

    // app.patch("/menu/:id", async (req, res) => {
    //   const item = req.body;
    //   const id = req.params.id;
    //   console.log(id, "has been updated");
    //   const filter = { _id: new ObjectId(id) };
    //   //const options = { upsert: true };

    //   const updatedItem = {
    //     $set: {
    //       name: item.name,
    //       image: item.image,

    //       recipe: item.recipe,

    //       category: item.category,
    //       price: item.price,
    //     },
    //   };
    //   const result = await menuCollection.updateOne(filter, updatedItem);
    //   res.send(result);
    // });

    app.get("/reviews", async (req, res) => {
      const query = await reviewCollection.find().toArray();
      res.send(query);
    });

    app.get("/carts", verifyJwt, async (req, res) => {
      const email = req.query.email;
      if (!email) {
        res.send([]);
      }
      const decodedEmail = req.decoded.email;
      if (email !== decodedEmail) {
        return res.status(403).send({
          error: true,
          message: "forbidden access, Please login with your valid email",
        });
      }
      const query = { email: email };
      const result = await cartCollection.find(query).toArray();
      res.send(result);
    });
    // carts collection
    // app.get("/carts", async (req, res) => {
    //   const email = req.query.email;
    //   const query = { email: email };
    //   const result = await cartCollection.find(query).toArray();
    //   res.send(result);
    // });

    app.post("/carts", async (req, res) => {
      const items = req.body;
      console.log(items);
      const result = await cartCollection.insertOne(items);
      res.send(result);
    });

    app.delete("/carts/:id", async (req, res) => {
      const id = req.params.id;
      console.log(id);
      const query = { _id: new ObjectId(id) };
      const result = await cartCollection.deleteOne(query);
      res.send(result);
    });

    //payment
    //  app.post('/create-payment-intent',  async(req,res) => {
    //   const {price} = req.body;
    //   const amount = price * 100;
    //   console.log(price,amount)
    //   const paymentIntent = await stripe.paymentIntents.create({
    //     amount: amount,
    //     currency: 'usd',
    //     payment_method_types: ['card']
    //   })
    //   res.send({
    //     clientSecret: paymentIntent.client_Secret
    //   })

    //  })

    // payment intent
    app.post("/create-payment-intent", verifyJwt, async (req, res) => {
      const { price } = req.body;
      const amount = price * 100;

      const paymentIntent = await stripe.paymentIntents.create({
        amount: amount,
        currency: "usd",
        payment_method_types: ["card"],
      });

      res.send({
        clientSecret: paymentIntent.client_secret,
      });
    });

    app.post("/payment", verifyJwt, async (req, res) => {
      const payment = req.body;
      console.log("payment", payment);
      const insertedItems = await paymentCollection.insertOne(payment);

      //delete items from cart
      const query = {
        _id: { $in: payment.cartItemsId.map((id) => new ObjectId(id)) },
      };
      const deletedItems = await cartCollection.deleteMany(query);
      res.send({ result: insertedItems, result: deletedItems });
    });

    //admin stats
    app.get("/admin-stats", verifyJwt, verifyAdmin, async (req, res) => {
      const totalUsers = await userCollection.estimatedDocumentCount();
      const totalProducts = await menuCollection.estimatedDocumentCount();
      const totalOrders = await paymentCollection.estimatedDocumentCount();

      const payments = await paymentCollection.find().toArray();
      const revenue = payments.reduce((sum, payment) => sum + payment.totalPrice, 0);

      res.send({
        revenue,
        totalUsers,
        totalProducts,
        totalOrders,
      });
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);

app.get("/", (req, res) => {
  res.send("food isn being cooked");
});

app.listen(port, () => {
  console.log("port is running", port);
});
