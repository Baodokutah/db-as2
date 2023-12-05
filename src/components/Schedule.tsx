import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

interface Course {
    courseid: string;
    cname: string;
    classid: string;
    weekday: string;
    starttime: string;
    endtime: string;
    rnumber: string;
    bname: string;
    sweek: Array<any>;
}



const ScheduleComponent = () => {
    const [selectedTerm, setSelectedTerm] = useState('');
    const { user } = useAuth();
    const [scheduleData, setScheduleData] = useState<Course[]>([]);

    const fetchSche = async () => {
        try {
            const response = await axios.post('/api/student/schedule', {
                semester:  selectedTerm,
                susername: user?.username
            });
            console.log(scheduleData)
            setScheduleData(response.data.schedule);            // handle response
        } catch (error) {
            // handle error
            console.log(error);
        }
    };

    useEffect(() => {
        fetchSche();
    }, [selectedTerm]);
 

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


    return (
        <div className="flex flex-col items-center justify-start h-screen mt-24">
            <h1 className='text-[#cc3c1f] text-3xl mt-10'>THỜI KHÓA BIỂU HỌC KỲ</h1>
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
                <div  className="w-full my-4">
                <Typography variant="h6" align="left" className="mb-2 font-bold text-[#cc3c1f] ">
                            {termMapping[selectedTerm]}
                        </Typography>

                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ color: '#ffffff' }} className='bg-[#075385] text-white'>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Mã MH</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Tên môn học</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Nhóm-Tổ</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Thứ</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Thời gian bắt đầu</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Thời gian kết thúc</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Phòng</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Tòa</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Tuần học</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {scheduleData && scheduleData.map((course, courseIndex) => (
                                    <TableRow key={courseIndex}>
                                        <TableCell>{course.courseid}</TableCell>
                                        <TableCell>{course.cname}</TableCell>
                                        <TableCell align="center">{course.classid}</TableCell>
                                        <TableCell align="center">{course.weekday}</TableCell>
                                        <TableCell align="center">{course.starttime}</TableCell>
                                        <TableCell align="center">{course.endtime}</TableCell>
                                        <TableCell align="center">{course.rnumber}</TableCell>
                                        <TableCell align="center">{course.bname}</TableCell>
                                        <TableCell>{course.sweek ? course.sweek.join(', ') : 'N/A'}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>

        </div>
    );
};

export default ScheduleComponent;
