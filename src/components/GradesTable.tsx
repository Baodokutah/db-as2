import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

interface Course {
  code: string;
  name: string;
  group: string;
  credits: number;
  componentScore: string;
  examScore: number;
  finalScore: number;
}

interface TermData {
  term: string;
  updateDate: string;
  courses: Course[];
}

interface GradesTableProps {
  data: TermData[];
}

const GradesTable: React.FC<GradesTableProps> = ({ data }) => {
  return (
    <div className="text-center">
        <h1 className='text-[#cc3c1f] text-3xl mt-10'>BẢNG ĐIỂM SINH VIÊN</h1>
      {data.map((termData, index) => (
        <div key={index} className="my-4">
          <div className="text-left font-bold text-[#cc3c1f]">{termData.term}</div>
          <div className="text-left italic"> <i>Ngày cập nhật: {termData.updateDate}</i></div>
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
                {termData.courses.map((course, idx) => (
                  <TableRow key={idx} className="bg-white">
                    <TableCell>{course.code}</TableCell>
                    <TableCell>{course.name}</TableCell>
                    <TableCell align="center">{course.group}</TableCell>
                    <TableCell align="center">{course.credits}</TableCell>
                    <TableCell>{course.componentScore}</TableCell>
                    <TableCell align="center">{course.examScore}</TableCell>
                    <TableCell align="center">{course.finalScore}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export default GradesTable;
