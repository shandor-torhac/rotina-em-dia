import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <div className="app-layout">
      <Sidebar activePage={activePage} onNavigate={setActivePage} />

      <div className="main-content">
        {activePage === "dashboard" && <Dashboard />}

        {activePage !== "dashboard" && (
          <main className="dashboard">
            <h1>Em desenvolvimento</h1>
            <p>Esta seção será construída em breve.</p>
          </main>
        )}
      </div>
    </div>
  );
}

export default App;
