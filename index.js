const express = require("express");
const app = express();
const mongoose = require("mongoose");
const authroutes=require("./routes/authRoutes");
const protectedRoutes = require('./routes/protected');
const PORT=8000



require('dotenv').config();
app.use(express.json());
app.use(express.urlencoded({ extended:false }));



// database configuration
mongoose.connect("mongodb://localhost:27017/apitest", {
   useNewUrlParser: true,
   useUnifiedTopology: true
});



app.use("/api/auth", authroutes);
app.use('/protected', protectedRoutes);



// port number to connect to (default)

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



