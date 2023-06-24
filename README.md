# Bluetooth Data Scanner & Analyzer

Bluetooth Data Scanner & Analyzer is a solution designed to detect, log, and perform operations on Bluetooth devices data collected.

## Features

+ **Bluetooth Scanning:** The application can scan all Bluetooth devices in the area using the 02.1_scan script.

+ **Data Collection & Storage:** The application saves all the scanned data in a single-line JSON file, which is suitable for big data operations.

+ **Data Import to SQLite Database:** You can run the `02.2_fromJsonToDB` script to import this single-line JSON data into a SQLite database.

+ **HTTP Server and Data Visualization:** By launching the `01_main.js` script, you can start an HTTP server and visualize and perform operations on the collected 

## Installation

To install and get the Bluetooth Data Scanner & Analyzer up and running, follow these steps:

1. Clone the repository from GitHub:
    >`git clone https://github.com/YourGithubUsername/Bluetooth-Data-Scanner-Analyzer.git`

2. Navigate to the project's directory and install the required dependencies by running:
    >`npm install`

3. Run the following script to import the single-line JSON data into your SQLite database:
    >`node 02.2_fromJsonToDB.js`

4. To start the application server, use:
    >`node 01_main.js`

You can then access the application by navigating to http://localhost:3000 (or whichever port you've set) in your web browser.

## Usage

Once the application is installed and running, the following steps outline the typical workflow:

1. The application begins scanning for all Bluetooth devices in the area and collects data.

2. All the collected data gets stored in a single-line JSON file, optimized for big data operations.

3. You can then run the `02.2_fromJsonToDB` script to import the data from the JSON file into a SQLite database.

4. With the HTTP server running (triggered by `01_main.js`), you can visualize and perform operations on the collected Bluetooth data through the web interface.

## Contributing

We welcome contributions to the Bluetooth Data Scanner & Analyzer! If you encounter any issues or have suggestions for improvements, please submit them as GitHub issues in the repository. You may also fork the repository, make your changes, and submit a pull request for review. Please ensure that your contributions align with the project's coding conventions and follow the established guidelines.

