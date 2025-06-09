import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { GoHomeFill } from "react-icons/go";
import { TbCategoryPlus } from "react-icons/tb";
import { MdWorkHistory } from "react-icons/md";
import { IoPersonOutline } from "react-icons/io5";
import Boy from '../../assets/boy.png'
import './Profile.css'

const Profile = () => {
  const [username, setUsername] = useState("Henry Cavill");
  const [isEditing, setIsEditing] = useState(false);
  const [tempUsername, setTempUsername] = useState(username);
   const navigate = useNavigate();
     const goToHome = () => navigate("/Home");
      const goToHistory= () => navigate("/History");
       const goToProfile= () => navigate("/Profile");
      const goToExpense = () => navigate("/Expense");
      const goToIncome = () => navigate("/Income");
       const handleLogout = () => {
    alert("Logged out successfully!");
    navigate("/Login"); 
    // Tambahkan logika logout sebenarnya di sini (misalnya: hapus token, redirect, dll)
  };

  const handleSaveUsername = () => {
    setUsername(tempUsername);
    setIsEditing(false);
  };

  return (
    <div className='page-wrapper'>
      <div className='container'>
        <p className='profile'>Profile</p>
          <div className='username'>
            <div className='boy'>
              <img src={Boy} alt="boy" className='boy' />
            </div>
            <div className="username-box">
          {isEditing ? (
            <div className="edit-username">
              <input
                type="text"
                value={tempUsername}
                onChange={(e) => setTempUsername(e.target.value)}
              />
              <button onClick={handleSaveUsername} className="save-btn">Save</button>
            </div>
          ) : (
           <button className="username-button" onClick={() => setIsEditing(true)}>
      <div className="username-content">
        <span className="username-label">Username</span>
        <span className="username-text">{username}</span>
      </div>
      <span className="edit-icon">✏️</span>
    </button>
          )}
        </div>
      </div>
      <div className="profile-buttons">
    <button className="profile-btn">
      <span className="icon"></span> Settings
    </button>
    <button className="profile-btn">
      <span className="icon"></span> Privacy policy
    </button>
    <button className="profile-btn" onClick={handleLogout}>
      <span className="icon"></span> Log-out
    </button>
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

export default Profile
