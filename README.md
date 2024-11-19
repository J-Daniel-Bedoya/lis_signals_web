# README for Lis Web Signals

## Project Overview

Lis Web Signals is a React application designed to manage a network of links and sectorial equipment, specifically visualizing Mikrotik antenna signals. The application provides a user-friendly interface to monitor and manage tower and sectorial equipment data in real-time.

## Features

- Display a list of towers with associated sectorial equipment.
- Visualize antenna signals and user details for each sector.
- Fetch data from an API to keep information up-to-date.

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/lis-web-signals.git
   ```
2. Navigate to the project directory:
   ```
   cd lis-web-signals
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:

```
npm start
```

This will launch the app in your default web browser at `http://localhost:3000`.

## Project Structure

```
lis-web-signals
├── public
│   ├── index.html
│   └── favicon.ico
├── src
│   ├── components
│   │   ├── TowerList.jsx
│   │   └── SectorList.jsx
│   ├── App.jsx
│   ├── index.js
│   └── styles
│       └── App.css
├── package.json
├── .gitignore
└── README.md
```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
