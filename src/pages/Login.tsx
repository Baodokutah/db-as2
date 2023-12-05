import React, { useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Login: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); // Add this line
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(''); // Reset the error message before each login attempt
    if (!username || !password) {
      setError('Vui lòng nhập tên đăng nhập và mật khẩu');
      return;
    }

    try {
      const studentResponse = await axios.post('/api/student/login', { username, password });
      if (studentResponse.status === 200) {
        const response = studentResponse.data.info.login;
        const parts = response.replace('(', '').replace(')', '').split(',');
        const id = parts[0];
        const username = parts[1];
        const name = parts[2].replace(/"/g, ''); 
        login('student', username, id, name);
        navigate('/');
        return;
      }
    } catch (error) {
      console.log(error)
      try {
        const instructorResponse = await axios.post('/api/instructor/login', { username, password });
        if (instructorResponse.status === 200) {
          const response = instructorResponse.data.info.login;
          const parts = response.replace('(', '').replace(')', '').split(',');
          const id = parts[0];
          const username = parts[1];
          const name = parts[2].replace(/"/g, ''); 
          login('instructor', username, id, name);
          navigate('/');
          return;
        }
      } catch (error) {
        
        setError('Wrong username or password');
      }
    }
  };

  const handleReset = () => {
    setUsername('');
    setPassword('');
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleLogin();
  };

  return (
    <div className="container mx-auto bg-gray-200 shadow-md rounded-b-lg">
      <div className="bg-white">
        <div id="header" className="flex justify-between items-center p-4 bg-indigo-800 text-white">
          <div id="app-name" className="flex items-center">
            <img alt="BK" src="/Logo.png" className="mr-4" />
            <h1 className="text-4xl font-bold">DỊCH VỤ XÁC THỰC TẬP TRUNG</h1>
          </div>
        </div>
        <div id="content" className="p-4 overflow-hidden">
          <div className="box panel bg-gray-100 p-6 rounded-md" id="login">
            <form id="fm1" className="clearfix" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold text-red-600 mb-4 border-b border-gray-300 pb-2">Nhập thông tin tài khoản của bạn</h2>
              <div className="mb-4">
                <label htmlFor="username" className="block text-lg text-gray-600 font-bold mb-2">Tên tài khoản</label>
                <input id="username" name="username" className="required bg-yellow-100 p-2 rounded-md border border-gray-300 w-full" tabIndex={1} type="text" autoComplete="false" value={username} onChange={e => setUsername(e.target.value)} />
              </div>
              <div className="mb-4">
                <label htmlFor="password" className="block text-lg text-gray-600 font-bold mb-2">Mật khẩu</label>
                <input id="password" name="password" className="required bg-yellow-100 p-2 rounded-md border border-gray-300 w-full" tabIndex={2} type="password" autoComplete="off" value={password} onChange={e => setPassword(e.target.value)} />
              </div>
              {error && <p className="text-red-500">{error}</p>}
              <div className="flex items-center mb-4">
                <input id="warn" name="warn" value="true" tabIndex={3} type="checkbox" className="mr-2" />
                <label htmlFor="warn" className="text-sm text-gray-600">Cảnh báo trước khi tôi đăng nhập vào các trang web khác.</label>
              </div>
              <div className="flex justify-between items-center mb-4">
                <input type="hidden" name="lt" value="LT-11872434-l76fo33WM5UMWNKY3vlpn30n0JU0ZA" />
                <input type="hidden" name="execution" value="e1s1" />
                <input type="hidden" name="_eventId" value="submit" />
                <div className="flex space-x-2">
                <button className="btn bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit" tabIndex={4}>Đăng nhập</button>
                <button className="btn bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="reset" tabIndex={5} onClick={handleReset}>Xóa</button>
                </div>
              </div>
              <div className="support mb-0">
                <ul className="list-none">
                  <li className="inline-block mr-4 border-r border-gray-200 pr-4">
                    <a href="https://account.hcmut.edu.vn/">Thay đổi mật khẩu?</a>
                  </li>
                </ul>
              </div>
            </form>
          </div>
          <div id="sidebar">
            <div className="sidebar-content pl-8">
              <div id="list-languages" className="panel">
                <h3 className="text-xl font-bold text-red-600 mt-6">Ngôn ngữ</h3>
                <ul className="list-none">
                  <li className="inline-block mr-4 border-r border-gray-200 pr-4"><a href="login?locale=vi">Tiếng Việt</a></li>
                  <li className="inline-block mr-4"><a href="login?locale=en">Tiếng Anh</a></li>
                </ul>
              </div>
              <div id="list-notes" className="panel">
                <h3 className="text-xl font-bold text-red-600 mt-6">Lưu ý</h3>
                <p className="panel note bevel-white text-sm">Trang đăng nhập này cho phép đăng nhập một lần đến nhiều hệ thống web ở trường Đại học Bách Khoa Tp.HCM. Điều này có nghĩa là bạn chỉ đăng nhập một lần cho những hệ thống web đã đăng ký với hệ thống xác thực quản lý truy cập tập trung.</p>
                <p className="panel note bevel-white text-sm">Bạn cần dùng tài khoản HCMUT để đăng nhập. Tài khoản HCMUT cho phép truy cập đến nhiều tài nguyên bao gồm hệ thống thông tin, thư điện tử, ... </p>
                <p className="panel note bevel-white text-sm">Vì lý do an ninh, bạn hãy Thoát khỏi trình duyệt Web khi bạn kết thúc việc truy cập các dịch vụ đòi hỏi xác thực!</p>
              </div>
              <div id="list-supports" className="panel">
                <h3 className="text-xl font-bold text-red-600 mt-6">Hỗ trợ kỹ thuật</h3>
                <ul className="list-none">
                  <li className="inline-block mr-4 border-r border-gray-200 pr-4">
                    E-mail: <a href="mailto:support@hcmut.edu.vn">support@hcmut.edu.vn</a>
                  </li>
                  <li className="inline-block mr-4">
                    ĐT: (84-8) 38647256 - 5200
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div id="footer" className="panel note bevel-white text-sm">
          <a id="hcmut" href="http://www.hcmut.edu.vn" title="go to HCMUT home page"></a>
          <div id="copyright" className='flex items-center justify-center w-full'>
            <p>Bản quyền © 2023 Đại học Bách Khoa Tp. Hồ Chí Minh.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;