require('dotenv').config();
const express = require('express');
const server = express();
const port = process.env.PORT;
server.use(express.json())

const apiRoutes  = require('./api/apiRoutes');


server.use('/api', apiRoutes)

server.listen(port, () => {console.log(`It appears to be running on port ${port}`)})