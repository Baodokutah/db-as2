import { Table, TableBody, TableCell, TableHead, TableRow, Paper, Typography } from '@mui/material';

// Mock data structure for course details
const courseSchedule = [
    {
        term: 'Học kỳ 1 Năm học 2023 - 2024',
        updateDate: '2023-11-30 16:15:31.0',
        courses: [
            {
                code: 'SA0002',
                name: 'Sinh hoạt sinh viên',
                credits: '--',
                feeCredits: '--',
                group: 'CN06',
                day: '--',
                lesson: '---',
                time: '- - -',
                room: 'CS-LTK',
                campus: 'BK-LTK',
                weeks: '--|--|--|38|39|40|41|--|43|44|45|46|47|48|49|50|'
            },
            {
                code: 'CO3103',
                name: 'Đồ án tổng hợp - hướng công nghệ phần mềm',
                credits: '1',
                feeCredits: '1',
                group: 'CN01',
                day: '--',
                lesson: '---',
                time: '- - -',
                room: 'CS-LTK',
                campus: 'BK-LTK',
                weeks: '35|36|37|38|39|40|41|--|43|44|45|46|47|48|49|50|'
            },
            {
                code: 'LA3025',
                name: 'Tiếng Nhật 5',
                credits: '--',
                feeCredits: '6',
                group: 'CN02',
                day: '2',
                lesson: '4-6',
                time: '9:00 - 11:50',
                room: 'A4-206',
                campus: 'BK-LTK',
                weeks: '35|--|37|38|39|40|41|--|43|44|45|46|47|48|'
            },
            {
                code: 'SP1043',
                name: 'Văn hóa Nhật',
                credits: '--',
                feeCredits: '2',
                group: 'CN01',
                day: '3',
                lesson: '2-3',
                time: '7:00 - 8:50',
                room: 'A4-311',
                campus: 'BK-LTK',
                weeks: '35|36|37|38|39|40|41|--|43|44|45|46|47|48|49|50|'
            },
            {
                code: 'CO2014',
                name: 'HE CO SO DU LIEU (TN)',
                credits: '--',
                feeCredits: '--',
                group: 'CN01',
                day: '3',
                lesson: '8-12',
                time: '13:00 - 17:50',
                room: 'C6-104',
                campus: 'BK-LTK',
                weeks: '--|--|--|--|39|--|41|--|43|--|45|--|47|--|49|'
            },
            {
                code: 'CO3093',
                name: 'Mạng máy tính',
                credits: '3',
                feeCredits: '3',
                group: 'CN01',
                day: '4',
                lesson: '2-3',
                time: '7:00 - 8:50',
                room: 'B1-212',
                campus: 'BK-LTK',
                weeks: '35|36|37|38|39|40|41|--|43|44|45|46|47|48|49|50|'
            },
            {
                code: 'LA3025',
                name: 'Tiếng Nhật 5',
                credits: '--',
                feeCredits: '6',
                group: 'CN02',
                day: '4',
                lesson: '4-6',
                time: '9:00 - 11:50',
                room: 'A4-206',
                campus: 'BK-LTK',
                weeks: '35|36|37|38|39|40|41|--|43|44|45|46|47|48|'
            }
            // ... more courses
        ]
    },
    // ... more terms
];


const ScheduleComponent = () => {
    return (
        <div className="flex flex-col items-center">
            <h1 className='text-[#cc3c1f] text-3xl mt-10'>THỜI KHÓA BIỂU HỌC KỲ</h1>
            {courseSchedule.map((termSchedule, index) => (
                <div key={index} className="w-full my-4">
                    <Typography variant="h6" align="left" className="mb-2 font-bold text-[#cc3c1f]">
                        {termSchedule.term}
                    </Typography>
                    <Typography variant="body2" align="left" className="mb-4">
                        <i>Ngày cập nhật: {termSchedule.updateDate}</i>
                    </Typography>
                    <Paper>
                        <Table>
                            <TableHead>
                                <TableRow sx={{ color: '#ffffff' }} className='bg-[#075385] text-white'>
                                <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Mã MH</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Tên môn học</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Tín chỉ</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Tc học phí</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Nhóm-Tổ</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Thứ</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Tiết</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Giờ học</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Phòng</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Cơ sở</TableCell>
                                <TableCell sx={{ color: '#ffffff' , fontWeight: 'bold'}}>Tuần học</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {termSchedule.courses.map((course, courseIndex) => (
                                    <TableRow key={courseIndex}>
                                        <TableCell>{course.code}</TableCell>
                                        <TableCell>{course.name}</TableCell>
                                        <TableCell align="center">{course.credits}</TableCell>
                                        <TableCell align="center">{course.feeCredits}</TableCell>
                                        <TableCell align="center">{course.group}</TableCell>
                                        <TableCell align="center">{course.day}</TableCell>
                                        <TableCell align="center">{course.lesson}</TableCell>
                                        <TableCell align="center">{course.time}</TableCell>
                                        <TableCell align="center">{course.room}</TableCell>
                                        <TableCell align="center">{course.campus}</TableCell>
                                        <TableCell>{course.weeks}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Paper>
                </div>
            ))}
        </div>
    );
};

export default ScheduleComponent;
