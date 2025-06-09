import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { FaRegCalendarAlt } from 'react-icons/fa';
import { GoHomeFill } from "react-icons/go";
import { TbCategoryPlus } from "react-icons/tb";
import { MdWorkHistory } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import './newIncome.css'
import Arrow from '../../assets/arrow.png'
const NewIncome = () => {
  const [type, setType] = useState('Expense');
    const [date, setDate] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [total, setTotal] = useState('');
  
    const formatRupiah = (value) => {
    const number = value.replace(/\D/g, ''); // Hanya angka
    const formatted = new Intl.NumberFormat('id-ID').format(number);
    return 'Rp ' + formatted;
  };
  
 const handleTotalChange = (e) => {
  const inputValue = e.target.value;
  setTotal(formatRupiah(inputValue));
};

 const handleSubmit = (e) => {
    e.preventDefault();
    const numericTotal = total.replace(/[^\d]/g, '');

   const newCategory = {
    type,
    date,
    category,
    description,
    total: numericTotal,
  };
     const storedCategories = JSON.parse(localStorage.getItem('categories')) || [];

  storedCategories.push(newCategory);

  localStorage.setItem('categories', JSON.stringify(storedCategories));
    navigate('/Income');
  };
  const handleCancel = () => {
    setDate('');
    setCategory('');
    setDescription('');
    setTotal('');
    navigate('/Income');
  };
    const navigate = useNavigate();
    const goToHome = () => navigate("/Home");
    const goToHistory= () => navigate("/History");
     const goToProfile= () => navigate("/Profile");
    const goToExpense = () => navigate("/Expense");
    const goToIncome = () => navigate("/Income");
    const goToNew = () => navigate("/New");
    const goToNewIncome = () => navigate("/newIncome");
    return (
      <div className='page-wrapper'>
        <div className='container'>
          <img src={Arrow} alt="Arrow" className='arrow' onClick={goToExpense} style={{ cursor: 'pointer' }}/>
         <h1 className='text-category'>New Category</h1>
          <div className='new-button'>
            <button onClick={goToNew} className="trackbutton">Expenses 
        </button>
         <button onClick={goToNewIncome} className="trackbutton">Income 
        </button>
          </div>
          <form className="form-wrapper" onSubmit={handleSubmit}> 
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} className="input-rounded" required
    />
     <input
      type="text"
      value={category}
      onChange={(e) => setCategory(e.target.value)}
      className="input-rounded"
      placeholder="Category"
    />
    <input
      type="text"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      className="input-rounded"
      placeholder="Description(Opstional)"
    />
     <input
    type="text"
    value={total}
    onChange={handleTotalChange}
    className="input-rounded"
    placeholder="Total"
    required
  />
  <div className="form-buttons">
        <button type="button" className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
          <button type="submit" className="save-btn" onClick={handleSubmit}>
          Save
        </button>
      </div>
    </form>
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
  
export default NewIncome
