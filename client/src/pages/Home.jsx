import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div className="section hero">
      <div className="recipe-book">
        <div className="book-shadow" />
        <div className="book">
          <div className="spine" />
          <div className="ribbon" />
          <div className="page left-page">
            <div className="page-inner">
              <h1 style={{marginBottom:8}}>RecipeRealm</h1>
              <p className="muted" style={{marginBottom:16}}>Your personal digital recipe book.</p>
              <div className="ink">
                <p>Collect simple, delicious recipes.</p>
                <p>Organize by cuisine and tags.</p>
                <p>Cook with clear step-by-step.</p>
              </div>
              <div className="actions" style={{marginTop:16}}>
                <Link to="/browse"><button>Open Recipes</button></Link>
                <Link to="/add"><button className="secondary">Write a Recipe</button></Link>
              </div>
            </div>
          </div>
          <div className="page right-page">
            <div className="page-inner">
              <div className="page-title">Today’s Feature</div>
              <div className="feature-card">
                <div className="feature-media" aria-hidden>
                  <img loading="lazy" src="/hero-cover.png" alt="Recipe book cover" onError={(e)=>{e.currentTarget.src='https://picsum.photos/seed/realm/440/260'}} />
                </div>
                <div className="feature-body">
                  <h3 className="feature-name">Explore Cuisines</h3>
                  <p className="muted">Indian · Mexican · American · Italian</p>
                  <div style={{display:'flex',gap:8,marginTop:8}}>
                    <Link to="/browse"><button className="small">Browse</button></Link>
                    <Link to="/login"><button className="small secondary">Login</button></Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
