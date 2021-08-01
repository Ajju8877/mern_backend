const mongoose = require("mongoose");

// mongoDB connection using mongoose

const DB =
  "mongodb+srv://ajju8877:ajjumern@cluster0.5uonh.mongodb.net/mernstack?retryWrites=true&w=majority";
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log(`connection sucessful`);
  })
  .catch((err) => {
    console.log(`no connection`);
  });

module.exports = DB;
