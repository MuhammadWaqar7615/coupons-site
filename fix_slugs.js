const mongoose = require('mongoose');

const MONGODB_URI = "mongodb+srv://mwaqar7615_db_user:yErdfgY86hCEjg6Y@cluster0.etu0ai0.mongodb.net/codice_sconto?appName=Cluster0";

async function run() {
  await mongoose.connect(MONGODB_URI);
  const db = mongoose.connection.db;
  
  const stores = await db.collection('stores').find().toArray();
  for (const store of stores) {
    if (store.slug && store.slug.includes(' ')) {
      const newSlug = store.slug.replace(/\s+/g, '-').toLowerCase();
      await db.collection('stores').updateOne(
        { _id: store._id },
        { $set: { slug: newSlug } }
      );
    }
  }

  const coupons = await db.collection('coupons').find().toArray();
  for (const coupon of coupons) {
    if (coupon.slug && coupon.slug.includes(' ')) {
      const newSlug = coupon.slug.replace(/\s+/g, '-').toLowerCase();
      await db.collection('coupons').updateOne(
        { _id: coupon._id },
        { $set: { slug: newSlug } }
      );
    }
  }

  console.log('Fixed spaces in slugs!');
  process.exit(0);
}

run().catch(console.error);
