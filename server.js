const express=require('express');
const dotenv=require("dotenv").config();
const app=express();
const connectDb=require('./config/dbConnection')

const port=process.env.PORT || 5000;

app.use(express.json())
app.use(require("./middleware/errorHandler"))
connectDb();

app.use('/api/contacts',require("./routes/contactRoutes"))
app.use('/api/users',require('./routes/userRoutes'))
app.listen(port,()=>{
    console.log(`server running on port ${port}`);
});