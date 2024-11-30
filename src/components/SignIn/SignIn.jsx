import { React, useState } from 'react';
import '../SignUp/SignUp.css';
import FormInput from '../FormInput/FormInput.jsx';
import Button from '../Button/Button.jsx';
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from '../../utils/firebase/firebase.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShowPassword from '../SignUp/ShowPassword.jsx';

const defaultFormFields = {
  email: '',
  password: '',
  fullName: '',
};
const SignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { email, password, fullName } = formFields;
  const navigate = useNavigate();

  const resetFormFields = () => {
    setFormFields(defaultFormFields);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormFields({ ...formFields, [name]: value });
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const onLoginSuccess = () => {
    navigate('/dashboard');
  };

  const signInWithEmail = async (event) => {
    event.preventDefault();

    setLoading(true);
    const signInSuccess = await signInAuthUserWithEmailAndPassword(
      email,
      password,
      setLoading
    );

    if (signInSuccess) {
      toast.success('User logged in successfully');
      setLoading(false);

      setTimeout(() => {
        resetFormFields();
        onLoginSuccess();
      }, 2000);
    }
  };

  const signInWithGoogle = () => {
    signInWithGooglePopUp(setLoading, fullName, onLoginSuccess);
  };

  return (
    <div className='wrapper'>
      <div className='signup-wrapper'>
        <h2 className='signUp-header'>
          {' '}
          Login on <span style={{ color: 'var(--theme)' }}>BudgetBee.</span>
        </h2>
        <form>
          <FormInput
            label={'Email'}
            placeholder={'JohnDoe@gmail.com'}
            type='email'
            required
            name='email'
            onChange={handleChange}
            value={email}
            autoComplete='off'
          />

          <div className='password-wrapper'>
            <FormInput
              label={'Password'}
              placeholder={'Your Password'}
              type={showPassword ? 'text' : 'password'}
              required
              name='password'
              onChange={handleChange}
              value={password}
              autoComplete='off'
            />
            <ShowPassword
              handleShowPassword={handleShowPassword}
              showPassword={showPassword}
            />
          </div>
          <Button type='button' disabled={loading} onClick={signInWithEmail}>
            {' '}
            {loading ? 'Loading...' : '  Login Using Email and Password'}
          </Button>
          <Button blue={true} disabled={loading} onClick={signInWithGoogle}>
            {loading ? 'Loading...' : 'Login Using Google'}
          </Button>
          <Link className='p-login' to='/sign-up'>
            Or Don't Have An Account? Click Here
          </Link>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
