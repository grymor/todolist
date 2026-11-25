import Layout from "./components/Layout";
import { Route, Routes } from "react-router-dom";
import UsersPage from "./components/Pages/UsersPage";
import DashBoardsPage from "./components/Pages/DashBoardsPage";
import ReceiptsPage from "./components/Pages/ReceiptsPage";
import Home from "./components/Pages/Home";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/users" element={<UsersPage />} />
        <Route path="/receipts" element={<ReceiptsPage />} />
        <Route path="/dashboards" element={<DashBoardsPage />} />
      </Route>
    </Routes>
  );
}

export default App;
