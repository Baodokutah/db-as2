import React from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <nav className="bg-blue-600 fixed top-0 left-0 w-full z-50 p-2 min-h-12 flex justify-between items-center">
      <div className="flex items-center">
        <a href='/'><img src="/Logo.png" className="mr-2" width="45" alt="BK Logo"></img></a>
        <button type="button" className="text-white ml-4 focus:outline-none lg:hidden">
          <i className="fas fa-bars"></i>
        </button>
      </div>
      <div className="hidden lg:flex">
        <ul className="flex items-center gap-5">
          {/* <li>
            <a role="button" onClick={() => { alert("Pekowide") }} className="flex items-center text-white hover:text-gray-200 ml-4">
              <i className="fa fa-history"></i>
              <span className="ml-1">Xem Lịch sử đăng ký</span>
            </a>
          </li> */}
          <li>
            <a href="#" className="flex items-center text-white hover:text-gray-200 ml-4">
              <i className="fa fa-user"></i>
              <span className="ml-1">Kim Gia Bảo (2152417)</span>
            </a>
          </li>
          <li>
            <a href="/login" onClick={() => {logout}} className="flex items-center text-white hover:text-gray-200">
              <i className="fa fa-sign-out"></i>
              <span className="ml-1">Đăng xuất</span>
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;