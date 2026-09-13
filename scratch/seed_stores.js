const mongoose = require("mongoose");


// Since the project uses ES modules for the data, we'll write a simple Node script
// using dynamic import or just reading the file. But Next.js models might use ES modules.
// Let's create an async IIFE to use dynamic import for the data and model.

async function seed() {
  try {
    const MONGODB_URI = process.env.MONGODB_URI;
    if (!MONGODB_URI) {
      throw new Error("MONGODB_URI is not defined in .env.local");
    }

    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB.");

    // Import the Store model (it's an ES module, so we might need to recreate the schema here if dynamic import fails, 
    // but Node 20+ supports it. Let's define it here to be safe and avoid transpile issues)
    const storeSchema = new mongoose.Schema(
      {
        name: { type: String, required: true, trim: true },
        slug: { type: String, required: true, unique: true, trim: true, lowercase: true },
        logoPath: { type: String, required: true, default: "/images/placeholder.png" },
        description: { type: String, trim: true },
        websiteUrl: { type: String, trim: true },
        isActive: { type: Boolean, default: true },
      },
      { timestamps: true }
    );
    const Store = mongoose.models.Store || mongoose.model("Store", storeSchema);

    // Read the static data. Because it's an export const, we might need to parse it if we can't import it.
    // Instead of importing, I'll just dynamically import it, but we might hit JSX/Next transpilation issues.
    // Let's try dynamic import, if it fails, I'll provide the array directly.
    let storesData;
    try {
      const storesModule = await import("../src/data/stores/storesData.js");
      storesData = storesModule.stores;
    } catch (err) {
      console.warn("Could not dynamically import storesData.js, trying with a local copy...");
      // For simplicity, we just use the raw data if it fails, or regex parse it.
      // But actually, it's a standard ES module. Node might complain about missing package.json "type": "module".
      // So I will just copy a few test stores or read the file as text and parse it.
      const fs = require('fs');
      const path = require('path');
      const fileContent = fs.readFileSync(path.join(__dirname, '../src/data/stores/storesData.js'), 'utf-8');
      
      // regex to extract stores array
      const match = fileContent.match(/export const stores = (\[[\s\S]*?\]);/);
      if (match) {
        // Evaluate it safely
        storesData = eval(match[1]);
      } else {
        throw new Error("Could not parse storesData.js");
      }
    }

    console.log(`Found ${storesData.length} stores to seed.`);

    let created = 0;
    let updated = 0;

    for (const store of storesData) {
      const result = await Store.updateOne(
        { slug: store.slug },
        { 
          $set: {
            name: store.name,
            slug: store.slug,
            logoPath: store.logoPath,
            isActive: true
          }
        },
        { upsert: true }
      );
      
      if (result.upsertedCount > 0) created++;
      else if (result.modifiedCount > 0) updated++;
    }

    console.log(`Seeding complete. Created: ${created}, Updated: ${updated}`);
    
  } catch (error) {
    console.error("Seeding error:", error);
  } finally {
    mongoose.disconnect();
  }
}

seed();
