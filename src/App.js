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
import Pipeline from "../src/pages/Pipeline";
import CreateFolderTemplate from "../src/pages/CreateFolderTemplate";
import Login from "../src/pages/AdminLogin";
import Signup from "../src/pages/AdminSignUp";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="/tags" element={<Tagcreate />} />
          <Route path="/accounts" element={<AccountsData />} />
          <Route path="/contacts" element={<ContactTable />} />
          <Route path="/createFoldertemplate" element={<CreateFolderTemplate />} />
          <Route path="/pipeline" element={<Pipeline />} />
          <Route path="*" element={<NoPage />} />
        </Route>
        <Route path="login1" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
