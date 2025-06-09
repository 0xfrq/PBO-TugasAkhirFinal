import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { TbCategoryPlus } from "react-icons/tb";
import { MdWorkHistory } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5"; 
import './Home.css'
const transactionHistory = [
  {
    date: 'Accounts',
    items: [
      {  category: 'Card', amount: 100000 },
      {  category: 'Cash',  amount: 100000 },
    ],
  },
  {
    date: 'Savings',
    items: [
      {  category: 'Rumah',  amount: 50000 },
    ],
  },
  
];
const formatRupiah = (number) => `Rp${number.toLocaleString('id-ID')}`;
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const goToHome = () => navigate("/Home");
  const goToHistory= () => navigate("/History");
  const goToProfile= () => navigate("/Profile");
  const goToExpense = () => navigate("/Expense");
  return (
    <div className='page-wrapper'>
      <div className='container'>
        <div className='Text'>
          <p>Overal balance</p>
          <h1 className='font-bold'>Rp50.000,-</h1>
        </div>
        <hr className='hr-text' />
        <div className="relative inline-block"></div>
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

export default Home
