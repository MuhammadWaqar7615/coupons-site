import fs from 'fs';

function parseEnv() {
  const content = fs.readFileSync('.env', 'utf8');
  content.split('\n').forEach(line => {
    const match = line.match(/^([^=]+)=(.*)$/);
    if (match) {
      let val = match[2].trim();
      if (val.startsWith('"') && val.endsWith('"')) {
        val = val.substring(1, val.length - 1);
      }
      if (val.startsWith("'") && val.endsWith("'")) {
        val = val.substring(1, val.length - 1);
      }
      process.env[match[1].trim()] = val;
    }
  });
}
parseEnv();

import('./src/lib/mongodb.js').then(async (mongo) => {
  const connectMongo = mongo.default;
  const { default: Store } = await import('./src/models/Store.js');

  await connectMongo();
  const stores = await Store.find({}).lean();
  console.log(JSON.stringify(stores, null, 2));
  process.exit(0);
});
