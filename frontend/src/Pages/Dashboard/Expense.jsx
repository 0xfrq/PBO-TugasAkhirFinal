import React, { useState, useEffect } from 'react';
import './Expense.css';
import { useNavigate, Link } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { TbCategoryPlus } from "react-icons/tb";
import { MdWorkHistory } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import axios from 'axios'; // ✅ Import axios

const Expense = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState("June 2025");
  const [saldoData, setSaldoData] = useState(null);
  const navigate = useNavigate();

  const months = [
    "January 2025", "February 2025", "March 2025", "April 2025",
    "May 2025", "June 2025", "July 2025", "August 2025",
    "September 2025", "October 2025", "November 2025", "December 2025"
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/saldo/'); // ✅ Pakai axios
        setSaldoData(res.data);
        console.log(res.data) 
      } catch (err) {
        console.error("Failed to fetch data:", err);
      }
    };
    fetchData();
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);
  const handleSelect = (month) => {
    setSelectedMonth(month);
    setIsOpen(false);
  };

  const goToHome = () => navigate("/Home");
  const goToHistory = () => navigate("/History");
  const goToProfile = () => navigate("/Profile");
  const goToExpense = () => navigate("/Expense");
  const goToIncome = () => navigate("/Income");

  return (
    <div className='page-wrapper'>
      <div className='container'>
        <div className='Text'>
          <p>Overall Balance</p>
          <h1 className='font-bold'>Rp{saldoData?.saldo_akhir?.toLocaleString('id-ID') ?? '-'}</h1>
        </div>

        <div className="relative inline-block">
          <button
            onClick={toggleDropdown}
            className="text-white justify-center flex items-center gap-2 focus:outline-none hover:opacity-80"
            style={{ background: "none", border: "none", padding: 0 }}
          >
            <span>{selectedMonth}</span>
            <span>▼</span>
          </button>
          {isOpen && (
            <div className="absolute z-10 mt-2 rounded-md bg-white shadow-md ring-1 ring-black ring-opacity-5">
              <div className="py-1">
                {months.map((month) => (
                  <button
                    key={month}
                    onClick={() => handleSelect(month)}
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                  >
                    {month}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="summary-container">
          <div className="summary-box" onClick={goToExpense}>
            <p className="label">Expenses</p>
            <p className="red">Rp{saldoData?.pengeluaran_total?.toLocaleString('id-ID') ?? '-'}</p>
          </div>
          <div className="summary-box" onClick={goToIncome}>
            <p className="label">Income</p>
            <p className="green">Rp{saldoData?.pemasukan_total?.toLocaleString('id-ID') ?? '-'}</p>
          </div>
        </div>

        <div className="info-box">
          <p className='text-center text-gray-500 italic'>Categories and detailed breakdowns not available in this API response.</p>
        </div>

        <div className="action-buttons">
          <Link to="/new" className="add-button">+ Add Category</Link>
        </div>

        <div className="mobile-navbar">
          <button onClick={goToHome} className='nav-button'>
            <GoHomeFill className='nav-icon' />
            <span className='text-nav'>Home</span>
          </button>
          <button onClick={goToExpense} className='nav-button'>
            <TbCategoryPlus className='nav-icon' />
            <span className='text-nav'>Category</span>
          </button>
          <button onClick={goToHistory} className='nav-button'>
            <MdWorkHistory className='nav-icon' />
            <span className='text-nav'>History</span>
          </button>
          <button onClick={goToProfile} className='nav-button'>
            <IoPersonOutline className='nav-icon' />
            <span className='text-nav'>Profile</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Expense;
