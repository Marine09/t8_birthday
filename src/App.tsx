import { Route, Routes } from "react-router-dom";
import BirthdayDashboard from "./components/birthday/BirthdayDashboard";

function App() {
  return (
    <Routes>
      <Route path="/" element={<BirthdayDashboard />} />
    </Routes>
  );
}

export default App;
