import React, {useState} from 'react'
import { Redirect } from 'react-router-dom'
import { useAuthContext } from '../context'

const Signup = () => {
  
  const { signup, authState,continueWithGoogle, continueWithFacebook } = useAuthContext()
  const [accountCreated, setAccountCreated] = useState(false)
  const [signupFormData, setSignupFormData] = useState({
    email: '',
    password: '',
    re_password:'',
    first_name:'',
    last_name:''
  })

  const {email, password, re_password, first_name, last_name} = signupFormData
  const onChange = e => setSignupFormData({
    ...signupFormData,
    [e.target.name]:e.target.value
  })
  
  const onSubmit = e => {
    e.preventDefault()
    signup(email, first_name, last_name, password, re_password)
    setAccountCreated(true)
  }

  if (authState.isAuthenticated){
    return <Redirect to='/'/>
  }
  if (accountCreated){
    return <Redirect to='/login'/>
  }

  return (
    <div>
      <form onSubmit={e => onSubmit(e)}>
        <input
          type='text'
          placeholder='email'
          name='email'
          value={email}
          onChange={e => onChange(e)}
          required
          autoComplete='email'
        />
        <input
          type='password'
          placeholder='password'
          name='password'
          value={password}
          onChange={e => onChange(e)}
          required
          autoComplete='new-password'
        />
        <input
          type='password'
          placeholder='re-type password'
          name='re_password'
          value={re_password}
          onChange={e => onChange(e)}
          required
          autoComplete='new-password'
        />
        <input
          type='text'
          placeholder='first name'
          name='first_name'
          value={first_name}
          onChange={e => onChange(e)}
          required
        />
        <input
          type='text'
          placeholder='last name'
          name='last_name'
          value={last_name}
          onChange={e => onChange(e)}
          required
        />
      <button type='submit'>Register</button>
      </form>
      <button onClick={e => continueWithGoogle()}>Continue With Google</button>
      <button onClick={e => continueWithFacebook()}>Continue With Facebook</button>
    </div>
  )
}

export default Signup
