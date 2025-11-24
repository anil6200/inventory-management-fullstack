const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();


// Middlewares
app.use(express.json());
app.use(cors());



app.get('/',(req,res)=>{
    res.send("Server is perfectly working")
})

//Db Connection
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

app.use('/api/auth', require('./routes/Authroutes'));
app.use('/api/products', require('./routes/Productroutes'));

// Error Handling Middleware [cite: 17]
app.use((err, req, res, next) => {
    const statusCode = res.statusCode ? res.statusCode : 500;
    res.status(statusCode).json({ message: err.message });
});


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));


module.exports = app;

