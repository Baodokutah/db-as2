import React from 'react';
import Card from '../components/Card';
import { useAuth } from '../context/AuthContext';

const studentCards = [
  { title: 'Đăng kí môn học', copy: 'Sinh viên có thể đăng kí môn học tại đây', button: 'Tiếp tục', link: 'register' },
  { title: 'Thời khóa biểu', copy: 'Sinh viên vào đây để xem thời khóa biểu', button: 'Tiếp tục', link: 'schedule' },
  { title: 'Bảng điểm', copy: 'Sinh viên vào đây để xem điểm', button: 'Tiếp tục', link: 'grades' },
];

const instructorCards = [
  { title: 'Đăng kí dạy học', copy: 'Giảng viên có thể đăng kí dạy học tại đây', button: 'Tiếp tục', link: 'register' },
  { title: 'Thời khóa biểu', copy: 'Giảng viên vào đây để xem thời khóa biểu', button: 'Tiếp tục', link: 'schedule' },
  { title: 'Nhập điểm', copy: 'Giảng viên vào đây để nhập điểm', button: 'Tiếp tục', link: 'grades' },
];

const Hero: React.FC = () => {
  const { user } = useAuth();
  const cards = user?.role === 'student' ? studentCards : instructorCards;

  return (
    <main className="page-content">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} copy={card.copy} button={card.button} link={card.link} />
      ))}
    </main>
  );
};

export default Hero;