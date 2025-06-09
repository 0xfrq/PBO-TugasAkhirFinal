import React, {useState} from 'react'
import {Routes,Route, Navigate} from 'react-router-dom'
import Login from './Pages/Login/Login'
import Signin from './Pages/Login/Signin'
import Home from './Pages/Dashboard/Home'
import Expense from './Pages/Dashboard/Expense'
import New from './Pages/Dashboard/New'
import Profile from './Pages/Dashboard/Profile'
import Income from './Pages/Dashboard/Income'
import History from './Pages/Dashboard/History'
import NewIncome from './Pages/Dashboard/NewIncome'



const App = () => {
   const [categories, setCategories] = useState([]);

  const handleAddCategory = (data) => {
    setCategories([...categories, data]);
  };

  return (
    <div>
        <Routes>
        <Route path='/' element={<Root/>} />
        <Route path='/UAS/' element={<Root/>} /> {/* Add this line */}
        <Route path='/Login' element={<Login/>}/>
        <Route path='/Signin' element= {<Signin/>}/>
        <Route path='/Home' element={<Home/>}/>
        <Route path='/Expense' element={<Expense categories={categories}/>} />
        <Route path='/Income' element={<Income categories={categories}/>}/>
        <Route path='/New' element={<New onAddCategory={handleAddCategory}/>}/>
        <Route path='/NewIncome' element={<NewIncome onAddCategory={handleAddCategory}/>}/>
        <Route path='/Profile' element={<Profile/>}/>
        <Route path='/History' element={<History/>}/>
      </Routes>
    </div>
  );
};

export default App;
const Root = () => {
  return <Navigate to='/Home' /> ;
};
