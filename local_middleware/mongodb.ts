const { MongoClient } = require("mongodb");
const uri = process.env.DATABASE_URL;
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

export default client;
