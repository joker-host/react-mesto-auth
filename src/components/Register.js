import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { register } from '../utils/mestoAuth.js'

const Register = ({ setIsRegisterPopupOpen }) => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [isSuccess, setIsSuccess] = useState(false);

  const history = useHistory();

  
  const handleSubmit = (evt) => {
    evt.preventDefault();
    register(email, password)
      .then((res) => {
        if(res.data._id) {
          history.push('/signin');
          setIsSuccess(true);
        } else {
          console.error('Error');
        }
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setIsRegisterPopupOpen(true);
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