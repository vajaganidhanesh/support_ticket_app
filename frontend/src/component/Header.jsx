import { FaSignInAlt, FaSignOutAlt, FaUser } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom';
import {useSelector,useDispatch} from 'react-redux'
import { logout,reset } from '../features/auth/authSlice';

function Header() {
  const navigate = useNavigate()
  const dispath = useDispatch()
  const {user} = useSelector((state)=>state.auth)

  const onLogOut = () =>{
    dispath(logout())
    dispath(reset())
    navigate('/')
  }

  return (
    <>
      <header className="header">
        <div className="log">
          <Link to="/">Support Desk</Link>
        </div>
        <ul>
          {user ? (
            <>
              <li>
                <button className='btn' onClick={()=>{
                  onLogOut()
                }}>
                  <FaSignOutAlt/>Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login">
                  <FaSignInAlt />
                  Login
                </Link>
              </li>
              <li>
                <Link to="/register">
                  <FaUser />
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </header>
    </>
  );
}

export default Header