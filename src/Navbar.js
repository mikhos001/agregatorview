import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Modal from './Modal';
import './Navbar.css';

function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    setIsModalOpen(false);
    // Perform logout logic here
    navigate('/login');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item">
          <Link to="/add-app" className="navbar-link">Добавить приложение</Link>
        </li>
        <li className="navbar-item">
          <Link to="/manage-integrations" className="navbar-link">Управление интеграциями</Link>
        </li>
        <li className="navbar-item">
          <Link to="/statistics" className="navbar-link">Статистика</Link>
        </li>
        <li className="navbar-item">
          <button onClick={handleLogout} className="navbar-button">Выход</button>
        </li>
      </ul>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} onConfirm={handleConfirmLogout} />
    </nav>
  );
}

export default Navbar;
