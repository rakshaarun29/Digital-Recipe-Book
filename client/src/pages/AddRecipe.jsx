import React, { useState } from 'react'
import api from '../api'

export default function AddRecipe(){
  const [title,setTitle]=useState('')
  const [ingredients,setIngredients]=useState('')
  const [steps,setSteps]=useState('')
  const [prepTime,setPrepTime]=useState('')
  const [cookTime,setCookTime]=useState('')
  const [cuisine,setCuisine]=useState('General')
  const [tags,setTags]=useState('')
  const [image,setImage]=useState(null)
  const [error,setError]=useState('')

  const onSubmit=async(e)=>{
    e.preventDefault()
    setError('')
    try{
      const form = new FormData()
      form.append('title', title)
      form.append('ingredients', JSON.stringify(ingredients.split('\n').filter(Boolean)))
      form.append('steps', JSON.stringify(steps.split('\n').filter(Boolean)))
      form.append('prepTime', prepTime)
      form.append('cookTime', cookTime)
      form.append('cuisine', cuisine)
      form.append('tags', JSON.stringify(tags.split(',').map(s=>s.trim()).filter(Boolean)))
      if (image) form.append('image', image)
      await api.post('/recipes', form, { headers: { 'Content-Type':'multipart/form-data' }})
      alert('Recipe added!')
      location.href = '/browse'
    }catch(err){
      setError(err.response?.data?.message || 'Failed to add recipe')
    }
  }

  return (
    <div className="section" style={{maxWidth:720}}>
      <h2>Add Recipe</h2>
      {error && <div className="section" style={{color:'#fca5a5'}}>{error}</div>}
      <form onSubmit={onSubmit} className="card" style={{display:'grid', gap:12}}>
        <input placeholder='Title' value={title} onChange={e=>setTitle(e.target.value)} />
        <div className="row">
          <input placeholder='Prep Time (min)' value={prepTime} onChange={e=>setPrepTime(e.target.value)} />
          <input placeholder='Cook Time (min)' value={cookTime} onChange={e=>setCookTime(e.target.value)} />
          <input placeholder='Cuisine' value={cuisine} onChange={e=>setCuisine(e.target.value)} />
        </div>
        <textarea placeholder='Ingredients (one per line)' value={ingredients} onChange={e=>setIngredients(e.target.value)} />
        <textarea placeholder='Steps (one per line)' value={steps} onChange={e=>setSteps(e.target.value)} />
        <input placeholder='Tags (comma separated)' value={tags} onChange={e=>setTags(e.target.value)} />
        <input type='file' accept='image/*' onChange={e=>setImage(e.target.files[0])} />
        <div className="actions">
          <button type='submit'>Submit</button>
          <button type='button' className='secondary' onClick={()=>history.back()}>Cancel</button>
        </div>
      </form>
    </div>
  )
}
