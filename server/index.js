const auth = require('./MiddleWares/auth.js');
const dotenv=require('dotenv');
const cors = require('cors');
const express = require('express');
const unless = require('express-unless');
const {Sequelize} = require('sequelize');
const bodyParser = require("body-parser");
const session = require("express-session");


const path =require('path');
const app = express()
app.use(cors()); 
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.raw({ type: 'application/json' }));
app.use(
  session({
    secret: "dfsf94835asda",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(express.json({ limit: '150mb' }));
 dotenv.config({path:'./config.env'});
 app.use(cors());
//  i18n.configure({
//      locales: ['en', 'ur'],
//      directory: path.join(__dirname, '../locales/'),
//      defaultLocale: 'en',
//      updateFiles: false,
//      objectNotation: true,
//      autoReload: false, 
//      syncFiles: false,  
//    });


//   const translate = require('@vitalets/google-translate-api');
//  translate('this is for testing purpose', {to: 'es'}).then(res => {
//      console.log(res.text);
//      //=> I speak English
//      console.log(res.from.language.iso);
//      //=> nl
//  }).catch(err => {
//      console.error(err);
//  });
 app.use("/Images", express.static("Images"));
 //routes
 const userRoute = require("./routes/userRouter.js");
 const chatRoute = require("./routes/chatRouter.js");
// middleware
app.use('/user', userRoute);
 app.use('/chat', chatRoute);
 




  


//previosly connected mongodb<................Now Converting To Sequelizing..............>
//  connectDB()
// .then(() => {

// app.listen(process.env.PORT || 9090, () => {
//   console.log(`⚙️ Server is running at port : ${process.env.PORT || 9090}`);
// });
// })
// .catch((err) => {
//     console.log("MONGO db connection failed !! ", err);
// })
//   app.listen(process.env.PORT,()=>{
//     console.log(" Server is running on port 5000");
// });
app.listen(process.env.PORT,()=>{
  console.log(`Server is running ${process.env.PORT}`);
});
module.exports = { app };






