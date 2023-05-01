import { memo, useEffect, useState } from 'react'
import { Row, Col } from 'antd'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import style from '../../../styles/Login.module.scss'
import classNames from 'classnames/bind'
import clsx from 'clsx'

const Login = () => {
    const cx = classNames.bind(style)
    const navigate = useNavigate()
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [email, setEmail] = useState('');
    const [showRegister, setShowRegister] = useState(false);

    useEffect(() => {
        if (localStorage.getItem('username')) {
            navigate('/')
        }
    }, [])

    const handleSubmit = () => {
        if (showRegister) {
            if (userName.trim() === '') {
                console.log('empty username')
            } else if (displayName.trim() === '') {
                console.log('empty display name')
            } else if (password.trim() === '') {
                console.log('empty password')
            } else if (confirmPassword.trim() === '') {
                console.log('empty confirm password')
            } else if (password !== confirmPassword) {
                console.log('password mismatch')
            } else if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
                console.log('email not valid')
            } else {
                let f = new FormData();
                f.append('username', userName);
                f.append('password', password);
                f.append('email', email);
                f.append('name', displayName);
                axios.post('http://localhost:5000/api/sign/register', f)
                    .then(res => {
                        localStorage.setItem('accessToken', res.data.accessToken);
                        localStorage.setItem('refreshToken', res.data.refreshToken);
                        localStorage.setItem('username', res.data.username)
                    })
                    .then(() => { navigate('/') })
                    .catch(() => {
                        console.log('create failed')
                    })
            }

        } else {
            if (userName.trim() !== '' && password.trim() !== '') {
                let f = new FormData();
                f.append('username', userName)
                f.append('password', password)
                axios.post('http://localhost:5000/api/sign/signin', f)
                    .then(res => {
                        localStorage.setItem('accessToken', res.data.accessToken);
                        localStorage.setItem('refreshToken', res.data.refreshToken);
                        localStorage.setItem('username', res.data.username)
                    })
                    .then(() => { navigate('/') })
                    .catch(() => {
                        console.log('login failed')
                    })
            } else {

            }
        }
    }

    return (
        <Row style={{marginTop: '10%'}}>
            <Col span={6} offset={10}>
                <div><label htmlFor="username">tên đăng nhập</label></div>
                <div><input type="text" value={userName} onChange={e => setUserName(e.target.value)} className={cx('input')} id='username'></input></div>
                {showRegister ? <div><label htmlFor="name">tên</label></div> : <></>}
                {showRegister ? <div><input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} className={cx('input')} id='name'></input></div> : <></>}
                {showRegister ? <div><label htmlFor="email">email</label></div> : <></>}
                {showRegister ? <div><input type="text" value={email} onChange={e => setEmail(e.target.value)} className={cx('input')} id='email'></input></div> : <></>}
                <div><label htmlFor="password">mật khẩu</label></div>
                <div><input type='password' value={password} onChange={e => setPassword(e.target.value)} onKeyDown={(e) => {if(e.code === 'Enter' && !showRegister){
                    handleSubmit()
                }}} className={cx('input')} id='pasword'></input></div>
                {showRegister ? <div><label htmlFor="confirmPassword">xác nhận mật khẩu</label></div> : <></>}
                {showRegister ? <div><input type='password' value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) }} className={cx('input')} id='confirmPass'></input></div> : <></>}

                <div><button onClick={() => { handleSubmit() }} className={clsx({ [cx('register-button')]: showRegister }, { [cx('login-button')]: !showRegister })}>{showRegister ? 'đăng ký' : 'đăng nhập'}</button></div>
                <div><button onClick={() => { setShowRegister(!showRegister) }}>{showRegister ? 'đã có tài khoản?' : 'chưa có tài khoản? đăng ký ngay'}</button></div>
            </Col>
        </Row>
    )
}

export default memo(Login)