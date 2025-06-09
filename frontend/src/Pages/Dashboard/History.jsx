import React, {useState} from 'react'
import './History.css'
import { useNavigate } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { TbCategoryPlus } from "react-icons/tb";
import { MdWorkHistory } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";

const transactionHistory = [
  {
    date: 'Today',
    items: [
      {  category: 'Shopping', description: 'Baju dan celana', amount: 100000 },
    ],
  },
  {
    date: '2 Jun',
    items: [
      {  category: 'Food', description: 'Kebab dan es teh', amount: 50000 },
      { category: 'Electricity', description: 'Listrik dan Wifi', amount: 150000 },
    ],
  },
  {
    date: '3 Jun',
    items: [
      { category: 'Animal', description: 'Makanan Hewan', amount: 27000 },
    ],
  },
];

const formatRupiah = (number) => `Rp${number.toLocaleString('id-ID')}`;

const History = () => {
   const [isOpen, setIsOpen] = useState(false);
      const [selectedMonth, setSelectedMonth] = useState("June 2025");
  const navigate = useNavigate();
  const goToHome = () => navigate("/Home");
  const goToHistory= () => navigate("/History");
  const goToProfile= () => navigate("/Profile");
  const goToExpense = () => navigate("/Expense");
  const toggleDropdown = () => setIsOpen(!isOpen);
    const handleSelect = (month) => {
      setSelectedMonth(month);
      setIsOpen(false);
    };
  
    const months = [
      "January 2025", "February 2025", "March 2025", "April 2025",
      "May 2025", "June 2025", "July 2025", "August 2025",
      "September 2025", "October 2025", "November 2025", "December 2025"
    ];
  return (
    <div className='page-wrapper'>
      <div className='container'>
        <div className='balance'>
          <div className='Text-history'>
            <p>Balance</p>
            <h1> <span className='Rp'>Rp</span>50.000,-</h1>
          </div>
          <div className='History'>
            <button className='btn'>Expenses Rp10.000,-</button>
            <button className='btn'>Income Rp15.000,-</button>
          </div>
          <div className="dropdown-container">
            <button className="dropdown-button" onClick={toggleDropdown}>
            <span>{selectedMonth}</span>
            <span className="arrow">▼</span>
            </button>

            {isOpen && (
          <div className="dropdown-menu">
            {months.map((month) => (
            <button
              key={month}
              onClick={() => handleSelect(month)}
              className="dropdown-item"
            >
              {month}
            </button>
          ))}
        </div>
      )}
    </div>
</div>
         <div className="transaction-container">
      {transactionHistory.map((section, index) => (
        <div key={index}>
          <h3 className="date-label">{section.date}</h3>
          {section.items.map((item, idx) => (
            <div className="transaction-card" key={idx}>
              <div className="transaction-left">
                <div className="icon">{item.icon}</div>
                <div className="transaction-info">
                  <div className="category">{item.category}</div>
                  <div className="description">{item.description}</div>
                </div>
              </div>
              <div className="amount">{formatRupiah(item.amount)}</div>
            </div>
          ))}
        </div>
      ))}
    </div>
        <div className="mobile-navbar">
                <button onClick={goToHome} className='nav-button'><GoHomeFill className='nav-icon'/><span className='text-nav'>Home</span></button>
                <button onClick={goToExpense} className='nav-button'><TbCategoryPlus className='nav-icon'/><span className='text-nav' >Category</span></button>
                <button onClick={goToHistory} className='nav-button'><MdWorkHistory className='nav-icon'/><span className='text-nav'>History</span></button>
                <button onClick={goToProfile} className='nav-button'><IoPersonOutline className='nav-icon'/><span className='text-nav'>Profile</span></button>
          ...
        </div>
        </div>
        
      </div>
  )
}

export default History
