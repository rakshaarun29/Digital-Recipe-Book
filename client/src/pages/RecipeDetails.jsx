import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../api'

export default function RecipeDetails(){
  const { id } = useParams()
  const [item,setItem]=useState(null)
  const [stars,setStars]=useState(5)
  const [hoverStars,setHoverStars]=useState(null)
  const [comment,setComment]=useState('')

  const load=async()=>{
    const { data } = await api.get(`/recipes/${id}`)
    setItem(data)
  }

  useEffect(()=>{ load() },[id])

  if(!item) return <div className="section">Loading...</div>

  const like = async()=>{
    await api.post(`/recipes/${id}/like`)
    load()
  }

  const favorite = async()=>{
    await api.post(`/recipes/${id}/favorite`)
    alert('Added to favorites')
  }

  const rate = async(e)=>{
    e.preventDefault()
    const { data } = await api.post(`/recipes/${id}/rate`, { stars, comment })
    setComment('')
    if (data?.ratings) {
      setItem(prev => ({ ...prev, ratings: data.ratings }))
    } else {
      load()
    }
  }

  const avg = item.ratings?.length ? (item.ratings.reduce((a,b)=>a+b.stars,0)/item.ratings.length).toFixed(1) : '—'

  return (
    <div className="section" style={{maxWidth:900}}>
      <h2>{item.title}</h2>
      <div className="muted" style={{margin:'8px 0'}}>⭐ {avg}</div>
      <div className="actions" style={{marginBottom:12}}>
        <button onClick={like}>Like ({item.likes?.length || 0})</button>
        <button className='secondary' onClick={favorite}>Add to Favorites</button>
      </div>

      <div className="grid" style={{gridTemplateColumns:'1fr 1fr'}}>
        <div className="card">
          <h3>Ingredients</h3>
          <ul>
            {item.ingredients?.map((ing,i)=>{
              const txt = typeof ing === 'string' ? (ing.charAt(0).toUpperCase()+ing.slice(1)) : ing
              return (<li key={i}>{txt}</li>)
            })}
          </ul>
        </div>
        <div className="card">
          <h3>Steps</h3>
          <ol>
            {item.steps?.map((s,i)=>{
              const txt = typeof s === 'string' ? (s.charAt(0).toUpperCase()+s.slice(1)) : s
              return (<li key={i}>{txt}</li>)
            })}
          </ol>
        </div>
      </div>

      <div className="section card" style={{display:'grid',gap:10, maxWidth:600}}>
        <h3>Rate this recipe</h3>
        <div className="row">
          <div style={{display:'inline-flex', gap:2}} onMouseLeave={()=>setHoverStars(null)}>
            {[0,1,2,3,4].map((i)=>{
              const val = (hoverStars ?? stars)
              const fillLeft = val >= i+0.5
              const fillRight = val >= i+1
              return (
                <div key={i} style={{position:'relative', width:28, height:28, cursor:'pointer'}}
                  onMouseMove={(e)=>{
                    const rect = e.currentTarget.getBoundingClientRect()
                    const half = (e.clientX - rect.left) < rect.width/2 ? 0.5 : 1
                    setHoverStars(i + half)
                  }}
                  onClick={()=>{
                    setStars(hoverStars ?? (i+1))
                  }}
                >
                  <svg viewBox="0 0 24 24" width="28" height="28">
                    <defs>
                      <linearGradient id={`gleft-${i}`} x1="0" y1="0" x2="1" y2="0">
                        <stop offset="50%" stopColor={fillLeft? '#f59e0b':'#e5e7eb'} />
                        <stop offset="50%" stopColor={fillRight? '#f59e0b':'#e5e7eb'} />
                      </linearGradient>
                    </defs>
                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={`url(#gleft-${i})`} stroke="#e5e7eb"/>
                  </svg>
                </div>
              )
            })}
          </div>
        </div>
        <form onSubmit={rate} className="row">
          <input placeholder='Comment (optional)' value={comment} onChange={e=>setComment(e.target.value)} />
          <button type='submit'>Submit</button>
        </form>
      </div>

      <div className="section card">
        <h3>Ratings & Reviews</h3>
        <ul>
          {item.ratings?.map((r)=> (
            <li key={r._id}>⭐ {r.stars} — {r.comment || 'No comment'}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}
