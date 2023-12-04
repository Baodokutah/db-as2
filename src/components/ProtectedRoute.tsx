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

export function ProtectedRoute() {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} />;
  }


 const studentGrade = [
    {
    semester: "222",
    course: "CO6969",
    class: "C01",
      studentDat:[
        {
          "susername":"abd",
          "bt":0,
          "btl":0,
          "gk":0,
          "ck":0
        },
        {
          "susername":"xyz",
          "bt":0,
          "btl":0,
          "gk":0,
          "ck":0
        },
      ],
    }
  ];

  return (
    <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/register" element={<ScheduleTable />} />
      <Route path="/register/:semesterid" element={user.role === 'instructor' ? <ICourseTable /> : <CourseTable />} /> {/* Move this line here */}
      <Route path="/schedule" element={user.role === 'instructor' ? <IScheduleComponent /> : <ScheduleComponent />} /> {/* Move this line here */}
      <Route path="/grades" element={user.role === 'instructor' ? <GradeStudent data={studentGrade}/> : <Grades />} /> {/* Move this line here */}
    </Routes>
  );
}