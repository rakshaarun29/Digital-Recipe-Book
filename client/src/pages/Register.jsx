import React, { useState } from 'react'
import api from '../api'

export default function Register(){
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      const { data } = await api.post('/auth/register', { name, email, password })
      localStorage.setItem('token', data.token)
      location.href = '/dashboard'
    }catch(err){
      setError(err.response?.data?.message || 'Register failed')
    }
  }

  return (
    <div className="section" style={{maxWidth:420}}>
      <h2>Register</h2>
      {error && <div className="section" style={{color:'#fca5a5'}}>{error}</div>}
      <form onSubmit={onSubmit} className="card" style={{display:'grid', gap:10}}>
        <input placeholder='Name' value={name} onChange={e=>setName(e.target.value)} />
        <input placeholder='Email' value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder='Password' type='password' value={password} onChange={e=>setPassword(e.target.value)} />
        <button type='submit'>Create Account</button>
      </form>
    </div>
  )
}
