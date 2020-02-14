const express = require('express');
const server = express();
const port = 3030;
server.use(express.json())

const apiRoutes  = require('./api/apiRoutes');


server.use('/api', apiRoutes)

server.listen(port, () => {console.log(`It appears to be running on port ${port}`)})