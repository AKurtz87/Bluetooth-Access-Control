function updateWorkerList() {
  const workerList = document.getElementById("workerList");

  fetch("http://localhost:3000/workers")
    .then((response) => response.json())
    .then((data) => {
      workerList.innerHTML = "";
      data.workers.forEach((worker) => {
        const li = document.createElement("li");
        li.textContent = `${worker.worker} (UUID: ${worker.uuid})`;
        li.addEventListener("click", () => {
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
        li.addEventListener("contextmenu", (event) => {
          event.preventDefault();
          if (confirm("Delete this worker?")) {
            fetch(`http://localhost:3000/worker/${worker.id}`, {
              method: "DELETE",
            }).then(() => updateWorkerList());
          }
        });
        workerList.append(li);
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
