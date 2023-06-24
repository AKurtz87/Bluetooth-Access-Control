# Bluetooth Data Scanner & Analyzer

Bluetooth Data Scanner & Analyzer is a solution designed to detect, log, and perform operations on Bluetooth devices data collected.

## Features

+ **Bluetooth Scanning:** The application can scan all Bluetooth devices in the area using the `02.1_scan.js` script.

+ **Data Collection & Storage:** The application saves all the scanned data in a single-line JSON file, which is suitable for big data operations.

+ **Data Import to SQLite Database:** You can run the `02.2_fromJsonToDB.js` script to import this single-line JSON data into a SQLite database.

+ **HTTP Server and Data Visualization:** By launching the `01_main.js` script, you can start an HTTP server and visualize and perform operations on the collected 

## Installation

To install and get the Bluetooth Data Scanner & Analyzer up and running, follow these steps:

1. Clone the repository from GitHub:
    >`git clone https://github.com/YourGithubUsername/Bluetooth-Data-Scanner-Analyzer.git`

2. Navigate to the project's directory and install the required dependencies by running:
    >`npm install`

3. Run the following script to capture Bluetooth devices data and create the single-line JSON data:
    >`02.1_scan.js`

4. Run the following script to import the single-line JSON data into your SQLite database:
    >`node 02.2_fromJsonToDB.js`

5. To start the application server, use:
    >`node 01_main.js`

You can then access the application by navigating to http://localhost:3000 (or whichever port you've set) in your web browser.

## Usage

Once the application is installed and running, the following steps outline the typical workflow:

1. The application begins scanning for all Bluetooth devices in the area and collects data.

2. All the collected data gets stored in a single-line JSON file, optimized for big data operations.

<img width="1275" alt="Screenshot 2023-06-24 at 13 20 40" src="https://github.com/AKurtz87/Bluetooth-Data-Scanner-Analyzer/assets/91114967/c611ab90-a850-4c4f-b4d2-2092967271e3">

4. You can then run the `02.2_fromJsonToDB` script to import the data from the JSON file into a SQLite database.

5. With the HTTP server running (triggered by `01_main.js`), you can visualize and perform operations on the collected Bluetooth data through the web interface.

+ **Owner Association:** On the main page, you can associate the UUID of a Bluetooth device with its owner (which could be a person, piece of equipment, or any other entity with a Bluetooth device).

<img width="1201" alt="Screenshot 2023-06-24 at 13 28 20" src="https://github.com/AKurtz87/Bluetooth-Data-Scanner-Analyzer/assets/91114967/a3169a62-ca50-4632-83e3-6c6e679b3ef6">

+ **Owner-Specific Data Page:** A separate page allows you to view only the data associated with a specific owner.

<img width="1199" alt="Screenshot 2023-06-24 at 13 29 53" src="https://github.com/AKurtz87/Bluetooth-Data-Scanner-Analyzer/assets/91114967/98e719ae-0f55-439e-b59f-1a24e2f95f00">

+ **Comprehensive Data List Page:** Another page lists all the collected data in a single, accessible format.

<img width="1198" alt="Screenshot 2023-06-24 at 13 30 41" src="https://github.com/AKurtz87/Bluetooth-Data-Scanner-Analyzer/assets/91114967/cb0811a8-720c-4c54-93fd-6a724018fa27">

## Contributing

We welcome contributions to the Bluetooth Data Scanner & Analyzer! If you encounter any issues or have suggestions for improvements, please submit them as GitHub issues in the repository. You may also fork the repository, make your changes, and submit a pull request for review. Please ensure that your contributions align with the project's coding conventions and follow the established guidelines.

