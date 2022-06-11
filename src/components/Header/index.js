import { useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

import HeaderAction from '../HeaderAction'

import logo from '../../assests/img/logo.png';
import './header.scss';
import '../../../node_modules/boxicons/css/boxicons.min.css'

const headerNav = [
    {
        title: 'Home',
        path: '/'
    },
    {
        title: 'Movie',
        path: '/movie'
    },
    {
        title: 'TV Serie',
        path: '/tv'
    },
    {
        title: 'Genre',
        subItems: [
            {
                title: 'Action',
                path: '/action'
            },
            {
                title: 'Adventure',
                path: '/adventure'
            },
            {
                title: 'Animation',
                path: '/animation'
            },
            {
                title: 'Comedy',
                path: '/comedy'
            },
            {
                title: 'Crime',
                path: '/crime'
            },
            {
                title: 'Documentary',
                path: '/documentary'
            },
            {
                title: 'Drama',
                path: '/drama'
            },
            {
                title: 'Family',
                path: '/fantasy'
            },
            {
                title: 'History',
                path: '/history'
            },
            {
                title: 'Horror',
                path: '/horror'
            },
            {
                title: 'Music',
                path: '/music'
            },
            {
                title: 'Mistery',
                path: '/mistery'
            },
            {
                title: 'Romance',
                path: '/romance'
            },
            {
                title: 'Science Fiction',
                path: '/science_fiction'
            },
            {
                title: 'Thriller',
                path: '/thriller'
            },
            {
                title: 'War',
                path: '/war'
            },
            {
                title: 'Western',
                path: '/western'
            },
            {
                title: 'TV Movie',
                path: '/tv_movie'
            },
        ],
        path: '/genre'
    }
]

const Header = () => {
    const headerRef=useRef();
    const navRef = useRef();
    const {pathname} = useLocation();
    const activeItem = () =>{
        const index = pathname === '/' ? 
            headerNav.findIndex(item => item.path==='/') 
            :
            headerNav.findIndex(item => {          
                return item.path!=='/' && (pathname.includes(item.path) || (item.subItems && item.subItems.filter((subItem,i) => item.path.concat(subItem.path)===pathname)>0));
            })
        return index;    
    } 
    useEffect(()=>{
        const shrinkEffect = () => {
            if(window.scrollY > 150 || document.documentElement.scrollTop > 150)
                headerRef.current.classList.add('shrink');
            else    
                headerRef.current.classList.remove('shrink');    
        }
        window.addEventListener('scroll', shrinkEffect);
        return  () =>
            window.removeEventListener('scroll',shrinkEffect);
    },[])

    return (
        <div ref={headerRef} className='header'>
            <i className="bx bx-menu header__burger"
                onClick={() => {
                    navRef.current.classList.toggle('expand')
                }}
            ></i>
            <div className='header__container container'>
                <div className='header__logo'>
                    <img src={logo} alt='' />
                    <Link to='/'>Movie</Link>
                </div>
                <ul ref={navRef} className='header__nav'>
                    {headerNav.map((item, index) => (
                        <li
                            key={index}
                            className={index===activeItem() ? 'active' : ''}
                        >
                            {item.subItems ?
                                <>
                                    {item.title}
                                    {item.subItems && (
                                        <ul className='header__subNav'>
                                            {item.subItems.map((subItem, index) => (
                                                <li key={index} className='header__subItem'>
                                                    <Link to={item.path.concat(subItem.path)}>{subItem.title}</Link>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </>
                                :
                                <Link to={item.path}>
                                    {item.title}
                                </Link>
                            }
                        </li>
                    ))}
                </ul>
                <div className='header__action'>
                    <HeaderAction />
                </div>
            </div>
        </div>
    )
}

export default Header;