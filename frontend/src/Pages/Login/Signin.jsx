import React , {useState} from 'react'
import './Signin.css'
import '../../index.css'
import { useNavigate } from 'react-router-dom';
import Arrow from '../../assets/arrow.png'
import Email from'../../assets/email.png'
import Password from '../../assets/lock.png'
import Eyeclose from '../../assets/invisible.png'
import Eyeopen from '../../assets/show.png'


const Signin = () => {
  const navigate = useNavigate();
  const goToHome = () => navigate("/Home");
  const goToLogin = () => navigate("/Login");
    const [showPassword, setShowPassword] = useState(false);
    const togglePassword = () => {setShowPassword((prev) => !prev);};
  return (
    <div className='page-wrapper'>
        <div className='container'>
          <img src={Arrow} alt="Arrow" className='panah' onClick={goToLogin} />
            <div className='text'>
              <h1 className="text-white text-5x1 mb-2">Sign with Google</h1>
              <p className="text-gray-400 mb-4">Please enter all information to sign</p>
            </div>
           <form>
  {/* Email */}
  <div className="form">
    <span className="icon">
      <img src={Email} alt="email" className="icon-img" />
    </span>
    <input
      type="email"
      id="email"
      placeholder="Email"
      className="input"
    />
  </div>

  {/* Password */}
  <div className="form">
    <span className="icon">
      <img src={Password} alt="password" className="icon-img" />
    </span>
    <input
      type={showPassword ? 'text' : 'password'}
      id="password"
      placeholder="Enter your password"
      className="input-password"
    />
    <button
      type="button"
      className="toggle-button"
      onClick={togglePassword}
    >
      <img
        src={showPassword ? Eyeopen : Eyeclose}
        alt="Toggle"
        className="icon-img"
      />
    </button>
  </div>

  <div className="submit-button">
    <button onClick={goToHome} className="submit">Sign in</button>
  </div>
</form>

        </div>
      
    </div>
  )
}

export default Signin
