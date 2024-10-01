import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";

import CollegeTable from "./CollegeTable";

function App() {
  return (
    <div className="App">
      <header className="App-header">{/* <h1>College List</h1> */}</header>
      <main>
        <CollegeTable />
      </main>
    </div>
  );
}

export default App;
