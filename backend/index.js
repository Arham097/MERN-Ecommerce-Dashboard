const express = require('express');
require('./db/config');
const cors = require('cors')
const userRoute = require('./db/Routes/UserRoute');
const productRoute = require('./db/Routes/ProductRoutes');



const app = express();
app.use(express.json());
app.use(cors());

app.use('/users', userRoute);
app.use('/products', productRoute)

app.listen(3000)