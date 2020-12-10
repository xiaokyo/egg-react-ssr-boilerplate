import React from 'react'
import { Link } from 'react-router-dom'

const Login: SFC<any> = ({ name }) => {
  return (
    <div>{name}
      <Link to="/">Home</Link>
    </div>
  )
}

Login.getInitialProps = async (ctx) => {
  return { name: 'Login' }
}

export default Login
