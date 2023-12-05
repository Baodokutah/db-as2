import * as React from 'react';
import { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Button } from '@mui/material';

interface student{
    susername: string,
    bt: number,
    btl: number,
    gk: number,
    ck: number,
    [key: string]: string | number; // Add this line
}





interface EditableCellProps {
  val: number;
  onChange: (value: number) => void;
}

const EditableTable: React.FC<EditableCellProps> = ({val, onChange}) => {
  const [value, setValue] = useState(val);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    onChange(value); // Call the onChange function with the updated value
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if(!isNaN(Number(e.target.value)) && Number(e.target.value) >= 0 && Number(e.target.value) <= 10)
    {
      setValue(Number(e.target.value));
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleBlur();
    }
  };

  return (
    <TableCell align="right" sx={{maxWidth:"3ch"}}>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={handleChange}
          onBlur={handleBlur}
          onKeyPress={handleKeyPress}
          autoFocus
          className="bg-transparent border-none text-end outline-none w-2/12"
        />
      ) : (
        <div onClick={handleClick}>
          {value}
        </div>
      )}
    </TableCell>
  );
}

interface Class {
  classid: string;
  courseid: string;
  coursename: string;
  coursecredit: number;
  semid: string;
  attendantnumber: number;
  maxstudent: number;
  weekday: number;
  starttime: string;
  endtime: string;
  insname: string;
}

const GradeStudent: React.FC= () => {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedClass, setSelectedClass] = useState('');
  const [students, setStudents] = useState([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [updatedStudents, setUpdatedStudents] = useState<Array<Partial<student>>>([]);
  const { user } = useAuth();

  const fetchClasses = async (semesterid: string) => {
    const response = await axios.get(`/api/class/${semesterid}`);
    return response.data.class;
};



const handleGradeChange = (idx: number, field: keyof student, value: number) => {
  const newStudents = [...updatedStudents];
  (newStudents[idx] as student)[field] = value;
  setUpdatedStudents(newStudents);
};

useEffect(() => {
    if (selectedTerm) {
        fetchClasses(selectedTerm).then(data => setClasses(data));
    }
}, [selectedTerm]);


const fetchStudent = async (selectedClass: string) => {
  try {
      const [classid, coursename] = selectedClass.split('-');
      const response = await axios.post('/api/class/list', {
          course: coursename,
          semester:  selectedTerm,
          class: classid
      });
      if (response.status === 200) {
        setStudents(response.data.studentList);   
        setUpdatedStudents(response.data.studentList); // update updatedStudents state
        // handle response
      } 
  } catch (error) {
      // handle error
      console.log(error);
  }
};


const handleUpdate = async (updatedStudents: any) => {
  try {
      console.log(updatedStudents)
      const [classid, coursename] = selectedClass.split('-');
      const formattedStudents = updatedStudents.map((student: any) => ({
        susername: student.susername,
        bt: student.btscore,
        btl: student.btlscore,
        gk: student.gkscore,
        ck: student.ckscore,
      }));
      console.log(updatedStudents)
      const response = await axios.post('/api/instructor/grade', {
          course: coursename,
          semester:  selectedTerm,
          class: classid,
          list: formattedStudents
      });
      if (response.status === 200) {
        console.log(response);
      } 
  } catch (error) {
      // handle error
      console.log(error);
  }
};


useEffect(() => {
  if (selectedClass) {
      fetchStudent(selectedClass);
  }
}, [selectedClass]);

//   useEffect(() => {
//       fetchSche();
//   }, [selectedTerm]);


  const filteredClasses = classes.filter(classItem => classItem.insname === user?.name);
  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      console.log("handleSelectChange called with value: ", event.target.value);
      setSelectedTerm(event.target.value);
  };
  const handleSelectClass = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("handleSelectClass called with value: ", event.target.value);
    setSelectedClass(event.target.value);
};
  return (
    <div className="flex flex-col items-center justify-start h-screen mt-24">
    <h1 className='text-[#cc3c1f] text-3xl mt-10'>NHẬP ĐIỂM SINH VIÊN</h1>
    <select 
                className="block w-full h-10 mt-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded shadow-sm transition-colors duration-150 ease-in-out" 
                name="select-lichhoc" 
                id="select-lichhoc" 
                value={selectedTerm} 
                onChange={handleSelectChange}
            >
                <option value="all">Vui lòng chọn học kỳ</option>
                <option value="211">Học kỳ 1 Năm học 2021 - 2022</option>
                <option value="212">Học kỳ 2 Năm học 2021 - 2022</option>
                <option value="221">Học kỳ 1 Năm học 2022 - 2023</option>
                <option value="222">Học kỳ 2 Năm học 2022 - 2023</option>
            </select>
            {selectedTerm &&  <select 
           
                className="block w-full h-10 mt-10 px-3 py-2 text-sm text-gray-700 bg-white border border-gray-300 rounded shadow-sm transition-colors duration-150 ease-in-out" 
                name="select-lichhoc" 
                id="select-lichhoc" 
                value={selectedClass} 
                onChange={handleSelectClass}
            >
                <option value="">Vui lòng chọn lớp</option>
            {filteredClasses.map((classItem, index) => (
                
            <option key={index} value={`${classItem.classid}-${classItem.courseid}`}>Lớp {classItem.classid} môn {classItem.coursename}</option>))}
            </select>}
              

      <div  className='my-4'>
        <div className="text-left font-bold text-[#cc3c1f]">{`Lớp ${selectedClass} kỳ ${selectedTerm}`}</div>
        <TableContainer component={Paper} className="mt-2 w-full" sx={{width: '90vw'}}>
          <Table className="divide-y divide-gray-200" sx={{width: "90vw"}}>
            <TableHead>
                <TableRow sx={{ color: '#ffffff' }} className='bg-[#075385] text-white'>
                    <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Họ & Tên</TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff', fontWeight: 'bold' }}>BT</TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff', fontWeight: 'bold' }}>BTL</TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff', fontWeight: 'bold' }}>GK</TableCell>
                    <TableCell align="right" sx={{ color: '#ffffff', fontWeight: 'bold' }}>CK</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {students && Array.isArray(students) && students.map((student: any, idx: number) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{student.student_name}</TableCell>
                  <EditableTable val={student.btscore} onChange={(value) => handleGradeChange(idx, 'btscore', value)} />
                  <EditableTable val={student.btlscore} onChange={(value) => handleGradeChange(idx, 'btlscore', value)} />
                  <EditableTable val={student.gkscore} onChange={(value) => handleGradeChange(idx, 'gkscore', value)} />
                  <EditableTable val={student.ckscore} onChange={(value) => handleGradeChange(idx, 'ckscore', value)} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
         <Button variant="contained" color="primary" size="large" sx={{marginRight: '30px'}} onClick={() => handleUpdate(updatedStudents)}>
        Áp dụng
      </Button>
    </div>
  );
}

export default GradeStudent;
