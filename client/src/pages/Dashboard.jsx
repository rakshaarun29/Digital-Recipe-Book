import React, { useEffect, useState } from 'react'
import api from '../api'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [me, setMe] = useState(null)
  const [suggested,setSuggested] = useState([])

  useEffect(()=>{(async()=>{
    const { data } = await api.get('/auth/me')
    setMe(data)
    try{
      const { data: recs } = await api.get('/recipes/suggested')
      setSuggested(recs.items || [])
    }catch{}
  })()},[])

  if (!me) return <div className="section">Loading...</div>

  return (
    <div className="section">
      <h2>Hi {me.name}! What's cooking today?</h2>
      <div className="actions" style={{marginBottom:16}}>
        <Link to="/add"><button>Add Recipe</button></Link>
        <Link to="/favorites"><button className='secondary'>Favorites</button></Link>
        <Link to={`/profile/${me._id}`}><button className='secondary'>Profile</button></Link>
      </div>

      <div className="section">
        <h3>Suggested Recipes</h3>
        {suggested.length === 0 ? (
          <div className="card" style={{padding:12}}>
            <div className="muted">We will start suggesting recipes once you like, favorite, or rate a few dishes.</div>
          </div>
        ) : (
          <div className="grid">
            {suggested.map(r => (
              <div key={r._id} className="card">
                <h3>{r.title}</h3>
                <Link to={`/recipe/${r._id}`}>
                  <button style={{marginTop:8}}>View Recipe</button>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
