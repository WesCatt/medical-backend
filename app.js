require('dotenv').config();
const express = require("express");
const cors = require("cors");
const dataRoute = require('./routes/dataRoute');

const app = express();
// 日期
const port = process.env.PORT || 2587;
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));
app.use(cors());
app.use('/api', dataRoute);

app.listen(port, () => {
    console.log("SERVER RUNNING..");
});