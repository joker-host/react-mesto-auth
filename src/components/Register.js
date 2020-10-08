import React from 'react';
import { useState } from 'react';
<<<<<<< HEAD
import { useHistory } from 'react-router-dom';
import { register } from '../utils/mestoAuth.js'

const Register = ({ handleRegisterClick, isOpen }) => {
=======
import { useHistory, Link } from 'react-router-dom';
import { register } from '../utils/mestoAuth.js'

const Register = ({ setIsRegisterPopupOpen, setOnFail }) => {
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

<<<<<<< HEAD
  const [isSuccess, setIsSuccess] = useState(false);

  const history = useHistory();

  
=======
  const history = useHistory();

>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
  const handleSubmit = (evt) => {
    evt.preventDefault();
    register(email, password)
      .then((res) => {
<<<<<<< HEAD
        console.log(res)
        if(res.data._id) {
          setIsSuccess(true);
          handleRegisterClick();
          history.push('/signin');
        } else {
          handleRegisterClick();
          console.error('Error');
=======
        console.log(res);
        if(res.data) {
          setIsRegisterPopupOpen(res);
          setOnFail('');
          history.push('/signin');
        } else {
          setIsRegisterPopupOpen(res)
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
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
<<<<<<< HEAD
            <input className="auth__input" type="email" placeholder="Email" onChange={evt => setEmail(evt.target.value)} />
            <input className="auth__input" type="password" placeholder="Пароль" onChange={evt => setPassword(evt.target.value)} />
            <button type="submit" className="auth__submit-button">Зарегистрироваться</button>
            <a href="#" className="auth__link-to-sign-in">Уже зарегистрированы? Войти</a>
=======
            <input className="auth__input" type="email" placeholder="Email" required="true" onChange={evt => setEmail(evt.target.value)} />
            <input className="auth__input" type="password" placeholder="Пароль" required="true" onChange={evt => setPassword(evt.target.value)} />
            <button type="submit" className="auth__submit-button">Зарегистрироваться</button>
            <Link className="auth__link-to-sign-in" to="/signin">Уже зарегистрированы? Войти</Link>
>>>>>>> 7afc69f4a567d553b150fc3c15db9316c357a23b
        </form>
    </div>
  );
}

export default Register;