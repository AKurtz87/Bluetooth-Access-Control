const noble = require("@abandonware/noble");

// Store detected devices
let detectedDevices = {};

noble.on("stateChange", (state) => {
  if (state === "poweredOn") {
    noble.startScanning();
  } else {
    noble.stopScanning();
  }
});

noble.on("discover", (peripheral) => {
  const { advertisement, address } = peripheral;
  const { localName } = advertisement;
  const uuid = peripheral.uuid;

  // Get current timestamp
  const now = Date.now();

  // Get current location (assuming you have a way to get this)
  const currentLatitude = "44.12231752645742"; // Replace with your method to get latitude
  const currentLongitude = "10.18909904737028"; // Replace with your method to get longitude

  // Check if device has been detected in the last 30 minutes
  if (
    detectedDevices[uuid] &&
    now - detectedDevices[uuid].lastSeen <= 30 * 60 * 1000
  ) {
    return;
  }

  // Prepare the information as a single row
  const infoRow = `Position: (${currentLatitude}, ${currentLongitude}), Time: ${new Date(
    now
  ).toLocaleString()}, UUID: ${uuid}, Address: ${address}, Name: ${localName}`;

  // Print the row to the console
  console.log(infoRow);

  // Record that the device has been seen now
  detectedDevices[uuid] = { lastSeen: now };
});
