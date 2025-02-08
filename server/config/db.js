const mongoose = require('mongoose');
// const uri = mongodb+srv://kelvinfabio2:YsemPrXYtyDksMrn@cluster0.ngr4v.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0;

require('dotenv').config();

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
  try {
    
    await mongoose.connect(process.env.MONGODB_URI, clientOptions);
    await mongoose.connection.db.admin().command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    
    await mongoose.disconnect();
  }
}
run().catch(console.dir);

run()

module.exports = mongoose
