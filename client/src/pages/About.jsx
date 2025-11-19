import React from 'react'

export default function About(){
  return (
    <div className="section" style={{maxWidth:700}}>
      <div className="card" style={{padding:20}}>
        <h2>About RecipeRealm</h2>
        <div className="muted" style={{marginBottom:12}}>A calm little corner to store all your favorite recipes.</div>
        <hr style={{border:'none', borderTop:'1px solid var(--border)', margin:'8px 0 16px'}} />
        <p>RecipeRealm is a community-driven digital recipe book where you can add, browse, and share recipes with clear, beginner-friendly steps.</p>
        <p>It is built using a modern MERN stack: React on the frontend, Node.js and Express on the backend, and MongoDB for data storage.</p>
        <hr style={{border:'none', borderTop:'1px dashed var(--border)', margin:'16px 0'}} />
        <p className="muted" style={{fontSize:14, marginBottom:4}}>Team</p>
        <p className="muted" style={{fontSize:14, margin:0}}>
          Nyssa Bansal (PES1UG24CS306)<br/>
          Raksha Arun (PES1UG24CS363)<br/>
          Prachi Jalan (PES1UG24CS326)
        </p>
      </div>
    </div>
  )
}
