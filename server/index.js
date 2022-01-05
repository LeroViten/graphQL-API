const app = require('../app');
const mongoose = require('mongoose');
require('dotenv').config();

const { PORT, MONGO_USER, PASSWORD, DB_NAME } = process.env;

mongoose
  .connect(
    `mongodb+srv://${MONGO_USER}:${PASSWORD}@cluster0.9x8mv.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
  )
  .then(() => {
    app.listen(PORT, console.log(`Server is running on port ${PORT}`));
  })
  .catch((error) => {
    console.log(error.message);
  });
