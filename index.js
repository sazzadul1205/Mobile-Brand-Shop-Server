const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const port = process.env.PORT || 5000;

// Middle Ware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://mobile-brand-shop.web.app",
      "https://mobile-brand-shop.firebaseapp.com",
    ],
    credentials: true,
  })
);

app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mobile-brand-shop.baqrv.mongodb.net/?retryWrites=true&w=majority&appName=Mobile-Brand-Shop`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    // await client.connect();

    //  connection
    const HomeBannerCollection = client
      .db("Mobile-Brand-Shop")
      .collection("HomeBanner");
    const HomeBrandCollection = client
      .db("Mobile-Brand-Shop")
      .collection("HomeBrand");
    const HomeAboutUsCollection = client
      .db("Mobile-Brand-Shop")
      .collection("HomeAboutUs");
    const HomeFAQCollection = client
      .db("Mobile-Brand-Shop")
      .collection("HomeFAQ");
    const AboutUsCollection = client
      .db("Mobile-Brand-Shop")
      .collection("AboutUs");
    const BlogsCollection = client.db("Mobile-Brand-Shop").collection("Blogs");
    const ProductBannersCollection = client
      .db("Mobile-Brand-Shop")
      .collection("ProductBanners");
    const ProductsCollection = client
      .db("Mobile-Brand-Shop")
      .collection("Products");
    const UsersDataCollection = client
      .db("Mobile-Brand-Shop")
      .collection("UsersData");
    const MyCartCollection = client
      .db("Mobile-Brand-Shop")
      .collection("MyCart");
    const SellHistoryCollection = client
      .db("Mobile-Brand-Shop")
      .collection("SellHistory");

    // API Connections

    // Users Data API
    // view all users
    app.get("/usersData", async (req, res) => {
      const { email } = req.query;
      if (email) {
        // If email is provided, find a specific user by email
        const query = { email };
        const result = await UsersDataCollection.findOne(query);
        res.send(result); // This will return null if not found
      } else {
        // If email is not provided, find all users
        const result = await UsersDataCollection.find().toArray();
        res.send(result);
      }
    });
    // Post Users Data
    app.post("/users", async (req, res) => {
      const request = req.body;
      const result = await UsersDataCollection.insertOne(request);
      res.send(result);
    });

    // Home Banner API
    // Get Home Banner
    app.get("/HomeBanner", async (req, res) => {
      const result = await HomeBannerCollection.find().toArray();
      res.send(result);
    });
    // Post Home Banners
    app.post("/HomeBanner", async (req, res) => {
      const request = req.body;
      const result = await HomeBannerCollection.insertOne(request);
      res.send(result);
    });
    // delete Home Banner
    app.delete("/HomeBanner/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await HomeBannerCollection.deleteOne(query);
      res.send(result);
    });

    // Home Brand API
    // Get Home Brand
    app.get("/HomeBrand", async (req, res) => {
      const result = await HomeBrandCollection.find().toArray();
      res.send(result);
    });
    // Post HomeBrand
    app.post("/HomeBrand", async (req, res) => {
      const request = req.body;
      const result = await HomeBrandCollection.insertOne(request);
      res.send(result);
    });
    // delete Home Brand data
    app.delete("/HomeBrand/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await HomeBrandCollection.deleteOne(query);
      res.send(result);
    });

    // Home AboutUs API
    // Get Home AboutUs
    app.get("/HomeAboutUs", async (req, res) => {
      const result = await HomeAboutUsCollection.find().toArray();
      res.send(result);
    });

    // Home FAQ API
    // Get Home FAQ
    app.get("/HomeFAQ", async (req, res) => {
      const result = await HomeFAQCollection.find().toArray();
      res.send(result);
    });
    // Post HomeFAQ
    app.post("/HomeFAQ", async (req, res) => {
      const request = req.body;
      const result = await HomeFAQCollection.insertOne(request);
      res.send(result);
    });
    // delete HomeFAQ
    app.delete("/HomeFAQ/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await HomeFAQCollection.deleteOne(query);
      res.send(result);
    });

    // About Us API
    // Get About Us
    app.get("/AboutUs", async (req, res) => {
      const result = await AboutUsCollection.find().toArray();
      res.send(result);
    });

    // Blogs API
    // Get Blogs
    app.get("/Blogs", async (req, res) => {
      const result = await BlogsCollection.find().toArray();
      res.send(result);
    });
    // Post Blogs
    app.post("/Blogs", async (req, res) => {
      const request = req.body;
      const result = await BlogsCollection.insertOne(request);
      res.send(result);
    });
    // Update SellHistory
    app.put("/Blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedData = req.body;
      const result = await BlogsCollection.updateOne(query, {
        $set: updatedData,
      });
      res.send(result);
    });
    // delete Blogs data
    app.delete("/Blogs/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await BlogsCollection.deleteOne(query);
      res.send(result);
    });

    // Product Banners API
    // Get Product Banners
    app.get("/ProductBanners", async (req, res) => {
      const result = await ProductBannersCollection.find().toArray();
      res.send(result);
    });
    // Post Product Banners
    app.post("/ProductBanners", async (req, res) => {
      const request = req.body;
      const result = await ProductBannersCollection.insertOne(request);
      res.send(result);
    });
    // delete Product Banners
    app.delete("/ProductBanners/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ProductBannersCollection.deleteOne(query);
      res.send(result);
    });

    // Products API
    // Get Products
    app.get("/Products", async (req, res) => {
      try {
        const productType = req.query.productType; // Get productType from query parameter
        const brand = req.query.brand; // Get brand from query parameter
        const condition = req.query.condition; // Get condition from query parameter

        // Build the query object based on the parameters
        const query = {
          ...(productType && { productType }), // Add productType if provided
          ...(brand && { brand }), // Add brand if provided
          ...(condition && { condition }), // Add condition if provided
        };

        // Fetch products based on the query
        const result = await ProductsCollection.find(query).toArray(); // Filter by the constructed query

        res.send(result);
      } catch (error) {
        console.error("Error fetching products:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    // New Endpoint to Fetch Unique Brands by Product Type
    app.get("/Product/brands", async (req, res) => {
      try {
        const productType = req.query.productType; // Get productType from query parameter

        // Build the query object based on the productType
        const query = productType ? { productType } : {}; // If productType is provided, filter by it

        // Use aggregation to get unique brands
        const brands = await ProductsCollection.aggregate([
          { $match: query }, // Match products based on the query
          { $group: { _id: "$brand" } }, // Group by brand to get unique values
          { $project: { brand: "$_id", _id: 0 } }, // Reshape the output
        ]).toArray();

        res.send(brands); // Return the list of unique brands
      } catch (error) {
        console.error("Error fetching brands:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    // New Endpoint to Fetch Unique Conditions by Product Type
    app.get("/Product/conditions", async (req, res) => {
      try {
        const productType = req.query.productType; // Get productType from query parameter

        // Build the query object based on the productType
        const query = productType ? { productType } : {}; // If productType is provided, filter by it

        // Use aggregation to get unique conditions
        const conditions = await ProductsCollection.aggregate([
          { $match: query }, // Match products based on the query
          { $group: { _id: "$condition" } }, // Group by condition to get unique values
          { $project: { condition: "$_id", _id: 0 } }, // Reshape the output
        ]).toArray();

        res.send(conditions); // Return the list of unique conditions
      } catch (error) {
        console.error("Error fetching conditions:", error);
        res.status(500).send("Internal Server Error");
      }
    });
    // Post Products
    app.post("/Products", async (req, res) => {
      const request = req.body;
      const result = await ProductsCollection.insertOne(request);
      res.send(result);
    });
    // delete Products data
    app.delete("/Products/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await ProductsCollection.deleteOne(query);
      res.send(result);
    });

    // MyCart API
    // Get MyCart
    app.get("/MyCart", async (req, res) => {
      try {
        // Extract the email from query parameters
        const email = req.query.email;

        // If an email is provided, filter the results
        const query = email ? { orderedBy: email } : {};

        // Fetch the results from the MyCartCollection based on the query
        const result = await MyCartCollection.find(query).toArray();

        // Send the results back to the client
        res.send(result);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send("Server error while fetching cart items.");
      }
    });
    // Post MyCart
    app.post("/MyCart", async (req, res) => {
      const request = req.body;
      const result = await MyCartCollection.insertOne(request);
      res.send(result);
    });
    // delete MyCart data
    app.delete("/MyCart/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await MyCartCollection.deleteOne(query);
      res.send(result);
    });

    // SellHistory API
    // Get SellHistory
    app.get("/SellHistory", async (req, res) => {
      try {
        // Extract the email from query parameters
        const email = req.query.email;

        // If an email is provided, filter the results
        const query = email ? { paidBy: email } : {};

        // Fetch the results from the SellHistoryCollection based on the query
        const result = await SellHistoryCollection.find(query).toArray();

        // Send the results back to the client
        res.send(result);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        res.status(500).send("Server error while fetching cart items.");
      }
    });
    // Post SellHistory
    app.post("/SellHistory", async (req, res) => {
      const request = req.body;
      const result = await SellHistoryCollection.insertOne(request);
      res.send(result);
    });
    // Update SellHistory
    app.put("/SellHistory/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const updatedHistory = req.body;
      const result = await SellHistoryCollection.updateOne(query, {
        $set: updatedHistory,
      });
      res.send(result);
    });

    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}
run().catch(console.dir);

// Set up the basic route
app.get("/", (req, res) => {
  res.send("Mobile Brand Shop is Running");
});

// Listen on the specified port
app.listen(port, () => {
  console.log(`Mobile Brand Shop is Running on Port: ${port}`);
});
