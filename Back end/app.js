require('dotenv').config();
require('express-async-errors');
const https = require("https");
const fs = require("fs");

// extra security packages
const helmet = require('helmet');
const cors = require('cors');
const xss = require('xss-clean');
const rateLimiter = require('express-rate-limit');


const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const authenticateUser = require('./middleware/authentication');
// routers
const authRouter = require('./routes/auth');
const productRouter = require('./routes/Product');
const saleRouter = require('./routes/sale')
// error handler
const notFoundMiddleware = require('./middleware/not-found');
const errorHandlerMiddleware = require('./middleware/error-handler');

app.set('trust proxy', 1);
app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  })
);
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get('/', (req, res) => {
  res.send('<h1>Shop Manager System API</h1>');
});

// routes 
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/shop',authenticateUser, productRouter);
app.use('/api/v1/sale',authenticateUser, saleRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 5000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    // Creating object of key and certificate
    // for SSL
    // const options = {
    //   key: fs.readFileSync("cert/cert-key.pem"),
    //   cert: fs.readFileSync("cert/fullchain.pem"),
    // };
      
    // // Creating https server by passing
    // // options and app object
    // https.createServer(options, app)
    // .listen(port, function (req, res) {
    //   console.log("Server started at port", port);
    // });
    app.listen(port, () =>
      console.log(`Server is listening on port ${port}...`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
