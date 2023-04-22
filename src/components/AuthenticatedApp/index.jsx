import { userName, logout, roomTemp} from '../../server/firebase';
import {Link} from 'react-router-dom';
import React, {useState} from "react";
import "./index.css";

// import { Landing } from '../Landing';
// import { ChatRoom } from '../ChatRoom';


function AuthenticatedApp() {
    const [room, setRoom] = useState("");
    var romTemp = null;
    //window.room = romTemp; 
    function testRoom(){
        romTemp = roomTemp();
        localStorage.setItem("roomId",romTemp);
        window.location.href='/room/'+romTemp;
    }

    const handleSubmit =  (event) => {
        event.preventDefault();
        localStorage.setItem("roomId",room);
        window.location.href='/room/' + room;
        console.log(room);
    }
    return (
        <div className='main'>
        <div className='inner'>
            <h3 className='welcome'>Добро пожаловать в приложение для видеосвязи!</h3>
            <div className='divCreate'>
                <button className="btns" onClick={testRoom}>Создать комнату</button>
            </div>
            <div className='forma'>
            <form onSubmit={handleSubmit}>
                <label className='labelRoom'>Введите номер комнаты:</label>
                <div className='inputRoom'>
                <input
                type="text"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
                placeholder='Номер...'
                className='inputRoom'></input>
                </div>
                <input className="btns" type="submit" value="Войти"/>
            </form>
            </div>
            <div className='divOut'>
                <button className="leaveBtn" onClick={logout}>Выход из аккаунта</button>
            </div>
        </div>
        </div>
        
    );
}


export { AuthenticatedApp };