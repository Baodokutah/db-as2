import * as React from 'react';
import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

interface student{
    susername: string,
    bt: number,
    btl: number,
    gk: number,
    ck: number,
}

interface studentData{
    semester: string,
    course: string,
    class: string,
    studentDat : student[]
}

interface studentDataPros{
  data : studentData[],
}

interface EditableCellProps {
  val: number;
  // onChange: (value: any) => void;
}

const EditableTable: React.FC<EditableCellProps> = ({val}) => {
  const [value, setValue] = useState(val);
  const [isEditing, setIsEditing] = useState(false);

  const handleClick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    setIsEditing(false);
    // Send a request to the backend here
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

const GradeStudent: React.FC<studentDataPros> = ({data}) => {

  return (
    <div className='text-center'>
      <h1 className='text-[#cc3c1f] text-3xl mt-10'>BẢNG ĐIỂM SINH VIÊN</h1>
    {data.map((gradeDat, index) => (
      <div key={index} className='my-4'>
        <div className="text-left font-bold text-[#cc3c1f]">{`Lớp ${gradeDat.class} kỳ ${gradeDat.semester} môn ${gradeDat.course}`}</div>
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
              {gradeDat.studentDat.map((row, idx) => (
                <TableRow
                  key={idx}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">{row.susername}</TableCell>
                  <EditableTable val={row.bt} />
                  <EditableTable val={row.btl} />
                  <EditableTable val={row.gk} />
                  <EditableTable val={row.ck} />
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    ))}
    </div>
  );
}

export default GradeStudent;
