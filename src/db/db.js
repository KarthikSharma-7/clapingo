const mongoose = require("mongoose");
const env = require("dotenv").config();

exports.mongoConnection = () => {
  mongoose
    .connect(
      `mongodb+srv://${process.env.N}:${process.env.P}@cluster0.tzpyjpf.mongodb.net/${process.env.D}?retryWrites=true&w=majority`,
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    )
    .then(() => {
      console.log(`Connected to DB`);
    })
    .catch((e) => {
      console.log(e);
    });
};
