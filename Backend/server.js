
const app = require('./app');
const connectdb = require('./Config/Database');
const dotenv = require('dotenv');
dotenv.config({path:"Backend/config/config.env"});


connectdb();



const server = app.listen(process.env.port,()=>{
    console.log(`server is working on http://localhost:${process.env.PORT}`)
})