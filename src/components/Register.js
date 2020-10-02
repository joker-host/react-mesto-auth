import React from 'react';

function Register() {
  
  return (
    <div className="register">
        <h2 className="register__title">Регистрация</h2>
        <form className="register__form">
            <input className="register__input" />
            <input className="register__input" />
            <button type="button" className="register__submit-button" />
        </form>
        <a className="register__link-to-sign-in">Уже зарегистрированы? Войти</a>
    </div>
  );
}

export default Register;