const express = require('express');
const route = require('../../routes/index');
const app = express();
const cors = require('cors');

app.use(
    express.urlencoded({
        extended: true,
    })
);
app.use(cors())
app.use(express.json());
app.listen(5000)
//router
route(app);