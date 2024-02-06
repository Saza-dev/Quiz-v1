import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavBar from './NavBarOne';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [regNo, setRegNo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [status, setStatus] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const result = await axios.post('http://localhost:8070/Login', { regNo, password });

      if (result.data === 'Success') {
        localStorage.setItem('status', true);
        localStorage.setItem('regNo', regNo);
        setStatus(result.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        if (status === 'Success') {
          const result = await axios.post('http://localhost:8070/dashboard', { registerNo: regNo });
          localStorage.setItem('role', result.data.role);
          if (result.data.role === 'admin') {
            navigate('/AdminDashboard');
          } else {
            navigate('/UserDashboard');
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    fetchDashboard();
  }, [status]);

  return (
    <div>
      <NavBar />
      <div className="container text-center mt-5">
        <h1>QBIT</h1>
        <div className="d-flex justify-content-center align-items-center custom-margin-top">
          <form onSubmit={handleSubmit} className='login'>
            <div className="mb-5 form-outline">
              <input
                type="text"
                className="form-control form-control-lg"
                value={regNo}
                placeholder="Register Number"
                name="regNo"
                onChange={(e) => setRegNo(e.target.value)}
                required
              />
            </div>
            <div className="mb-5">
              <input
                type="password"
                className="form-control form-control-lg"
                value={password}
                placeholder="Password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type="submit" className="btn btn-dark btn-lg px-5">
              Sign In
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Login;
