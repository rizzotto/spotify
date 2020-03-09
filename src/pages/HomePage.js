import React from 'react'
import { Link } from "react-router-dom";
export default function HomePage(){


  return(
    <div>
      <h1>HomePage</h1>

      <button >
        <Link to="/search">Click Here</Link>
      </button>
    </div>
  )
}