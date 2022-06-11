import React from 'react'
import { NavLink, useLocation, useParams } from 'react-router-dom';

import './pagination.scss';


const Pagination = (props) => {
  const { totalPages, curPage } = props;
  const { pathname } = useLocation();
  const { page } = useParams();
  var pathWithoutPage = '';

  if (page) {
    for (let i = pathname.length - 1; i >= 0; i--) {
      if (pathname[i] === '/') {
        pathWithoutPage = pathname.substring(0, i);
        break;
      }
    }
  } else {
    pathWithoutPage = pathname;
  }

  let pages = [
    {
      label: 'Prev',
      page: curPage - 1
    },
    {
      label: (curPage - 1).toString(),
      page: curPage - 1
    },
    {
      label: curPage.toString(),
      page: curPage
    },
    {
      label: (curPage + 1).toString(),
      page: curPage + 1
    },
    {
      label: 'Next',
      page: curPage + 1
    },
  ];

  if (curPage === 1) {
    pages.forEach((val, index) => {
      if (index !== pages.length - 1) {
        val.label = (curPage + index).toString();
        val.page = curPage + index;
      }
    })
  }
  if (curPage === totalPages) {
    pages.forEach((val, index) => {
      if (index !== 0) {
        val.label = (curPage - (pages.length - index - 1)).toString();
        val.page = curPage - (pages.length - index - 1);
      }
    })
  }

  console.log(curPage)

  return (
    <div className='pagination'>
      {pages.map((val, index) => (
        <div key={index} className={val.page === curPage ? 'page active' : 'page'}>
          <NavLink
            style={({ isActive }) => {
              return {
                color: isActive ? "$main-color" : "",
              };
            }}
            to={`${pathWithoutPage}/${val.page}`}>{val.label}</NavLink>
        </div>
      ))}
    </div>
  )
}

export default Pagination