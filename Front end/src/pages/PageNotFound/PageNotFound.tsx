import React from 'react'
import { Link } from 'react-router-dom'

export const PageNotFound = () => {
  return (
    <div style={{
        width: '100vw',
        height: '100vh',
        background: "#222",
        color: 'white',
        display: 'flex',
        flexDirection: 'column',
        gap: '2rem',
        justifyContent: 'center',
        alignItems: 'center',
    }}>

        <h1 style={{fontSize: '3rem' }}>404 Page Not Found</h1>
        <Link to={'/'}><h3 style={{color: 'white'}}>Back to Home</h3></Link>
                
    </div>
  )
}
