import GradesTable from '../components/GradesTable'
import gradesData from '../gradesData'

const Grades: React.FC = () => {
    return (
        <GradesTable data={gradesData.map(grade => ({...grade, courses: grade.courses.map(course => ({...course, credits: Number(course.credits), componentScore: String(course.componentScore), examScore: Number(course.examScore), finalScore: Number(course.finalScore)}))}))} />

    );
  };
  
  export default Grades;