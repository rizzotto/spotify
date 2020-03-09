import React from 'react'
import './Nav.css'
import { Link } from 'react-router-dom'

export default function Nav(){

  const style = {
    color: 'white',
    listStyle:'none'
  }

  return(
    <nav>
      <h3>Logo</h3>
      <Link to="/search" style={style} className="nav-item">
        <li>Search</li>
      </Link>
    </nav>
  )
}