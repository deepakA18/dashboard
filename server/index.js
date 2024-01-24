const express = require('express');
const app = express();
const cors = require('cors')

require('dotenv').config({path: '.env'})
const connectDB = require('./db/conn')

const Data = require('./model/dataSchema')


const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); 

app.get('/api/data',async (req,res)=> {
    try {
        const filters = req.query;
        const data = await Data.find(filters);
        res.status(200).json({msg: "Successfully fetched data.", data});
    } catch (error) {
        return res.status(500).json({msg: "Internal server error!",error})
    }
})



const start = async () => {
    try {
        await connectDB(process.env.URI)
            app.listen(port,()=> {
                console.log(`server running on port ${port}...`);
            })
        
    } catch (error) {
        console.log('Error connecting database...!',error)
    }
}

start();