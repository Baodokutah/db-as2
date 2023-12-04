import React, { useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CourseDetail from './CourseDetail'; // Import the CourseDetail component
import axios from 'axios';
import { useParams } from 'react-router-dom';

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
    insusername: string;
}





const ICourseTable: React.FC = () => {
    const [openDetails, setOpenDetails] = useState<string | null>(null);
    const [classes, setClasses] = useState<Class[]>([]);
    const [triggerFetch, setTriggerFetch] = useState(false);    
    const { semesterid } = useParams();

    const fetchClasses = async (semesterid: string) => {
        const response = await axios.get(`http://localhost:9696/api/class/${semesterid}`);
        return response.data.class;
    };

    useEffect(() => {
        if (semesterid) {
            fetchClasses(semesterid).then(data => setClasses(data));
        }
    }, [semesterid, triggerFetch]);

    const toggleDetails = (id: string) => {
        if (openDetails === id) {
            setOpenDetails(null);
        } else {
            setOpenDetails(id);
        }
    };

    const uniqueClasses = classes.reduce((unique: Class[], currentClass: Class) => {
        return unique.some(classItem => classItem.courseid === currentClass.courseid) ? unique : [...unique, currentClass];
    }, []);

    return (
        <Paper className="overflow-auto w-full h-11/12 mt-24" sx={{width: '90vw'}}>
                    {triggerFetch && null}
            <Table className="w-full" aria-label="course table">
                <TableHead>
                    <TableRow>
                        <TableCell>STT</TableCell>
                        <TableCell>Mã MH</TableCell>
                        <TableCell>Tên MH</TableCell>
                        <TableCell>Số tín chỉ</TableCell>
                        <TableCell>Details</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {uniqueClasses.map((course, index) => (
                        <React.Fragment key={index}>
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{course.courseid}</TableCell>
                                <TableCell>{course.coursename}</TableCell>
                                <TableCell>{course.coursecredit}</TableCell>
                                <TableCell>
                                <IconButton onClick={() => toggleDetails(course.courseid)}>
                                    {openDetails === course.courseid ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                </IconButton>
                                </TableCell>
                            </TableRow>
                            {openDetails === course.courseid && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <CourseDetail courseCode={course.courseid} courseName={course.coursename}  setTriggerFetch={setTriggerFetch}   classData={classes.filter(c => c.courseid === course.courseid)} />
                                    </TableCell>
                                </TableRow>
                            )}
                        </React.Fragment>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ICourseTable;
