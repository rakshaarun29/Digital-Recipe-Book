import React, { useState } from 'react'
import api from '../api'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      const { data } = await api.post('/auth/login', { email, password })
      localStorage.setItem('token', data.token)
      location.href = '/dashboard'
    }catch(err){
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <div className="section" style={{maxWidth:420}}>
      <h2>Login</h2>
      {error && <div className="section" style={{color:'#fca5a5'}}>{error}</div>}
      <form onSubmit={onSubmit} className="card" style={{display:'grid', gap:10}}>
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button type='submit'>Login</button>
      </form>
    </div>
  )
}
