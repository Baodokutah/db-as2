import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper, IconButton } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import CourseDetail from './CourseDetail'; // Import the CourseDetail component

interface Course {
    id: number;
    code: string;
    name: string;
    credits: number;
    details: string;
}

const mockCourses: Course[] = [
    { id: 1, code: '006711', name: 'Toán 1 (lý thuyết)', credits: 8.0, details: 'Course details for Toán 1 (lý thuyết)' },
    { id: 2, code: '006715', name: 'Toán 1 (bài tập)', credits: 0.0, details: 'Course details for Toán 1 (bài tập)' },
    // ... other courses
];

const CourseTable: React.FC = () => {
    const [openDetails, setOpenDetails] = useState<number | null>(null);

    const toggleDetails = (id: number) => {
        if (openDetails === id) {
            setOpenDetails(null);
        } else {
            setOpenDetails(id);
        }
    };

    return (
        <Paper className="overflow-auto w-full h-96" sx={{width: '90vw'}}>
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
                    {mockCourses.map((course, index) => (
                        <React.Fragment key={course.id}>
                            <TableRow>
                                <TableCell>{index + 1}</TableCell>
                                <TableCell>{course.code}</TableCell>
                                <TableCell>{course.name}</TableCell>
                                <TableCell>{course.credits}</TableCell>
                                <TableCell>
                                    <IconButton onClick={() => toggleDetails(course.id)}>
                                        {openDetails === course.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                                    </IconButton>
                                </TableCell>
                            </TableRow>
                            {openDetails === course.id && (
                                <TableRow>
                                    <TableCell colSpan={5}>
                                        <CourseDetail courseCode={course.code} courseName={course.name} />
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

export default CourseTable;
