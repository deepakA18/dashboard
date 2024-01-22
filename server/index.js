const express = require('express');
const app = express();
const cors = require('cors')

require('dotenv').config({path: '.env'})
const connectDB = require('./db/conn')

const data = require('./routes/data')


const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json()); 

app.use('/api',data);



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