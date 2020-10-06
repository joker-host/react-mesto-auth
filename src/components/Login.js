import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { authorize } from '../utils/mestoAuth.js'

function Login(props) {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

    if(!email || !password) {
      console.error('Не заполнены некоторые обязательные поля');
    }

    authorize(email, password)
      .then((data) => {
        console.log(data)
        if(!data) {
          console.error('Error');
        }
        if(data.token) {
          resetForm();
          props.handleLogin();
          history.push('/main')
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="auth">
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
            <input className="auth__input" type="email" placeholder="Email" onChange={evt => setEmail(evt.target.value)} />
            <input className="auth__input" type="password" placeholder="Пароль" onChange={evt => setPassword(evt.target.value)} />
            <button type="submit" className="auth__submit-button">Войти</button>
            <a href="#" className="auth__link-to-sign-in">Ещё не зарегистрированы? Регистрация</a>
        </form>
    </div>
  );
}

export default Login;