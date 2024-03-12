import Sidebar from "./navbar/Sidebar";
import Tagcreate from "./pages/Tagscreate";
import NewTag from "./pages/NewTag";
import TagTable from "./pages/TagTable";
import Account from "./pages/Account";
import "./App.css";
import Header from "../src/component/Header";
import "boxicons";
import Layout from "./pages/Layout";
import NoPage from "./pages/NoPage";
import AdminLogin from "./pages/AdminLogin";
import AccountsData from "./pages/AccountsData";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import ContactTable from "./pages/ContactTable";
import AdminSignup from "../src/pages/AdminSignUp";
import FolderTemplate from "../src/pages/FolderTemplate";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/tags" element={<Tagcreate />} />
          <Route path="/tagtable" element={<TagTable />} />
          <Route path="/accounts" element={<AccountsData />} />
          <Route path="/contacts" element={<ContactTable />} />
          <Route path="/FolderTemplate" element={<FolderTemplate />} />

          <Route path="*" element={<NoPage />} />
          {/* <Route path="/dashboard" element={<Dashboard/>}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
