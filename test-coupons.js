import mongoose from "mongoose";
async function run() {
  await mongoose.connect("mongodb://127.0.0.1:27017/condiceSconto");
  const coupons = await mongoose.connection.db.collection('coupons').find({}).toArray();
  console.log(JSON.stringify(coupons, null, 2));
  process.exit(0);
}
run();
