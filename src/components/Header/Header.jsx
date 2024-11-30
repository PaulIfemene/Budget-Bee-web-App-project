import React, { useEffect } from 'react';
import './Header.css';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, signOutUser } from '../../utils/firebase/firebase';
import { toast } from 'react-toastify';
import userImg from '../../assets/user.svg';
import { Link } from 'react-router-dom';

const Header = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, loading]);

  const logoutFunc = () => {
    try {
      signOutUser()
        .then(() => {
          toast.success('Logged Out');
          navigate('/');
        })
        .catch((error) => {
          toast.error(error.message);
        });
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className='navbar-menu'>
      <p className='logo'> BudgetBee </p>
      <div className='navbar-side-panel'>
        <Link className='nav-headers' to='/dashboard'>
          Dashboard
        </Link>
        <Link className='nav-headers' to='/transactions'>
          {' '}
          <p>My Transactions </p>{' '}
        </Link>
        <div>
          {user && (
            <div
              style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}
            >
              <img
                src={user.photoURL ? user.photoURL : userImg}
                style={{
                  height: '1.5rem',
                  width: '1.5rem',
                  borderRadius: '50%',
                }}
              />
              <p className='logo link' onClick={logoutFunc}>
                Logout
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
