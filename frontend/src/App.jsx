import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Register from "./attendee/pages/UserRegister";
import Login from "./attendee/pages/Login";
import Dashboard from "./attendee/pages/Dashboard";
import { AuthProvider } from "./attendee/components/AuthContext";
import OrganizerReq from "./organizer/OrganizerReq"
import OrganizerReqList from "./admin/OrganizerReqList";
import OrganizerRegister from "./Admin/OrganizerRegister";
import ChangePassword from "./organizer/ChangePassword";
import Header from "./attendee/components/Header";
import EventList from "./admin/EventList";
import CreateEvent from "./organizer/EventCreate";


function App() {
  return (
    
    <AuthProvider>
                <Header/>
      <Router>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/user-dashboard" element={<Dashboard />} />
          <Route path="/org-req" element={<OrganizerReq />} />
          <Route path="/org-list" element={<OrganizerReqList />} />
          <Route path="/org-register" element={<OrganizerRegister />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/event-list" element={<EventList />} />
          <Route path="/event-create" element={<CreateEvent />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
