import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import CourseTable from '../components/Course'
import ScheduleComponent from '../components/Schedule'
import Grades from "../pages/Grade"
import Hero from '../pages/Hero'
import {useAuth } from '../context/AuthContext';


export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/register" element={<CourseTable />} />
      <Route path="/schedule" element={<ScheduleComponent />} />
      <Route path="/grades" element={<Grades />} />
    </Routes>
  );
}