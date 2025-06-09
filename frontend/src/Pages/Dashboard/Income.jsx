import React, {useState, useEffect} from 'react'
import './Income.css'
import '../../index.css'
import { useNavigate, Link } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { TbCategoryPlus } from "react-icons/tb";
import { MdWorkHistory } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";


const Income = ({categories}) => {
  const [isOpen, setIsOpen] = useState(false);
      const [selectedMonth, setSelectedMonth] = useState("June 2025");
      const [expenseCategories, setExpenseCategories] = useState([]);
     const navigate = useNavigate();
     useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem("categories")) || [];
      const expensesOnly = storedData.filter(item => item.type === "Expense");
      setExpenseCategories(expensesOnly);
    }, []);
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
      const goToHome = () => navigate("/Home");
      const goToHistory= () => navigate("/History");
       const goToProfile= () => navigate("/Profile");
      const goToExpense = () => navigate("/Expense");
      const goToIncome = () => navigate("/Income");
  return (
       <div className='page-wrapper'>
      <div className='container'>
        <div className='Text'>
          <p>Overal balance</p>
          <h1 className='font-bold'>Rp50.000,-</h1>
      <div className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="text-white  justify-center flex items-center gap-2 focus:outline-none hover:opacity-80"
        style={{ background: "none", border: "none", padding: 0 }}
      >
        <span>{selectedMonth}</span>
        <span>▼</span>
      </button>
     {isOpen && (
        <div className="absolute z-10 mt-2  rounded-md  bg-white  ring-black ring-opacity-5">
          <div className="py-1">
            {months.map((month) => (
              <button
                key={month} onClick={() => handleSelect(month)} className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left">
                {month}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
      </div>
      <div className="summary-container">
  <div className="summary-box" onClick={goToExpense}>
    <p className="label">Expenses</p>
    <p className="red">Rp0,-</p>
  </div>
  <div className="summary-box" onClick={goToIncome}>
    <p className="label">Income</p>
    <p className="green">Rp0,-</p>
  </div>
</div>

    
        <div className="category-list">
          {expenseCategories.map((cat, index) => (
            <div key={index} className="category-card" style={{
            
            }}>
                <div className="category-info">
                  <strong>{cat.category}</strong>
                    <p className="category-description">{cat.description}</p>
                 </div>
                <div className="category-total">Rp {cat.total || 0}</div>
                </div>
          
          ))}
        </div>
          <div className="action-buttons">
          <Link to="/new" className="add-button">+ Add Category</Link>
          <button onClick={() => {localStorage.removeItem("categories"); setExpenseCategories([]);
    }}
    className="add-button clear"
  >
    Clear All
  </button>
</div>
     <div className="mobile-navbar">
            <button onClick={goToHome} className='nav-button'><GoHomeFill className='nav-icon'/><span>Home</span></button>
            <button onClick={goToExpense} className='nav-button'><TbCategoryPlus className='nav-icon'/><span>Category</span></button>
            <button onClick={goToHistory} className='nav-button'><MdWorkHistory className='nav-icon'/><span>History</span></button>
            <button onClick={goToProfile} className='nav-button'><IoPersonOutline className='nav-icon'/><span>Profile</span></button>
      ...
            </div>
    </div>
    </div>
  )
}

export default Income
