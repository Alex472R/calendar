import React, {useState} from 'react';

import SwitchDate from '../SwitchDate/SwitchDate';
import ModalWindow from '../ModalWindow/ModalWindow';

import './Header.scss'
import {month} from 'react-big-calendar/lib/utils/dates';

const Header = ({isLogin, setIsLogin}) => {

  const month = () => {
    const today = new Date();
    const year = today.getFullYear();
    return new Date().toLocaleString('ru', {month: 'long'}) + ' ' + year
  }

  const [modalActive, setModalActive] = useState(false);

  const logOut = () => {
    localStorage.clear();
    setIsLogin(false);
  }

  return (
    <header>
      <nav>
        <div className="up">
          <div className="log">
            {isLogin ? (
              <div
                onClick={logOut}
                className='link-man'
              >
                <div className='sign'>LogOut</div>
              </div>
            ) : (
              <div
                onClick={() => setModalActive(true)}
                className='link-man'
              >
                <div className='sign'>Sign up / Sign in</div>
              </div>
            )}
          </div>

          <SwitchDate/>

          <div className="Search">
            <input type="text"/>
          </div>
        </div>

        <div className="down">

          <div className="month">
            {month()}
          </div>

          <div className="switch-day-down">
            сегодня
          </div>

        </div>
      </nav>

      <ModalWindow active={modalActive} setActive={setModalActive} isLogin={isLogin} setIsLogin={setIsLogin}/>

    </header>
  )
}

export default Header;
