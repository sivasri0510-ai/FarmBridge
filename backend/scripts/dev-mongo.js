const { MongoMemoryServer } = require('mongodb-memory-server');
const fs = require('fs');
const path = require('path');

(async () => {
  const dbPath = path.join(__dirname, '..', '.mongo-data');
  fs.mkdirSync(dbPath, { recursive: true });

  const mongod = await MongoMemoryServer.create({
    instance: { port: 27017, dbPath, storageEngine: 'wiredTiger' },
  });

  console.log(`✅ Local MongoDB running at ${mongod.getUri()}`);
  console.log('Ee terminal open ga undali. Aapadaniki Ctrl + C.');

  const stop = async () => {
    await mongod.stop();
    process.exit(0);
  };
  process.on('SIGINT', stop);
  process.on('SIGTERM', stop);
})();