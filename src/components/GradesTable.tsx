import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Course {
  course_id: string;
  course_name: string;
  class_id: string;
  course_credit: number;
  bt_score: string;
  btl_score: string;
  gk_score: string;
  ck_score: string;
  avg_score: string;
}



const GradesTable: React.FC = () => {
  const [selectedTerm, setSelectedTerm] = useState('');
  const [gradesData, setGradesData] = useState<Course[]>([]);
  const { user } = useAuth();

  const fetchGrades = async () => {
    try {
        const response = await axios.post('http://localhost:9696/api/student/scoreboard', {
            semester: selectedTerm,
            susername: user?.username
        });
        console.log(response);
        setGradesData(response.data.scoreboard);
    } catch (error) {
        console.log(error);
    }
  };

  const termMapping: Record<string, string> = {
    '211': 'Học kỳ 1 Năm học 2021 - 2022',
    '212': 'Học kỳ 2 Năm học 2021 - 2022',
    '221': 'Học kỳ 1 Năm học 2022 - 2023',
    '222': 'Học kỳ 2 Năm học 2022 - 2023',
    // add more mappings as needed
};

const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
  console.log("handleSelectChange called with value: ", event.target.value);
    setSelectedTerm(event.target.value);
};


  useEffect(() => {
    fetchGrades();
  }, [selectedTerm]);

  return (
    <div className="flex flex-col items-center justify-start h-screen mt-24">
    <h1 className='text-[#cc3c1f] text-3xl mt-10'>BẢNG ĐIỂM SINH VIÊN</h1>
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
        <div className="my-4">
        <Typography variant="h6" align="left" className="mb-2 font-bold text-[#cc3c1f] ">
                            {termMapping[selectedTerm]}
          </Typography>
          <TableContainer component={Paper} className="mt-2 w-full" sx={{width: '90vw'}}>
            <Table className="min-w-full divide-y divide-gray-200">
              <TableHead>
              <TableRow sx={{ color: '#ffffff' }} className='bg-[#075385] text-white'>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Mã MH</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Tên môn học</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Nhóm-Tổ</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Số TC</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Điểm thành phần</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Điểm thi</TableCell>
              <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Điểm tổng kết</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {gradesData && gradesData.map((course, idx) => (
                  <TableRow key={idx} className="bg-white">
                    <TableCell>{course.course_id}</TableCell>
                    <TableCell>{course.course_name}</TableCell>
                    <TableCell align="center">{course.class_id}</TableCell>
                    <TableCell align="center">{course.course_credit}</TableCell>
                    <TableCell>BT: {course.bt_score}, BTL: {course.btl_score}, GK:  {course.gk_score}</TableCell>
                    <TableCell align="center">{course.ck_score}</TableCell>
                    <TableCell align="center">{course.avg_score}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>

    </div>
  );
};

export default GradesTable;
