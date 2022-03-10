const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/demoMongoDB";

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .catch((err) => console.log(err));

const db = mongoose.connection;
