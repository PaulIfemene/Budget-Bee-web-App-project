import { React, useState } from 'react';
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const ShowPassword = ({ handleShowPassword, showPassword }) => {
  return (
    <div className='passwordIcon-wrapper'>
      {showPassword ? (
        <BsEye onClick={handleShowPassword} />
      ) : (
        <BsEyeSlash onClick={handleShowPassword} />
      )}
    </div>
  );
};

export default ShowPassword;
