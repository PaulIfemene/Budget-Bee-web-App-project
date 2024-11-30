import { React, useState } from 'react';
import './SignUp.css';
import FormInput from '../FormInput/FormInput.jsx';
import Button from '../Button/Button.jsx';
import {
  createAuthUserWithEmailAndPassword,
  signInWithGooglePopUp,
} from '../../utils/firebase/firebase.js';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import ShowPassword from '../SignUp/ShowPassword.jsx';

const defaultFormFields = {
  fullName: '',
  email: '',
  password: '',
  confirmPassword: '',
};
const SignUpSignIn = () => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formFields, setFormFields] = useState(defaultFormFields);
  const { fullName, email, password, confirmPassword } = formFields;
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

  const signUpWithEmail = async (event) => {
    event.preventDefault();
    setLoading(true);

    const signUpSuccess = await createAuthUserWithEmailAndPassword(
      fullName,
      email,
      password,
      confirmPassword,
      setLoading,
      onLoginSuccess
    );

    if (signUpSuccess) {
      toast.success('User Signed Up');
      setLoading(false);
      setTimeout(() => {
        resetFormFields();
      }, 2000);
    }
  };

  const signUpWithGoogle = () => {
    signInWithGooglePopUp(setLoading, fullName, onLoginSuccess);
  };

  return (
    <div className='wrapper'>
      <div className='signup-wrapper'>
        <h2 className='signUp-header'>
          {' '}
          Sign Up On <span style={{ color: 'var(--theme)' }}>BudgetBee.</span>
        </h2>
        <form>
          <FormInput
            label={'Full Name'}
            placeholder={'John Doe'}
            type='text'
            required
            name='fullName'
            onChange={handleChange}
            value={fullName}
          />
          <FormInput
            label={'Email'}
            placeholder={'JohnDoe@gmail.com'}
            type='email'
            required
            name='email'
            onChange={handleChange}
            value={email}
          />
          <div className='password-wrapper'>
            <FormInput
              label={'Password'}
              placeholder={'Your Password'}
              type={showPassword ? 'text' : 'password'}
              required
              name='password'
              autoComplete='new-password'
              onChange={handleChange}
              value={password}
            />
            <ShowPassword
              handleShowPassword={handleShowPassword}
              showPassword={showPassword}
            />
          </div>

          <div className='password-wrapper'>
            <FormInput
              label={'Confirm Password'}
              placeholder={'Confirm Password'}
              type={showPassword ? 'text' : 'password'}
              required
              name='confirmPassword'
              onChange={handleChange}
              autoComplete='new-password'
              value={confirmPassword}
            />
            <ShowPassword
              handleShowPassword={handleShowPassword}
              showPassword={showPassword}
            />
          </div>

          <Button type='button' disabled={loading} onClick={signUpWithEmail}>
            {loading ? 'Loading...' : 'Signup With Email'}
          </Button>
          <Button blue={true} disabled={loading} onClick={signUpWithGoogle}>
            {loading ? 'Loading...' : 'Signup With Google'}
          </Button>
          <Link className='p-login' to='/'>
            Or Have an Account Already? Click here
          </Link>
        </form>
      </div>{' '}
    </div>
  );
};

export default SignUpSignIn;
