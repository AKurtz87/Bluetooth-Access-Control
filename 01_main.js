// Required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const sqlite3 = require("sqlite3").verbose();

// Create an instance of express
const app = express();

// Server public directory and all childs directories
app.use(express.static("public"));

// Serve the HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.get("/selectWorker", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "workers.html"));
});

app.get("/allScanData", function (req, res) {
  res.sendFile(path.join(__dirname, "public", "devices.html"));
});

// Use bodyParser middleware to parse json
app.use(bodyParser.json());

// Initialize the SQLite database
const db = new sqlite3.Database("./workers.db", (err) => {
  if (err) {
    console.error(err.message);
  } else {
    console.log("Connected to the workers database.");

    // Create the workers table if it doesn't exist
    db.run(
      "CREATE TABLE IF NOT EXISTS workers (id INTEGER PRIMARY KEY, worker TEXT, uuid TEXT)",
      (err) => {
        if (err) {
          console.error(err.message);
        } else {
          console.log("Workers table ready.");
        }
      }
    );
  }
});

// CREATE: Associate worker with a UUID
app.post("/associate", (req, res) => {
  let worker = req.body.worker;
  let uuid = req.body.uuid;

  // Check if worker and uuid are provided
  if (!worker || !uuid) {
    return res.status(400).json({ error: "Worker and UUID are required." });
  }

  // Save the worker-uuid association
  db.run(
    `INSERT INTO workers (worker, uuid) VALUES (?, ?)`,
    [worker, uuid],
    function (err) {
      if (err) {
        return console.error(err.message);
      }

      // Log the operation
      console.log(`CREATE: Worker ${worker} with UUID ${uuid}`);

      // Respond with success message
      res.json({
        message: `Worker ${worker} has been associated with device UUID ${uuid}`,
      });
    }
  );
});

// READ: Get a worker by UUID
app.get("/worker/:uuid", (req, res) => {
  let uuid = req.params.uuid;

  db.get(`SELECT * FROM workers WHERE uuid = ?`, [uuid], (err, row) => {
    if (err) {
      return console.error(err.message);
    }

    // Log the operation
    console.log(`READ: Worker with UUID ${uuid}`);

    res.json({ worker: row });
  });
});

// READ ALL: Get all workers
app.get("/workers", (req, res) => {
  db.all(`SELECT * FROM workers`, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }

    // Log the operation
    console.log(`READ ALL: ${rows.length} workers`);

    res.json({ workers: rows });
  });
});

// UPDATE: Update worker's UUID
app.put("/worker/:id", (req, res) => {
  let id = req.params.id;
  let worker = req.body.worker;
  let uuid = req.body.uuid;

  db.run(
    `UPDATE workers SET worker = ?, uuid = ? WHERE id = ?`,
    [worker, uuid, id],
    function (err) {
      if (err) {
        return console.error(err.message);
      }

      // Log the operation
      console.log(`UPDATE: Worker ${id} to ${worker} with UUID ${uuid}`);

      res.json({ message: `Worker ${id} updated.` });
    }
  );
});

// DELETE: Remove a worker
app.delete("/worker/:id", (req, res) => {
  let id = req.params.id;

  db.run(`DELETE FROM workers WHERE id = ?`, id, function (err) {
    if (err) {
      return console.error(err.message);
    }

    // Log the operation
    console.log(`DELETE: Worker ${id}`);

    res.json({ message: `Worker ${id} removed.` });
  });
});

// Endpoint to get workers' data from the SQLite3 database
app.get("/api/workers", async (req, res) => {
  const dbWorkersName = new sqlite3.Database(
    "./workers.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      }
    }
  );

  const sql = "SELECT worker, UUID FROM workers";
  dbWorkersName.all(sql, [], (err, rows) => {
    if (err) {
      console.error(err.message);
      res.status(500).send(err);
    }
    res.send(rows);
  });

  // Close the database connection
  dbWorkersName.close((err) => {
    if (err) {
      console.error(err.message);
    }
  });
});

// Endpoint to get devices data from the SQLite3 database
app.get("/api/devices/:uuid", async (req, res) => {
  let name = req.params.uuid;

  console.log(name);

  const dbWorkersUUID = new sqlite3.Database(
    "./workers.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      }
    }
  );

  dbWorkersUUID.get(
    `SELECT uuid FROM workers WHERE worker = ?`,
    [name],
    (err, row) => {
      if (err) {
        return console.error(err.message);
      }

      // Log the operation
      console.log(`READ: UUID from ${name}`);
      console.log(row.uuid);

      dbWorkersUUID.close((err) => {
        if (err) {
          console.error(err.message);
        }
      });

      const dbDevicesUUIDselected = new sqlite3.Database(
        "./devices.db",
        sqlite3.OPEN_READONLY,
        (err) => {
          if (err) {
            console.error(err.message);
            res.status(500).send(err);
          }
        }
      );

      const sql = `SELECT * FROM devices WHERE UUID = ?`;
      dbDevicesUUIDselected.all(sql, [row.uuid], (err, rows) => {
        if (err) {
          console.error(err.message);
          res.status(500).send(err);
        }
        res.send(rows);
      });

      // Close the database connection
      dbDevicesUUIDselected.close((err) => {
        if (err) {
          console.error(err.message);
        }
      });
    }
  );
});

// Endpoint to get data from your SQLite3 database
app.get("/api/devices", (req, res) => {
  let dbAllScan = new sqlite3.Database(
    "./devices.db",
    sqlite3.OPEN_READONLY,
    (err) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err);
      }
    }
  );

  let sql = `SELECT Position, Time, UUID, Address FROM devices`;
  dbAllScan.all(sql, [], (err, rows) => {
    if (err) {
      throw err;
    }
    res.send(rows);
  });

  // Close the database connection
  dbAllScan.close();
});

// Start the server
app.listen(3000, () => console.log("Server is running on port 3000..."));
