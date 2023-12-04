import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow, Paper } from '@mui/material';

interface CourseDetailProps {
    courseCode: string;
    courseName: string;
    // Add any other props that you might need
}

const CourseDetail: React.FC<CourseDetailProps> = ({ courseCode, courseName }) => {
    // Example data, replace with your actual detail data
    const detailData = [
        { id: 1, group: 'CN', dk: '0/-1', instructor: 'Nguyễn An Khương', weekday: 'Chưa biết', period: '234', classroom: 'B9-302', week: '12345_67'    },
        { id: 2, group: 'CC--', dk: '0/-1', instructor: 'V', groupLT: 'ND--' },
        // Add more rows as needed
    ];

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
                        <TableCell>Tiết</TableCell>
                        <TableCell>Phòng</TableCell>
                        <TableCell>Tuần học</TableCell>
                        <TableCell>#</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {detailData.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.group}</TableCell>
                            <TableCell>{row.dk}</TableCell>
                            <TableCell>{row.instructor}</TableCell>
                            <TableCell>{row.weekday}</TableCell>
                            <TableCell>{row.period}</TableCell>
                            <TableCell>{row.classroom}</TableCell>
                            <TableCell>{row.week}</TableCell>
                            <TableCell>{/* Sĩ số LT data */}</TableCell>
                            <TableCell>
                                {/* Icons or other controls */}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default CourseDetail;
