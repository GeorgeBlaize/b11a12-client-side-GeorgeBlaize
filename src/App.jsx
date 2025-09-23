import { Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Community from './pages/Community';
import AboutUs from './pages/AboutUs';
import AllTrips from './pages/AllTrips';
import PackageDetails from './pages/PackageDetails';
import TourGuideProfile from './pages/TourGuideProfile';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import PrivateRoute from './routes/PrivateRoute';
import TouristDashboard from './components/dashboard/TouristDashboard';
import TourGuideDashboard from './components/dashboard/TourGuideDashboard';
import AdminDashboard from './components/dashboard/AdminDashboard';
import ManageProfile from './pages/dashboard/ManageProfile';
import MyBookings from './pages/dashboard/MyBookings';
import ManageStories from './pages/dashboard/ManageStories';
import AddStory from './pages/dashboard/AddStory';
import JoinTourGuide from './pages/dashboard/JoinTourGuide';
import MyAssignedTours from './pages/dashboard/MyAssignedTours';
import AddPackage from './pages/dashboard/AddPackage';
import ManageUsers from './pages/dashboard/ManageUsers';
import ManageCandidates from './pages/dashboard/ManageCandidates';
import './App.css';
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="community" element={<Community />} />
        <Route path="about" element={<AboutUs />} />
        <Route path="trips" element={<AllTrips />} />
        <Route path="package/:id" element={<PackageDetails />} />
        <Route path="tour-guide/:id" element={<TourGuideProfile />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="forgot-password" element={<ForgotPassword />} />
      </Route>
      <Route path="/dashboard" element={<PrivateRoute element={<TouristDashboard />} />}>
        <Route path="manage-profile" element={<ManageProfile />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="manage-stories" element={<ManageStories />} />
        <Route path="add-story" element={<AddStory />} />
        <Route path="join-tour-guide" element={<JoinTourGuide />} />
        
      </Route>
      <Route path="/tour-guide-dashboard" element={<PrivateRoute element={<TourGuideDashboard />} />}>
        <Route path="manage-profile" element={<ManageProfile />} />
        <Route path="my-assigned-tours" element={<MyAssignedTours />} />
        <Route path="manage-stories" element={<ManageStories />} />
        <Route path="add-story" element={<AddStory />} />
      </Route>
      <Route path="/admin-dashboard" element={<PrivateRoute element={<AdminDashboard />} />}>
        <Route path="manage-profile" element={<ManageProfile />} />
        <Route path="my-assigned-tours" element={<MyAssignedTours />} />
        <Route path="manage-stories" element={<ManageStories />} />
        <Route path="add-story" element={<AddStory />} />
        <Route path="add-package" element={<AddPackage />} />
        <Route path="manage-users" element={<ManageUsers />} />
        <Route path="manage-candidates" element={<ManageCandidates />} />
      </Route>
    </Routes>
  );
}

export default App;