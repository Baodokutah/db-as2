import React from 'react';
import { Link } from 'react-router-dom';

interface CardProps {
  title: string;
  copy: string;
  button: string;
  link: string;
}

const Card: React.FC<CardProps> = ({ title, copy, button, link }) => {
  return (
    <div className="card">
      <div className="content">
        <h2 className="title">{title}</h2>
        <p className="copy">{copy}</p>
        <Link to={link}>
          <button className="btn">{button}</button>
        </Link>      </div>
    </div>
  );
};

export default Card;