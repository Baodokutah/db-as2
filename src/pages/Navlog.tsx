import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState } from 'react';
import axios from 'axios';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [error, setError] = useState(''); 
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleLogin = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); // Reset the error message before each login attempt
    if (!username || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    try {
      const response = await axios.post('/api/admin/login', { username, password });
      if (response.status === 200) {

        console.log(response)

        // const parts = response.replace('(', '').replace(')', '').split(',');
        // const id = parts[0];
        // const username = parts[1];
        // const name = parts[2].replace(/"/g, ''); 
        const cookie = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsIm5hbWUiOiJzTWFuYWdlciIsImlhdCI6MTUxNjIzOTAyMn0.kVGKTHIShHv-hMpRoLwVRUmCpyRc7vZ1330YeA5GD_E';
        login('admin', cookie, '', 'admin');
        navigate('/dashboard');
        return;
      }
    } catch (error) {
      console.log(error)
        setError('Wrong username or password');
      }
    
  };


  return (
    <div className="flex items-center justify-center h-screen">
      <div className="p-10 bg-white item-center overflow-hidden md:overflow-auto shadow-md rounded-md">
        <img className="h-60 mx-auto" src="https://quanlycongnghiep.com/wp-content/uploads/2019/06/logo-hcmut.png" alt="Logo" />
        <h1 className="text-center border-b border-black border-solid text-2xl font-semibold my-4">
          Đăng nhập dành cho
        </h1>
        <div className="space-y-3">
          <Button 
            variant="contained" 
            onClick={() => {
              navigate('/login/action');
            }}            
            sx={{ 
              width: {xs:300, sm:500}, 
              display: 'block', 
              textAlign: 'center', 
              color: 'black', 
              backgroundColor: 'white', 
              px: 3, 
              py: 2, 
              borderRadius: 'default', 
              boxShadow: 'default' 
            }}
          >
            Cán bộ/ Sinh viên trường ĐH Bách Khoa TP.HCM
          </Button>
          <Button 
            variant="contained" 
            onClick={() => {
              // login('admin');
              setShowLoginForm(true);
            }}
              sx={{ 
              width: {xs:300, sm:500}, 
              display: 'block', 
              textAlign: 'center', 
              color: 'black', 
              backgroundColor: 'white', 
              px: 3, 
              py: 2, 
              borderRadius: 'default', 
              boxShadow: 'default' 
            }}
          >
            Cán bộ / Quản trị viên hệ thống
          </Button>
          {showLoginForm && (
          <form className="login-form mt-4" onSubmit={handleLogin}>
        <div className="login-form-username form-group">
          <label htmlFor="username" className="sr-only">Tên đăng nhập</label>
          <input type="text" name="username" id="username" className="form-control form-control-lg w-[500px] px-3 py-2 rounded-md shadow-sm" placeholder="Tên đăng nhập" autoComplete="username" onChange={(e) => setUsername(e.target.value)} />
        </div>
        <div className="login-form-password form-group mt-2">
          <label htmlFor="password" className="sr-only">Mật khẩu</label>
          <input type="password" name="password" id="password" className="form-control form-control-lg w-[500px] px-3 py-2 rounded-md shadow-sm" placeholder="Mật khẩu" autoComplete="current-password" onChange={(e) => setPassword(e.target.value)} />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <div className="login-form-submit form-group mt-2">
          <button className="btn btn-primary btn-lg px-3 py-2 rounded-md shadow-sm bg-blue-500 text-white" type="submit" id="loginbtn">Đăng nhập</button>
        </div>
        <div className="login-form-forgotpassword form-group mt-2">
          <a href="https://e-learning.hcmut.edu.vn/login/forgot_password.php" className="text-blue-500 hover:underline">Quên mật khẩu?</a>
        </div>
      </form>
        )}
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
