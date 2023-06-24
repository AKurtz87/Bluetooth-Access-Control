const workerSelect = document.querySelector("#workerSelect");
const getDataButton = document.querySelector("#getDataButton");
const devicesTable = document.querySelector("#devicesTable");

window.onload = async function () {
  const response = await fetch("/api/workers");
  const workers = await response.json();
  console.log(workers);

  workers.forEach((worker) => {
    const option = document.createElement("option");
    option.text = worker.worker;
    workerSelect.add(option);
  });
};
getDataButton.addEventListener("click", async function () {
  // Delete existing table
  const existingTable = document.getElementById("devicesTable");
  if (existingTable) existingTable.remove();
  // Create table and table head elements
  const table = document.createElement("table");
  table.id = "devicesTable";
  const thead = document.createElement("thead");
  const tr = document.createElement("tr");
  ["Position", "Time", "UUID", "Address"].forEach((text) => {
    const th = document.createElement("th");
    th.textContent = text;
    tr.appendChild(th);
  });
  thead.appendChild(tr);
  table.appendChild(thead);

  // Insert table into body, or wherever you want to put it
  document.body.appendChild(table);

  console.log(workerSelect.value);

  const uuid = workerSelect.value;

  const response = await fetch(`/api/devices/${uuid}`);
  const devices = await response.json();
  console.log(devices);

  devices.forEach((device) => {
    let row = table.insertRow(); // change to insert into the new table
    let cell1 = row.insertCell();
    let cell2 = row.insertCell();
    let cell3 = row.insertCell();
    let cell4 = row.insertCell();
    cell1.innerHTML = device.Position;
    cell2.innerHTML = device.Time;
    cell3.innerHTML = device.UUID;
    cell4.innerHTML = device.Address;
  });
});
