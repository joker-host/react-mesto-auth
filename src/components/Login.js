import React from 'react';
import { useState } from 'react';
<<<<<<< HEAD
import { useHistory } from 'react-router-dom';
import { authorize } from '../utils/mestoAuth.js'

function Login(props) {
  
=======
import { useHistory, Link } from 'react-router-dom';
import { authorize } from '../utils/mestoAuth.js'

function Login({ handleLogin, onFail, setOnFail }) {

>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  const resetForm = () => {
    setEmail('');
    setPassword('');
  }

  const handleSubmit = (evt) => {
    evt.preventDefault();

<<<<<<< HEAD
    if(!email || !password) {
=======
    if (!email || !password) {
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
      console.error('Не заполнены некоторые обязательные поля');
    }

    authorize(email, password)
      .then((data) => {
<<<<<<< HEAD
        console.log(data)
        if(!data) {
          console.error('Error');
        }
        if(data.token) {
          resetForm();
          props.handleLogin();
          history.push('/main')
=======
        if (data.token) {
          resetForm();
          handleLogin();
          setOnFail('');
          history.push('/main');
        } else if (data.message) {
          setOnFail(data.message);
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
        }
      })
      .catch((err) => {
        console.log(err);
      })
  }

  return (
    <div className="auth">
<<<<<<< HEAD
        <h2 className="auth__title">Вход</h2>
        <form className="auth__form" onSubmit={handleSubmit}>
            <input className="auth__input" type="email" placeholder="Email" onChange={evt => setEmail(evt.target.value)} />
            <input className="auth__input" type="password" placeholder="Пароль" onChange={evt => setPassword(evt.target.value)} />
            <button type="submit" className="auth__submit-button">Войти</button>
            <a href="#" className="auth__link-to-sign-in">Ещё не зарегистрированы? Регистрация</a>
        </form>
=======
      <h2 className="auth__title">Вход</h2>
      <form className="auth__form" onSubmit={handleSubmit}>
        <input className="auth__input" type="email" required="true" placeholder="Email" onChange={evt => setEmail(evt.target.value)} />
        <div className="auth__input-container">
          <input className="auth__input" type="password" placeholder="Пароль"  onChange={evt => setPassword(evt.target.value)} />
          <p className="auth__error-field">{onFail}</p>
        </div>
        <button type="submit" className="auth__submit-button">Войти</button>
        <Link className="auth__link-to-sign-in" to="/signup">Ещё не зарегистрированы? Регистрация</Link>
      </form>
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
    </div>
  );
}

export default Login;