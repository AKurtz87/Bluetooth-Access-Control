// Fetch data from your API and populate the table
fetch("/api/devices")
  .then((response) => response.json())
  .then((data) => {
    const tableBody = document.getElementById("tableBody");
    data.forEach((row) => {
      const tr = document.createElement("tr");
      Object.values(row).forEach((text) => {
        const td = document.createElement("td");
        td.textContent = text;
        tr.appendChild(td);
      });
      tableBody.appendChild(tr);
    });
  });
