import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function Profile(){
  const { id } = useParams()
  const [user,setUser]=useState(null)
  const [me,setMe]=useState(null)
  const [name,setName]=useState('')
  const [bio,setBio]=useState('')
  const [avatarUrl,setAvatarUrl]=useState('')
  const isMe = me && user && me._id === user._id

  useEffect(()=>{(async()=>{
    const [{ data: meData }, { data: userData }] = await Promise.all([
      api.get('/auth/me').catch(()=>({ data:null })),
      api.get(`/users/${id}`)
    ])
    setMe(meData)
    setUser(userData)
    if (userData) {
      setName(userData.name || '')
      setBio(userData.bio || '')
      setAvatarUrl(userData.avatarUrl || '')
    }
  })()},[id])

  const onSave = async (e)=>{
    e.preventDefault()
    if (!isMe) return
    const payload = { name, bio, avatarUrl }
    const { data } = await api.patch('/users/me', payload)
    setUser(data)
  }

  if(!user) return <div className="section">Loading...</div>

  return (
    <div className="section" style={{maxWidth:800}}>
      <div className="card" style={{marginBottom:16, padding:16}}>
        <div style={{display:'flex',gap:16,alignItems:'center',marginBottom:isMe?12:0}}>
          {user.avatarUrl && <img src={user.avatarUrl} alt='' style={{width:72,height:72,borderRadius:'50%'}}/>}
          <div>
            <h2>{user.name}</h2>
            <div className="muted">{user.bio || 'No bio yet.'}</div>
          </div>
        </div>
        {isMe && (
          <form onSubmit={onSave} className="row" style={{flexWrap:'wrap',gap:10,marginTop:8,alignItems:'flex-end'}}>
            <div style={{display:'flex',flexDirection:'column',flex:'1 1 140px'}}>
              <span className="muted" style={{fontSize:12,marginBottom:4}}>Name</span>
              <input value={name} onChange={e=>setName(e.target.value)} />
            </div>
            <div style={{display:'flex',flexDirection:'column',flex:'2 1 220px'}}>
              <span className="muted" style={{fontSize:12,marginBottom:4}}>Bio</span>
              <input value={bio} onChange={e=>setBio(e.target.value)} />
            </div>
            <div style={{display:'flex',flexDirection:'column',flex:'2 1 220px'}}>
              <span className="muted" style={{fontSize:12,marginBottom:4}}>Avatar URL</span>
              <input value={avatarUrl} onChange={e=>setAvatarUrl(e.target.value)} />
            </div>
            <button type='submit'>Save Profile</button>
          </form>
        )}
      </div>

      <div className="grid">
        <div className="card">
          <h3>Favorites</h3>
          <ul>
            {(user.favorites||[]).map(r => (<li key={r._id}>{r.title}</li>))}
          </ul>
        </div>
        <div className="card">
          <h3>Liked Recipes</h3>
          <ul>
            {(user.liked||[]).map(r => (<li key={r._id}>{r.title}</li>))}
          </ul>
        </div>
      </div>
    </div>
  )
}
