import React from 'react';
import Card from '../components/Card';

const cards = [
  { title: 'Đăng kí môn học', copy: 'Sinh viên có thể đăng kí môn học tại đây', button: 'Tiếp tục', link: '/register' },
  { title: 'Thời khóa biểu', copy: 'Sinh viên vào đây để xem thời khóa biểu', button: 'Tiếp tục', link: '/schedule' },
  { title: 'Bảng điểm', copy: 'Sinh viên vào đây để xem điểm', button: 'Tiếp tục', link: 'grades' },
];

const Hero: React.FC = () => {
  return (
    <main className="page-content">
      {cards.map((card, index) => (
        <Card key={index} title={card.title} copy={card.copy} button={card.button} link={card.link} />
      ))}
    </main>
  );
};

export default Hero;