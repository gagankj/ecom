require("dotenv").config()
const express =require("express") // importing express
const app=express() // callling express
const mongoose =require ("mongoose")// importing mongoose
const PORT=process.env.PORT || 5000; // port where server will be listening to
const cors =require("cors")
const cookieParser=require("cookie-parser")
const corsOptions = {
    origin: "http://localhost:5173",  // Allow your frontend origin
    credentials: true,  // Allow credentials (cookies, HTTP authentication, etc.)
    methods: ["GET", "POST", "PUT", "DELETE"],  // Allowed HTTP methods
    allowedHeaders: ["Content-Type", "Authorization"],  // Allowed headers
};

app.use(cors(corsOptions));// to enable cors to make it accessible to frontend
app.use(express.json()); // to parse json bodies
app.use(cookieParser())
//Routes
const  authRoute =require("./routes/authRoute")

//connecting to mongodb database
mongoose.connect(process.env.MONGO_URI)
.then(()=>{console.log("mongodb connected");})
.catch((error)=>{console.error(error);})


// Auth Route
app.use("/api/auth",authRoute);




// Server listenting
app.listen(PORT,()=>{
    console.log(`server is running at http://localhost:${PORT}`);
})