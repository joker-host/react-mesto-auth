import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../utils/mestoAuth.js'

const Register = ({ handleRegisterClick, isOpen }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  const history = useHistory();

  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    register(email, password)
      .then((res) => {
        console.log(res)
        if(res.data._id) {
          setIsSuccess(true);
          handleRegisterClick();
          history.push('/signin');
        } else {
          handleRegisterClick();
          console.error('Error');
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  return (
    <div className="auth">
        <h2 className="auth__title">Регистрация</h2>
        <form className="auth__form" onSubmit={handleSubmit} >
            <input className="auth__input" type="email" placeholder="Email" onChange={evt => setEmail(evt.target.value)} />
            <input className="auth__input" type="password" placeholder="Пароль" onChange={evt => setPassword(evt.target.value)} />
            <button type="submit" className="auth__submit-button">Зарегистрироваться</button>
            <a href="#" className="auth__link-to-sign-in">Уже зарегистрированы? Войти</a>
        </form>
    </div>
  );
}

export default Register;