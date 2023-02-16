import React from 'react'
import {auth, provider} from "../firebase"
import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import {
    selectUserName,
    setUserLogin,
    setSignOut
  } from "../features/user/userSlice";
  import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react"

function Header() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const userName = useSelector(selectUserName);

    useEffect(()=> {
        auth.onAuthStateChanged(async (user)=>{
        if(user){
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email,
            }))
            navigate("/home")
        }
        })
    },[])

    const signIn = () => {
        auth.signInWithPopup(provider)
        .then((result)=>{
            let user = result.user
            dispatch(setUserLogin({
                name: user.displayName,
                email: user.email
            }))
            navigate("/home")
        })
    }

    const signOut = () =>{
        auth.signOut()
        .then(()=> {
            dispatch(setSignOut());
            navigate("/")
        })
    }

    return (
        <Nav>
            <Logo src="/images/logo.svg" alt="Disney+" />
            { !userName ?  (
                <LoginContainer>
                  <Login onClick={signIn}>Login</Login>
                </LoginContainer>
                ): 
            <>
            <NavMenu>
                <a href="/">
                    <img src="/images/home-icon.svg" alt="HOME" />
                    <span>HOME</span>
                </a>
                <a href="/#">
                    <img src="/images/search-icon.svg" alt="SEARCH"/>
                    <span>SEARCH</span>
                </a>
                <a href="/#">
                    <img src="/images/watchlist-icon.svg" alt="WATCHLIST"/>
                    <span>WATCHLIST</span>
                </a>
                <a href="/#">
                    <img src="/images/original-icon.svg" alt="ORIGINALS"/>
                    <span>ORIGINALS</span>
                </a>
                <a href="/#">
                    <img src="/images/movie-icon.svg" alt="MOVIES"/>
                    <span>MOVIES</span>
                </a>
                <a href="/#">
                    <img src="/images/series-icon.svg" alt="SERIES"/>
                    <span>SERIES</span>
                </a>
            </NavMenu>
            <UserImg onClick={signOut} src= "/images/userlogo.png" alt="SignOut"/>
            </>
           }
        </Nav>

    )
}

export default Header

const Nav = styled.nav`
    height: 70px;
    background: #090b13;
    display: flex;
    align-items: center;
    padding: 0 36px;
    overflow-x: hidden;
`

const Logo = styled.img`
    width: 80px;
`

const NavMenu = styled.div`
    display: flex;
    flex: 1;
    margin-left: 25px;
    align-items: center;
    a {
        display: flex; 
        align-items: center;
        padding: 0 12px;
        cursor: pointer;
        text-decoration:none;
        color:white;
        img {
            height: 20px;
        }
        span {
            font-size: 13px;
            letter-spacing: 1.42px;
            position: relative;
            &:after {
                content: "";
                height: 2px;
                background: white;
                position: absolute;
                left: 0; 
                right: 0;
                bottom: -6px;
                opacity: 0;
                transform-origin: left center;
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                transform: scaleX(0);
            }
        }
        &:hover {
            span:after {
                transform: scaleX(1);
                opacity: 1;
            }
        }
    }
`

const UserImg = styled.img`
    width: 48px;
    height: 48px;
    border-radius: 50%;
    cursor: pointer;

    
`

const Login = styled.div`
    background-color: rgba(0, 0, 0, 0.6);
    padding: 8px 16px;
    text-transform: uppercase;
    letter-spacing: 1.5px;
    border: 1px solid #f9f9f9;
    border-radius: 4px;
    transition: all 0.2s ease 0s;
    cursor: pointer;

    &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
    }
`

const LoginContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: flex-end;
`