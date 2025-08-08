import React from "react";
import Home from "./pages/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Profile from "./pages/Profile.jsx";
import Balance from "./pages/Balance.jsx";
import Accounts from "./pages/Accounts.jsx";
import Transfer from "./pages/Transfer.jsx";
import TransactionLogs from "./pages/TransactionLogs.jsx";
import Settings from "./pages/Settings.jsx";
import Address from "./pages/Address.jsx";
function App(){
 return(
     <Router>
         <Routes>
             <Route path="/" element={<Home />} />
             <Route path="/login" element={<Login />} />
             <Route path="/register" element={<Register />} />
             {/* profile layout route */}
             <Route path="/profile" element={<Profile />}>
                 <Route path="balance" element={<Balance />} />
                 <Route path="accounts" element={<Accounts />} />
                 <Route path="transfer" element={<Transfer />} />
                 <Route path="transactions-logs" element={<TransactionLogs />} />
                 <Route path="addresses" element={<Address />} />
                 <Route path="user-settings" element={<Settings />} />
             </Route>

         </Routes>
     </Router>
 );
}

export default App;