function updateWorkerList() {
  const workerTable = document.getElementById("workerTable");

  fetch("http://localhost:3000/workers")
    .then((response) => response.json())
    .then((data) => {
      // clear all rows except the header
      while (workerTable.rows.length > 1) {
        workerTable.deleteRow(1);
      }
      data.workers.forEach((worker) => {
        const row = workerTable.insertRow();

        const cellWorker = row.insertCell();
        cellWorker.textContent = worker.worker;

        const cellUuid = row.insertCell();
        cellUuid.textContent = worker.uuid;

        const cellUpdate = row.insertCell();
        const updateButton = document.createElement("button");
        updateButton.textContent = "Update";
        updateButton.addEventListener("click", () => {
          const newWorker = prompt("New worker name:", worker.worker);
          const newUuid = prompt("New UUID:", worker.uuid);
          fetch(`http://localhost:3000/worker/${worker.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ worker: newWorker, uuid: newUuid }),
          }).then(() => updateWorkerList());
        });
        cellUpdate.append(updateButton);

        const cellDelete = row.insertCell();
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete";
        deleteButton.addEventListener("click", (event) => {
          event.preventDefault();
          if (confirm("Delete this worker?")) {
            fetch(`http://localhost:3000/worker/${worker.id}`, {
              method: "DELETE",
            }).then(() => updateWorkerList());
          }
        });
        cellDelete.append(deleteButton);
      });
    });
}

document
  .getElementById("workerForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const worker = event.target.worker.value;
    const uuid = event.target.uuid.value;

    fetch("http://localhost:3000/associate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ worker, uuid }),
    }).then(() => {
      event.target.worker.value = "";
      event.target.uuid.value = "";
      updateWorkerList();
    });
  });

updateWorkerList();
