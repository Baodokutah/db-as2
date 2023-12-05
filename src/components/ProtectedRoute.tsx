import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
// import CourseTable from '../components/Course'
import ScheduleComponent from '../components/Schedule'
import Grades from "../pages/Grade"
import Hero from '../pages/Hero'
import {useAuth } from '../context/AuthContext';
import ScheduleTable from './Register';
import CourseTable from './Course';
import GradeStudent from './GradeStudent';
import ICourseTable from './ICourse';
import IScheduleComponent from './ISchedule';
import Management from './Management';

export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }




  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      {user?.role === 'admin' && <Route path="/dashboard" element={<Management />} />}
      <Route path="/register" element={<ScheduleTable />} />
      <Route path="/register/:semesterid" element={user.role === 'instructor' ? <ICourseTable /> : <CourseTable />} /> {/* Move this line here */}
      <Route path="/schedule" element={user.role === 'instructor' ? <IScheduleComponent /> : <ScheduleComponent />} /> {/* Move this line here */}
      <Route path="/grades" element={user.role === 'instructor' ? <GradeStudent /> : <Grades />} /> {/* Move this line here */}
    </Routes>
  );
}