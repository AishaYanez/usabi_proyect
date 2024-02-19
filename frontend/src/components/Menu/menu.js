import React from 'react';
import './menu.css';
import { Avatar, Menu, message } from 'antd';
import MenuIcon from '../../assets/images/menu-square.svg';
import AuthService from '../../services/AuthService/auth.service';
import { useNavigate } from 'react-router-dom';

function Main() {
    const nav = useNavigate();

    function getItem(label, key, icon, children, type) {
        return {
            key,
            icon,
            label,
            children,
            type,
        };
    }
    
    const logoutActions = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user_image');
        localStorage.removeItem('lastLoginTime');
        nav('/');
    };
    
    const deleteAccount = () => {
        AuthService.deleteAccount().then(res => {
            message.warning('Cuenta borrada');
            logoutActions();
        }
        ).catch(err => console.error(err))
    }

    const logOut = () => {
        if (localStorage.getItem('token') != null) {
            AuthService.logoutUser().then(r => {
                message.success('Logout exitoso');
                logoutActions();
            }).catch(e => console.error(e))
        } else {
            message.error('No hay una sesión iniciada');
        }
    }

    const items = [
        getItem('', 'sub1', <img src={MenuIcon} alt='Icono de menu' className='iconMenu' />, [
            getItem('Cuenta', null, null, [getItem('Cerrar sesión', '1'), getItem('Borrar cuenta', '2')], 'group'),
            getItem('Ayuda', null, null, [getItem('Helper', '3'), getItem('Report', '4')], 'group'),
        ]),
    ];

    const onClick = (btn) => {
        const key = btn.key;

        switch (key) {
            case "1":
                logOut();
                break;

            case "2":
                deleteAccount();
                break;

            default:
                console.log('No está implementado');
                break;
        }
    };

    return (
        <>
            <div className="menu-container">
                <div className='avatar'>
                    <Avatar src={localStorage.getItem('user_image')} size={64} type="picture-circle" />
                </div>
                <Menu
                    className="menuItem"
                    onClick={onClick}
                    mode="horizontal"
                    items={items}
                />

            </div>
        </>
    );
}

export default Main;
