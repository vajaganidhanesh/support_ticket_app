import { useState,useEffect } from "react";
import { toast } from "react-toastify";
import { FaSignInAlt } from "react-icons/fa";
import {useSelector,useDispatch} from 'react-redux'
import { login,reset } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import Spinner from "../component/Spinner";

function Login() {
  const [formdata, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  const {  email, password,} = formdata;
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(()=>{
    if(isError){
      toast.error(message)
    }

    // Redirect when logged in
    if(isSuccess || user){
      navigate('/')
    }

    dispatch(reset())
  },[isError,isSuccess,user,message,navigate,dispatch])

  const onChange = (e) => {
    setFormData((prevState)=>({
      ...prevState,
      [e.target.name]:e.target.value
    }))
  };


  const onSubmit = (e) =>{
    e.preventDefault();

    const userData = {
      email,
      password
    }

    dispatch(login(userData))
  }

  if(isLoading){
    return <Spinner/>
  }
  return (
    <>
      <section className="heading">
        <h1>
          <FaSignInAlt /> Login
        </h1>
        <p>Please Login</p>
      </section>

      <section className="form">
        <form onSubmit={onSubmit}>

          <div className="form-group">
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={email}
              onChange={onChange}
              placeholder='Enter your email'
              required
            />
          </div>

          <div className="form-group">
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              value={password}
              onChange={onChange}
              placeholder='Enter password'
              required
            />
          </div>

          <div className="form-group">
            <button className="btn btn-block">
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;
