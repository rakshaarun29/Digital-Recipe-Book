import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

export default function Favorites(){
  const [me,setMe]=useState(null)
  const [fav,setFav]=useState([])

  useEffect(()=>{(async()=>{
    const { data: meData } = await api.get('/auth/me')
    setMe(meData)
    const { data: user } = await api.get(`/users/${meData._id}`)
    setFav(user.favorites || [])
  })()},[])

  if(!me) return <div>Loading...</div>

  return (
    <div className="section">
      <h2>Favorites</h2>
      <div className="grid">
        {fav.map(r=> (
          <div key={r._id} className="card">
            <h3>{r.title}</h3>
            <Link to={`/recipe/${r._id}`}>
              <button style={{marginTop:8}}>View Recipe</button>
            </Link>
          </div>
        ))}
      </div>
    </div>
  )
}
