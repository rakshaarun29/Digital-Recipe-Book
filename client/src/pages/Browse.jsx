import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import api from '../api'

export default function Browse(){
  const [items,setItems]=useState([])
  const [q,setQ]=useState('')
  const [cuisine,setCuisine]=useState('')
  const [sort,setSort]=useState('new')
  const [page,setPage]=useState(1)
  const [hasMore,setHasMore]=useState(false)

  const fetchPage=async(nextPage, append=false, overrideSort=null)=>{
    const params = { page: nextPage, limit: 12 }
    if (q) params.q=q
    if (cuisine) params.cuisine=cuisine
    if (overrideSort ?? sort) params.sort = (overrideSort ?? sort)
    const { data } = await api.get('/recipes',{ params })
    setHasMore(!!data.hasMore)
    setPage(data.page)
    setItems(prev => append ? [...prev, ...data.items] : data.items)
  }

  const load=()=> fetchPage(1, false)
  const loadMore=()=> fetchPage(page+1, true)

  useEffect(()=>{ load() },[])

  // Infinite scroll
  const loaderRef = useRef(null)
  useEffect(()=>{
    const el = loaderRef.current
    if (!el) return
    const io = new IntersectionObserver(([entry])=>{
      if (entry.isIntersecting && hasMore) {
        fetchPage(page+1, true)
      }
    }, { rootMargin:'200px' })
    io.observe(el)
    return ()=>{ try{ io.disconnect() }catch{} }
  }, [hasMore, page, sort, q, cuisine])

  return (
    <div>
      <h2>Browse Recipes</h2>
      <div className="row section">
        <button className={sort==='new' ? '' : 'secondary'} onClick={()=>{ setSort('new'); fetchPage(1,false,'new') }}>All</button>
        <button className={sort==='trending' ? '' : 'secondary'} onClick={()=>{ setSort('trending'); fetchPage(1,false,'trending') }}>Trending</button>
      </div>
      <div className="row section">
        <input placeholder='Search (title, ingredients, tags...)' value={q} onChange={e=>setQ(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') load() }} />
        <input placeholder='Cuisine' value={cuisine} onChange={e=>setCuisine(e.target.value)} onKeyDown={(e)=>{ if(e.key==='Enter') load() }} />
        <button onClick={load}>Apply</button>
      </div>
      {items.length === 0 ? (
        <div className="card" style={{padding:20}}>
          <h3>No recipes found</h3>
          <div className="muted">Try different keywords (e.g., an ingredient like "paneer" or a tag like "dessert").</div>
        </div>
      ) : (
      <div>
      <div className="grid">
        {items.map(r=> (
          <div key={r._id} className="card">
            <h3>{r.title}</h3>
            <Link to={`/recipe/${r._id}`}>
              <button style={{marginTop:8}}>View Recipe</button>
            </Link>
          </div>
        ))}
      </div>
      {hasMore && (
        <div className="section" style={{textAlign:'center'}}>
          <button onClick={loadMore}>Load More</button>
        </div>
      )}
      {hasMore && (
        <div ref={loaderRef} style={{height:1}} />
      )}
      </div>
      )}
    </div>
  )
}
