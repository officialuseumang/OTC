import { Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/Footer'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import AdminDashboard from './pages/AdminDashboard'
import AdminLogin from './pages/AdminLogin'
import Login from './pages/Login'
import Mentors from './pages/Mentors'
import NotFound from './pages/NotFound'
import ProgramDetails from './pages/ProgramDetails'
import Programs from './pages/Programs'
import Register from './pages/Register'
import Resources from './pages/Resources'
import Signup from './pages/Signup'
import UserDashboard from './pages/UserDashboard'

function App() {
  return (
    <div className="min-h-dvh">
      <ScrollToTop />
      <Navbar />

      <main className="w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/programs/:programId" element={<ProgramDetails />} />
          <Route path="/mentors" element={<Mentors />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/dashboard/admin" element={<AdminDashboard />} />
          <Route path="/dashboard/user" element={<UserDashboard />} />
          <Route path="/login/admin" element={<AdminLogin />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/register" element={<Register />} />

          {/* Compatibility redirects */}
          <Route path="/program" element={<Navigate to="/programs" replace />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
    </div>
  )
}

export default App
