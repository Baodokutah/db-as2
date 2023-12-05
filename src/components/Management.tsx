import * as React from 'react';
import { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import axios from 'axios';
import { Tooltip } from 'antd';

interface InsList{
    username: string;
    name: string;
    instructorid: string;
    address: string;
    bdate: string;
    academicrank: string;
    degree: never[];
    phonenum: string;
    dname: string;
    [key: string]: string | never[];
}

interface Instructor {
    insusername: string;
    password: string;
    name: string;
    id: string;
    address: string;
    bdate: string;
    rank: string;
    degree: never[];
    phone: string;
    dname: string;
    [key: string]: string | never[];
}



const Management: React.FC= () => {
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [degreeEdit, setdegreeEdit] = useState(false);
    const [openEditBasicInfo, setOpenEditBasicInfo] = useState(false);
    const [openEditDegree, setOpenEditDegree] = useState(false);
    const [editedDegree, setEditedDegree] = useState([]);

    const [newInstructor, setNewInstructor] = useState<Instructor>({
        insusername : '',
        password:'',
        name: '',
        id: '',
        address: '',
        bdate: '',
        rank: '',
        degree: [],
        phone: '',
        dname: '',
    });

    const [editedInstructor, setEditedInstructor] = useState({
        insusername : '',
        name: '',
        id: '',
        address: '',
        bdate: '',
        rank: '',
        phone: '',
        dname: '',
        degree: [],
    });

    const [errors, setErrors] = useState({
        insusername: false,
        password: false,
        id: false,
        dname: false,
        name: false,
        bdate: false,
        address: false,
        phone: false,
        rank: false,
        degree: false,
    });

    const handleClose = () => {
        setNewInstructor({insusername : '',password:'',name: '',id: '',address: '',bdate: '',rank: '',degree: [],phone: '',dname: '',});
        setOpen(false);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewInstructor((prevInstructor) => ({
          ...prevInstructor,
          [name]: value,
        }));
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: value ? false : true,
        }));
    
    };

    const handleAddInstructor = async () => {
        const newErrors = Object.keys(newInstructor).reduce(
            (acc, curr) => ({
                ...acc,
                [curr]: newInstructor[curr] ? false : true,
            }),
            {
                insusername: false,
                password: false,
                id: false,
                dname: false,
                name: false,
                bdate: false,
                address: false,
                phone: false,
                rank: false,
                degree: false,
            }
        );
        setErrors(newErrors);
    
        const hasErrors = Object.values(newErrors).some((error) => error === true);
        if (hasErrors) {
            return;
        }
        try {
          const response = await fetch('/api/admin/instructor/add', {
            method: 'POST',
            headers: {
                Authorization : "Basic 4AZAtA2A2BYBNBfByA-AAAAAAAAAAA6=",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newInstructor),
          });

          if (response.ok) {
            handleClose();
          } else {
            console.log(response);
          }
        } catch (error) {
          console.log(error);
        }
        // console.log(JSON.stringify(newInstructor));
    };

    const handleEditBasicInfo = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedInstructor((prevInstructor) => ({
          ...prevInstructor,
          [name]: value,
        }));
    }

    const handleEditBasicInfoInstructor = async () => {
        try {
          const response = await fetch('/api/admin/instructor/update', {
            method: 'POST',
            headers: {
                Authorization : "Basic 4AZAtA2A2BYBNBfByA-AAAAAAAAAAA6=",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedInstructor),
          });

          if (response.ok) {
            alert("Sửa thông tin giảng viên thành công");
            setOpenEditBasicInfo(false);
          } else {
            console.error('Sửa thông tin giảng viên không thành công:', response);
          }
        } catch (error) {
          console.error('Có gì đó sai sai:', error);
        }
        // console.log(JSON.stringify(newInstructor));
    };

    const handleEditDegreeInstructor = async () => {
        console.log(JSON.stringify({"insusername":editedInstructor.insusername, "degree":editedDegree}));
        try {
          const response = await fetch('/api/admin/instructor/degree', {
            method: 'POST',
            headers: {
                Authorization : "Basic 4AZAtA2A2BYBNBfByA-AAAAAAAAAAA6=",
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({"insusername":editedInstructor.insusername, "degree":editedDegree[editedDegree.length - 1]}),
          });

          if (response.ok) {
            alert("Sửa thông tin giảng viên thành công");
            setOpenEditDegree(false);
          } else {
            console.error('Sửa thông tin giảng viên không thành công:', response);
          }
        } catch (error) {
          console.error('Có gì đó sai sai:', error);
        }
        // console.log(JSON.stringify(newInstructor));
    };

    const handleEdit = (row: InsList) => {
        setOpenEdit(true);
        setEditedInstructor({
            'insusername' : row.username,
            'name': row.name,
            'id': row.instructorid,
            'address': row.address,
            'bdate': (new Date(row.bdate)).toISOString(),
            'rank': row.academicrank,
            'phone': row.phonenum,
            'dname': row.dname,
            'degree': row.degree as never[],
        });
        setEditedDegree(row.degree as never[]);
    }
    useEffect(() => {},[editedDegree,editedInstructor])

    const handleEditDegree = (index: number, value: string) => {
        const updatedDegrees = [...editedDegree] as string[];
        updatedDegrees[index] = value;
        setEditedDegree(updatedDegrees as never[]);
    };
    const handleAddDegree = () => {
        setEditedDegree([...editedDegree as string[], ''] as never[]);
        setdegreeEdit(!degreeEdit);
    };

    const handleCloseEdit = () => {
        // setNewInstructor({insusername : '',password:'',name: '',id: '',address: '',bdate: '',rank: '',degree: [],phone: '',dname: '',});
        setOpenEdit(false);
    };
    const handleDelete = async (iusername: InsList) => {
        try {
            const response = await fetch('/api/admin/instructor/remove', {
              method: 'POST',
              headers: {
                  Authorization : "Basic 4AZAtA2A2BYBNBfByA-AAAAAAAAAAA6=",
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify({"insusername": iusername}),
            });

            if (response.ok) {
              alert("Xóa giảng viên thành công");
            } else {
              console.error('Xóa giảng viên không thành công:', response.statusText);
            }
          } catch (error) {
            console.error('Có gì đó sai sai:', error);
          }
        return null;
    }

    // console.log(data);
    const [data, setData] = useState({});
    const fetchInsData = async () =>
    {
        try {
            const response = await axios.get('/api/admin/instructor',
                {
                    headers: {
                        Authorization : "Basic 4AZAtA2A2BYBNBfByA-AAAAAAAAAAA6=",
                    },
                }
            )
            // console.log(response.data);
            setData({"msg":response.data.msg, "list":response.data.list});
        } catch (error) {
            console.log(error);
        }
    }

    // useEffect(() => {
    //     fetchInsData();
    // }, [data]);
    // fetchInsData();

    const handleDateChange = (value: Date | null) => {
        if (value) {
            setNewInstructor((prevInstructor) => ({
                ...prevInstructor,
                bdate: value.toISOString().slice(0, 10), 
            }));
        }
    };

    const handleEditDateChange = (value: Date | null) => {
        if (value) {
            setEditedInstructor((prevInstructor) => ({
                ...prevInstructor,
                bdate: value.toISOString().slice(0, 10), 
            }));
        }
    };

    useEffect(() => {
        fetchInsData();

        const intervalId = setInterval(() => {
          fetchInsData();
        }, 5000);

        return () => clearInterval(intervalId);
      }, []);
    // console.log(data)
    return (
        <div className="w-screen h-screen mt-24 flex items-center justify-center flex-col">
        <TableContainer component={Paper} className="mt-2 w-full" sx={{width: '90vw'}}>
            <Table className="divide-y divide-gray-200" sx={{width: "90vw"}}>
                <TableHead>
                    <TableRow sx={{ color: '#ffffff' }} className='bg-[#075385] text-white'>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', width: "3ch" }}></TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', width: "21ch" }}>Họ & Tên</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>ID</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', width: "20ch" }}>Khoa</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', width:'32ch' }}>Địa chỉ</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Ngày sinh</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', width: "16ch" }}>Số điện thoại</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold', width:"15ch"}}>Học hàm</TableCell>
                        <TableCell sx={{ color: '#ffffff', fontWeight: 'bold' }}>Học vị</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(data as any).list && (data as any).list.map((row: any, idx: number) => (
                        <TableRow
                        key={idx}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                        <TableCell>
                            <Tooltip title='Chỉnh sửa thông tin'>
                                <IconButton
                                size="small"
                                aria-label="edit"
                                onClick={() => {handleEdit(row)}}
                                >
                                <EditIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title='Xóa thông tin'>
                                <IconButton
                                size="small"
                                aria-label="delete"
                                onClick={() => handleDelete(row.username)}
                                >
                                <DeleteIcon />
                                </IconButton>
                            </Tooltip>
                        </TableCell>
                        <TableCell component="th" scope="row">{row.name}</TableCell>
                        <TableCell component="th" scope="row">{row.instructorid}</TableCell>
                        <TableCell component="th" scope="row">{row.dname}</TableCell>
                        <TableCell component="th" scope="row">{row.address}</TableCell>
                        <TableCell component="th" scope="row">{(new Date(row.bdate)).toLocaleDateString('vi-VN', { day: 'numeric', month: 'numeric', year: 'numeric' })}</TableCell>
                        <TableCell component="th" scope="row">{row.phonenum}</TableCell>
                        <TableCell component="th" scope="row">{row.academicrank}</TableCell>
                        <TableCell component="th" scope="row">
                            {row.degree.map((degree: string, index: number) => (
                            <React.Fragment key={index}>
                                {degree}
                                {index < row.degree.length - 1 && <br />}
                            </React.Fragment>
                            ))}
                        </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
            <div className='w-32'>
                <Tooltip title='Thêm giảng viên'>
                    <IconButton
                        size="medium"
                        aria-label="add"
                        onClick={() => {setOpen(true)}}
                    >
                        <AddIcon fontSize='large' />
                    </IconButton>
                </Tooltip>
            </div>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle sx={{width:"100%", height:"5ch", justifyContent:"center", display:'flex'}}>Thêm giảng viên</DialogTitle>
                <DialogContent sx={{flexWrap:"wrap", display:'flex', gap:"2ch", justifyContent:"center"}}>
                {/* Form fields for adding a new instructor */}
                <TextField
                    required
                    error={errors.insusername}
                    helperText={errors.insusername ? "Vui lòng nhập vào trường này" : ""}
                    label="Tên đăng nhập giảng viên"
                    name="insusername"
                    value={newInstructor.insusername}
                    onChange={handleInputChange}
                    sx={{marginTop:"1ch"}}
                />
                <TextField
                    required
                    error={errors.password}
                    helperText={errors.password ? "Vui lòng nhập vào trường này" : ""}
                    label="Mật khẩu giảng viên"
                    name="password"
                    value={newInstructor.password}
                    onChange={handleInputChange}
                    sx={{marginTop:"1ch"}}
                />
                <TextField
                    required
                    error={errors.id}
                    helperText={errors.id ? "Vui lòng nhập vào trường này" : ""}
                    label="ID giảng viên"
                    name="id"
                    value={newInstructor.id}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    error={errors.dname}
                    helperText={errors.dname ? "Vui lòng nhập vào trường này" : ""}
                    label="Khoa"
                    name="dname"
                    value={newInstructor.dname}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    error={errors.name}
                    helperText={errors.name ? "Vui lòng nhập vào trường này" : ""}
                    label="Tên giảng viên"
                    name="name"
                    value={newInstructor.name}
                    onChange={handleInputChange}
                />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                            label="Ngày sinh"
                            format="yyyy-MM-dd"
                            disableFuture={true}
                            value={newInstructor.bdate ? new Date(newInstructor.bdate) : null}
                            onChange={handleDateChange}
                                sx={{width: '210px', height: '23px'}}
                        />
                </LocalizationProvider>
                <TextField
                    required
                    error={errors.address}
                    helperText={errors.address ? "Vui lòng nhập vào trường này" : ""}
                    label="Địa chỉ"
                    name="address"
                    value={newInstructor.address}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    error={errors.phone}
                    helperText={errors.phone ? "Vui lòng nhập vào trường này" : ""}
                    label="Số điện thoại"
                    name="phone"
                    value={newInstructor.phone}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    error={errors.rank}
                    helperText={errors.rank ? "Vui lòng nhập vào trường này" : ""}
                    label="Học hàm"
                    name="rank"
                    value={newInstructor.rank}
                    onChange={handleInputChange}
                />
                <TextField
                    required
                    error={errors.degree}
                    helperText={errors.degree ? "Vui lòng nhập vào trường này" : ""}
                    label="Học vị"
                    name="degree"
                    value={newInstructor.degree}
                    onChange={handleInputChange}
                />
                {/* Add more fields as needed */}
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Hủy</Button>
                    <Button onClick={handleAddInstructor}>Thêm</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEdit} onClose={handleCloseEdit} sx={{justifyContent:"center", display:'flex'}}>
                <DialogTitle sx={{width:"100%", height:"5ch", justifyContent:"center", display:'flex'}}>Chọn thông tin để sửa</DialogTitle>
                <DialogContent sx={{width:"100%", height:"10ch"}}>
                    <Button sx={{marginTop:"3vh"}}
                            onClick={() => {
                                setOpenEditBasicInfo(true);
                                handleCloseEdit();
                            }}
                    >
                    Thông tin cơ bản
                    </Button>
                    <Button sx={{marginTop:"3vh"}}
                            onClick={() => {
                                setOpenEditDegree(true);
                                handleCloseEdit();
                            }}
                    >
                    Thông tin học vị
                    </Button>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseEdit}>Hủy</Button>
            </DialogActions>
            </Dialog>
            <Dialog open={openEditBasicInfo} onClose={() => {setOpenEditBasicInfo(false)}}>
                <DialogTitle sx={{width:"100%", height:"5ch", justifyContent:"center", display:'flex'}}>Sửa thông tin cơ bản</DialogTitle>
                <DialogContent sx={{flexWrap:"wrap", display:'flex', gap:"2ch", justifyContent:"center", height:"40ch"}}>
                    <TextField
                        label="Tên đăng nhập giảng viên"
                        name="insusername"
                        value={editedInstructor.insusername}
                        onChange={handleEditBasicInfo}
                        sx={{marginTop:"1ch"}}
                    />
                    <TextField
                        label="ID giảng viên"
                        name="id"
                        value={editedInstructor.id}
                        onChange={handleEditBasicInfo}
                        sx={{marginTop:"1ch"}}
                    />
                    <TextField
                        label="Khoa"
                        name="dname"
                        value={editedInstructor.dname}
                        onChange={handleEditBasicInfo}
                    />
                    <TextField
                        label="Tên giảng viên"
                        name="name"
                        value={editedInstructor.name}
                        onChange={handleEditBasicInfo}
                    />
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                            label="Ngày sinh"
                            format="yyyy-MM-dd"
                            disableFuture={true}
                            value={editedInstructor.bdate ? new Date(editedInstructor.bdate) : null}
                            onChange={handleEditDateChange}
                                sx={{width: '210px', height: '23px'}}
                        />
                </LocalizationProvider>
                    <TextField
                        label="Địa chỉ"
                        name="address"
                        value={editedInstructor.address}
                        onChange={handleEditBasicInfo}
                    />
                    <TextField
                        label="Số điện thoại"
                        name="phone"
                        value={editedInstructor.phone}
                        onChange={handleEditBasicInfo}
                    />
                    <TextField
                        label="Học hàm"
                        name="rank"
                        value={editedInstructor.rank}
                        onChange={handleEditBasicInfo}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenEditBasicInfo(false)}}>Hủy</Button>
                    <Button onClick={() => {handleEditBasicInfoInstructor()}}>Xác nhận</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={openEditDegree} onClose={() => {setOpenEditDegree(false)}}>
                <DialogTitle sx={{width:"100%", height:"5ch", justifyContent:"center", display:'flex'}}>Sửa thông tin học vị</DialogTitle>
                <DialogContent sx={{flexWrap:"wrap", display:'flex', gap:"2ch", justifyContent:"center", height:"40ch"}}>
                {editedDegree.map((degree, index) => (
                    <div key={index}>
                    <TextField
                        label={`Học vị ${index + 1}`}
                        variant="outlined"
                        fullWidth
                        value={degree}
                        onChange={(e) => handleEditDegree(index, e.target.value)}
                        sx={{marginTop:"1ch"}}
                    />
                    </div>
                ))}
                {!degreeEdit &&<Button variant="outlined" color="primary" startIcon={<AddIcon />} onClick={handleAddDegree} sx={{maxHeight:"5vh"}}>
                    Thêm học vị
                </Button>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {setOpenEditDegree(false)}}>Hủy</Button>
                    <Button onClick={() => {handleEditDegreeInstructor()}}>Lưu</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default Management;
