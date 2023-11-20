const express = require('express');

const app = express();
const cookieParser = require('cookie-parser');



app.use(express.json())
app.use(cookieParser())

//route Import
// const product = require("./Routes/ProductRoute");
// const user = require("./Routes/UserRoute");
// const order = require("./Routes/OrderRoute");

// app.use("/api/v1",product);
// app.use("/api/v1",user);
// app.use("/api/v1",order);

const auth = require("./Routers/authRoute");
const products = require("./Routers/productRoute");
const order = require("./Routers/orderRouter");


app.use("/api/v1",auth);
app.use("/api/v1",products);
app.use("/api/v1",order);


//middleware
// app.use(errorMiddleware)


module.exports=app