import './App.css';
import Navbar from './CommonComponents/Navbar/navbar';
import HomeScreen from './Pages/HomeScreen/homeScreen';
import { Routes, Route, Navigate } from 'react-router-dom';
import Status from './Pages/StatusPage/status';
import Report from './Pages/ReportPage/report';
import Prescription from './Pages/Prescription/prescription';
import Login from './Pages/Login/login';

// ✅ Protected Route (inside same file for simplicity)
const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // ❌ Not logged in
  if (!user) {
    return <Navigate to="/login" />;
  }

  // ❌ Not admin
  if (user.role !== "admin") {
    return <h2 style={{ textAlign: "center" }}>Access Denied ❌</h2>;
  }

  return children;
};

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        {/* ✅ Public */}
        <Route path="/" element={<HomeScreen />} />
        <Route path="/login" element={<Login />} />

        {/* 🔐 Admin Protected */}
        <Route
          path="/status"
          element={
            <ProtectedRoute>
              <Status />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report/:id"
          element={
            <ProtectedRoute>
              <Report />
            </ProtectedRoute>
          }
        />

        <Route
          path="/prescription/:id"
          element={
            <ProtectedRoute>
              <Prescription />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;

// import './App.css';
// import Footer from './CommonComponents/Footer/footer';
// import Navbar from './CommonComponents/Navbar/navbar';
// import HomeScreen from './Pages/HomeScreen/homeScreen';
// import { Routes,Route } from 'react-router-dom';
// import Status from './Pages/StatusPage/status';
// import Report from './Pages/ReportPage/report';
// import Prescription from './Pages/Prescription/prescription';
// import axios from 'axios';

// function App() {

//   return (
//     <div className="App">
//         <Navbar/>
       
//        <Routes>
//         <Route path='/'element={<HomeScreen/>}/>
               
//                 <Route path='/status'element={<Status/>}/>
//                 <Route path='/report/:id'element={<Report/>}/>
//                 <Route path='/prescription/:id'element={<Prescription/>}/>
//        </Routes>
       

  
  
    
//     </div>
//   );
// }

// export default App;
