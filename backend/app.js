const path = require ("path");
const express = require('express');
const bodyParser = require ('body-parser');
const app = express();
const Job = require('./models/job');
const mongoose = require ('mongoose');
const postsRoutes = require ('./routes/jobs');
const { readBufferWithDetectedEncoding } = require('tslint/lib/utils');
mongoose.connect('mongodb+srv://EDITteam:j2lsmxysY2MPKD54@clusteredit.8deni.mongodb.net/fullenceDB?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })

.then(()=>{
  console.log('Connected to database');
})
.catch(()=>{
  console.log('Connection failed');
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use("/images", express.static(path.join("backend/images"))); //da moze pristupati images folderu backend
app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers","Origin, X-Requested-With, Content-Type, Accept");
  res.setHeader("Access-Control-Allow-Methods","GET, PUT, POST, PATCH, DELETE, OPTIONS");
  next();
});

app.use("/api/jobs", postsRoutes);

module.exports = app;
