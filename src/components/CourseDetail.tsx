import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';
import { Button } from '@mui/material'; // Import the Button component
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { Dispatch, SetStateAction } from 'react';


interface CourseDetailProps {
    courseCode: string;
    courseName: string;
    classData: any[]; 
    setTriggerFetch: Dispatch<SetStateAction<boolean>>;
    

    // Add any other props that you might need
}




const CourseDetail: React.FC<CourseDetailProps> = ({ courseCode, courseName, classData, setTriggerFetch }) => {

const { user } = useAuth();


const enroll = async (classData: any) => {

    try {
        const response = await axios.post('/api/student/enroll', {
            susername: user?.username,
            course: classData.courseid,
            class: classData.classid,
            semester: classData.semid
        });

        if (response.status === 200) {
            console.log('Enrollment successful');
            setTriggerFetch(prev => !prev);
        } else {
            console.log('Enrollment failed');
        }
    } catch (error: any) {
        console.log(error.response.data.msg);
        const msg = error.response.data.msg;
        alert(msg)
    }
};

const unenroll = async (classData: any) => {
    try {
        const response = await axios.post('/api/student/unenroll', {
            susername: user?.username,
            course: classData.courseid,
            class: classData.classid,
            semester: classData.semid
        });

        if (response.status === 200) {
            console.log('Unenrollment successful');
            setTriggerFetch(prev => !prev);
        } else {
            console.log('Unenrollment failed');
        }
    } catch (error: any) {
        const msg = error.response.data.msg;
        alert(msg)
    }
};

    return (
        <Paper elevation={3} className="my-4 p-4">
            <div>
                <h4>{courseCode} - {courseName}</h4>
            </div>
            <Table className="min-w-full mt-4">
                <TableHead>
                    <TableRow>
                        <TableCell>Nhóm lớp</TableCell>
                        <TableCell>DK/ Sĩ số</TableCell>
                        <TableCell>Giảng viên</TableCell>
                        <TableCell>Thứ</TableCell>
                        <TableCell>Thời gian bắt đầu</TableCell>
                        <TableCell>Thời gian kết thúc</TableCell>
                        <TableCell>#</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {classData.map((row) => (
                        <TableRow key={row.classid}>
                            <TableCell>{row.classid}</TableCell>
                            <TableCell>{`${row.attendantnumber} / ${row.maxstudent}`}</TableCell>        
                            <TableCell>{row.insname ? row.insname : 'Giảng viên chưa được phân'}</TableCell> {/* Display insname under Giảng viên */}
                            <TableCell>{row.weekday}</TableCell> {/* Display weekday under Thứ */}
                            <TableCell>{row.starttime}</TableCell>
                            <TableCell>{row.endtime}</TableCell>
                            <TableCell>
                            <Button variant="contained" color="primary" size="small" sx={{marginRight: '30px'}} onClick={() => enroll(row)}>
                                Đăng kí
                            </Button>
                            <Button variant="contained" color="error" size="small" onClick={() => unenroll(row)}>
                                Hủy đăng kí
                            </Button>
                    </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CourseDetail;
