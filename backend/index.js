// const express=require("express")
// const cors=require("cors")
// const dotenv=require("dotenv")
// const connectDB=require("./config/db")
// dotenv.config()
// const path = require('path');

// connectDB();

// const app=express()

// app.use(cors(
//     {
//        origin:['http://localhost:3000','http://127.0.0.1:3000', process.env.FRONTEND_URL],
//        credentials:true 
//     }
// ));
// app.use(express.json());
// app.use(express.urlencoded({ extended:true }));


// app.get("/",(req,res)=>{
//     res.send(`shopnest backend is working properly!`)
// })


// app.use("/api/auth", require('./routes/authRoutes'))
// app.use("/api/products", require('./routes/productRoutes'))
// app.use("/api/orders", require('./routes/orderRoutes'))
// app.use("/api/payment", require('./routes/paymentRoutes'))
// app.use("/api/analytics", require('./routes/analyticsRoutes'))


// // Serve frontend in production
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, '../frontend/build')));

//   app.use('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, '../frontend/build/index.html'));
//   });
// } else {
//   app.get('/', (req, res) => {
//     res.send('ShopNest API is running in Development mode...');
//   });
// }




// const port= process.env.PORT || 5000

// app.listen(port,()=>{
//     console.log(`server is running at port ${port}`) 
// })













const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const path = require("path");

dotenv.config();
connectDB();

const app = express();

app.use(
    cors({
        origin: [
            "http://localhost:3000",
            "http://127.0.0.1:3000",
            process.env.FRONTEND_URL
        ],
        credentials: true
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/payment", require("./routes/paymentRoutes"));
app.use("/api/analytics", require("./routes/analyticsRoutes"));

// Serve React frontend in production
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../frontend/build")));

    app.use((req, res, next) => {
        if (req.path.startsWith("/api")) {
            return next();
        }

        res.sendFile(
            path.join(__dirname, "../frontend/build/index.html")
        );
    });
}

// Backend health check
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        message: "ShopNest backend is working properly!"
    });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
});