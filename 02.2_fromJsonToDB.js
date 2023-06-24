const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const readline = require("readline");

async function processDevices() {
  // Create a new database if it doesn't exist yet
  const db = new sqlite3.Database(
    "./devices.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
      if (err) {
        console.error(err.message);
      }
    }
  );

  // Create table if it doesn't exist yet
  db.run(
    `CREATE TABLE IF NOT EXISTS devices(
    Position TEXT,
    Time TEXT,
    UUID TEXT,
    Address TEXT
  )`,
    (err) => {
      if (err) {
        console.log(err);
      }
    }
  );

  const fileStream = fs.createReadStream("devices.json");
  const rl = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  // Line by line, parse each device and insert it into the database
  for await (const line of rl) {
    const device = JSON.parse(line);
    await new Promise((resolve, reject) => {
      db.run(
        `INSERT INTO devices(Position, Time, UUID, Address) VALUES(?, ?, ?, ?)`,
        [device.Position, device.Time, device.UUID, device.Address],
        (err) => {
          if (err) {
            console.error(err);
            reject(err);
          } else {
            console.log(`Device with UUID ${device.UUID} inserted.`);
            resolve();
          }
        }
      );
    });
  }

  // Close the database connection
  db.close((err) => {
    if (err) {
      console.error(err.message);
    }
    console.log("Close the database connection.");
  });
}

processDevices();
