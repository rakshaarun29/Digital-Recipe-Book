import dotenv from 'dotenv'
import mongoose from 'mongoose'
import User from '../models/User.js'
import Recipe from '../models/Recipe.js'
import connectDB from '../lib/db.js'

dotenv.config()

async function main(){
  try{
    await connectDB(process.env.MONGO_URI || 'mongodb://localhost:27017/reciperealm')

    // Clear
    await Recipe.deleteMany({})
    await User.deleteMany({})

    // Users
    const [u1,u2,u3] = await User.create([
      { name:'Raksha Arun', email:'raksha@example.com', password:'password' },
      { name:'Nyssa Bansal', email:'nyssa@example.com', password:'password' },
      { name:'Prachi Jalan', email:'prachi@example.com', password:'password' },
    ])

    // Recipes (diverse cuisines)
    const recipes = await Recipe.create([
      {
        title: 'Classic Paneer Butter Masala',
        ingredients: [
          '200g paneer cubes',
          '2 tbsp butter',
          '1 cup tomato puree',
          '1/2 cup cream',
          '1 tsp garam masala',
          'Salt to taste'
        ],
        steps: [
          'Saute paneer lightly in butter and set aside',
          'Cook tomato puree with spices',
          'Add cream and simmer',
          'Add paneer and finish with butter'
        ],
        prepTime: 15,
        cookTime: 25,
        cuisine: 'Indian',
        dietary: ['Veg'],
        imageUrl: '',
        tags: ['curry','paneer','dinner'],
        author: u1._id,
      },
      {
        title: 'Vegan Brownies',
        ingredients: [
          '1 cup flour',
          '1/2 cup cocoa powder',
          '1/2 cup sugar',
          '1/3 cup vegetable oil',
          '1 cup almond milk'
        ],
        steps: [
          'Mix dry ingredients',
          'Stir in wet ingredients',
          'Bake at 180C for 25 minutes'
        ],
        prepTime: 10,
        cookTime: 25,
        cuisine: 'Dessert',
        dietary: ['Vegan'],
        imageUrl: '',
        tags: ['dessert','vegan','baking'],
        author: u2._id,
      },
      {
        title: 'Quick Pesto Pasta',
        ingredients: [
          '200g pasta',
          '3 tbsp pesto',
          '2 tbsp olive oil',
          'Parmesan to serve'
        ],
        steps: [
          'Boil pasta',
          'Toss with pesto and olive oil',
          'Serve with parmesan'
        ],
        prepTime: 5,
        cookTime: 12,
        cuisine: 'Italian',
        dietary: ['Veg'],
        imageUrl: '',
        tags: ['quick','pasta','lunch'],
        author: u3._id,
      },
      {
        title: 'Masala Dosa',
        ingredients: ['dosa batter','potatoes','onion','mustard seeds','curry leaves','ghee'],
        steps: ['Cook masala','Spread dosa thin','Fill and fold'],
        prepTime: 20,
        cookTime: 15,
        cuisine: 'Indian',
        dietary: ['Veg','Gluten-Free'],
        imageUrl: '',
        tags: ['breakfast','south-indian','street-food'],
        author: u1._id,
      },
      {
        title: 'Chole Bhature',
        ingredients: ['chickpeas','onion','tomato','garam masala','flour','yogurt'],
        steps: ['Simmer spiced chole','Knead and fry bhature'],
        prepTime: 30,
        cookTime: 40,
        cuisine: 'Indian',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['punjabi','festive','rich'],
        author: u2._id,
      },
      {
        title: 'Palak Paneer',
        ingredients: ['spinach','paneer','garlic','ginger','garam masala','cream'],
        steps: ['Blanch spinach','Blend and cook with spices','Add paneer'],
        prepTime: 15,
        cookTime: 20,
        cuisine: 'Indian',
        dietary: ['Veg'],
        imageUrl: '',
        tags: ['healthy','iron-rich','curry'],
        author: u3._id,
      },
      {
        title: 'Samosa',
        ingredients: ['flour','potatoes','peas','spices','oil'],
        steps: ['Make dough','Fill with spiced potatoes','Deep fry until golden'],
        prepTime: 30,
        cookTime: 20,
        cuisine: 'Indian',
        dietary: ['Veg'],
        imageUrl: '',
        tags: ['snack','tea-time','street-food'],
        author: u1._id,
      },
      {
        title: 'Rajma Chawal',
        ingredients: ['kidney beans','onion','tomato','garam masala','rice'],
        steps: ['Pressure cook rajma','Simmer with masala','Serve with steamed rice'],
        prepTime: 15,
        cookTime: 35,
        cuisine: 'Indian',
        dietary: ['Veg','Gluten-Free'],
        imageUrl: '',
        tags: ['comfort','punjabi','home-style'],
        author: u2._id,
      },
      {
        title: 'Gulab Jamun',
        ingredients: ['khoya','flour','sugar','cardamom','ghee'],
        steps: ['Knead dough','Fry balls','Soak in sugar syrup'],
        prepTime: 20,
        cookTime: 25,
        cuisine: 'Indian',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['dessert','festival','sweet'],
        author: u3._id,
      },
      {
        title: 'Tacos al Pastor',
        ingredients: ['500g pork', 'pineapple', 'achiote paste', 'corn tortillas', 'onion', 'cilantro'],
        steps: ['Marinate pork with achiote', 'Grill with pineapple', 'Serve on tortillas with toppings'],
        prepTime: 30,
        cookTime: 45,
        cuisine: 'Mexican',
        dietary: [],
        imageUrl: '',
        tags: ['street-food','spicy','tacos'],
        author: u1._id,
      },
      {
        title: 'Chicken Teriyaki Bowl',
        ingredients: ['chicken thighs', 'soy sauce', 'mirin', 'sugar', 'rice', 'scallions'],
        steps: ['Make teriyaki sauce', 'Pan-fry chicken', 'Glaze with sauce', 'Serve over rice'],
        prepTime: 15,
        cookTime: 20,
        cuisine: 'Japanese',
        dietary: [],
        imageUrl: '',
        tags: ['bowl','quick-dinner'],
        author: u2._id,
      },
      {
        title: 'Thai Green Curry',
        ingredients: ['green curry paste', 'coconut milk', 'chicken or tofu', 'basil', 'eggplant'],
        steps: ['Simmer curry paste with coconut milk', 'Add protein and veg', 'Finish with basil'],
        prepTime: 15,
        cookTime: 20,
        cuisine: 'Thai',
        dietary: ['Gluten-Free'],
        imageUrl: '',
        tags: ['curry','spicy','comfort'],
        author: u3._id,
      },
      {
        title: 'Falafel Wraps',
        ingredients: ['chickpeas', 'parsley', 'garlic', 'cumin', 'tahini', 'pita'],
        steps: ['Blend chickpeas with herbs', 'Form balls and fry', 'Assemble in pita with tahini'],
        prepTime: 20,
        cookTime: 15,
        cuisine: 'Middle Eastern',
        dietary: ['Vegan'],
        imageUrl: '',
        tags: ['wrap','street-food','protein'],
        author: u1._id,
      },
      {
        title: 'Greek Salad',
        ingredients: ['tomato', 'cucumber', 'red onion', 'olives', 'feta', 'olive oil'],
        steps: ['Chop vegetables', 'Toss with olive oil and oregano', 'Top with feta'],
        prepTime: 10,
        cookTime: 0,
        cuisine: 'Mediterranean',
        dietary: ['Veg','Gluten-Free'],
        imageUrl: '',
        tags: ['salad','refreshing','no-cook'],
        author: u2._id,
      },
      {
        title: 'Shakshuka',
        ingredients: ['eggs', 'tomatoes', 'onion', 'bell pepper', 'paprika'],
        steps: ['Simmer spiced tomato sauce', 'Poach eggs in sauce', 'Serve with bread'],
        prepTime: 10,
        cookTime: 20,
        cuisine: 'North African',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['brunch','skillet','comfort'],
        author: u3._id,
      },
      {
        title: 'Bibimbap',
        ingredients: ['rice', 'spinach', 'carrot', 'zucchini', 'beef', 'gochujang', 'egg'],
        steps: ['Saute toppings', 'Assemble over rice', 'Top with egg and gochujang'],
        prepTime: 25,
        cookTime: 20,
        cuisine: 'Korean',
        dietary: [],
        imageUrl: '',
        tags: ['bowl','mixed','spicy'],
        author: u1._id,
      },
      {
        title: 'Paella Valenciana',
        ingredients: ['bomba rice', 'saffron', 'chicken', 'green beans', 'paprika', 'stock'],
        steps: ['Saute meats', 'Add rice and stock with saffron', 'Simmer without stirring'],
        prepTime: 20,
        cookTime: 40,
        cuisine: 'Spanish',
        dietary: [],
        imageUrl: '',
        tags: ['rice','weekend','sharing'],
        author: u2._id,
      },
      {
        title: 'Coq au Vin',
        ingredients: ['chicken', 'red wine', 'mushrooms', 'bacon', 'thyme'],
        steps: ['Marinate in wine', 'Brown and braise', 'Finish with mushrooms and bacon'],
        prepTime: 20,
        cookTime: 60,
        cuisine: 'French',
        dietary: [],
        imageUrl: '',
        tags: ['comfort','classic','stew'],
        author: u3._id,
      },
      {
        title: 'General Tso’s Cauliflower',
        ingredients: ['cauliflower florets', 'soy sauce', 'vinegar', 'chili', 'cornstarch'],
        steps: ['Crisp cauliflower', 'Toss in tangy-spicy sauce'],
        prepTime: 15,
        cookTime: 20,
        cuisine: 'Chinese',
        dietary: ['Veg'],
        imageUrl: '',
        tags: ['takeout-fakeaway','spicy','crispy'],
        author: u1._id,
      },
      {
        title: 'Avocado Toast with Poached Egg',
        ingredients: ['sourdough', 'avocado', 'egg', 'chili flakes', 'lemon'],
        steps: ['Toast bread', 'Mash avocado with lemon', 'Top with poached egg'],
        prepTime: 10,
        cookTime: 5,
        cuisine: 'American',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['breakfast','quick','brunch'],
        author: u2._id,
      },
      {
        title: 'Hummus Bowl',
        ingredients: ['chickpeas', 'tahini', 'garlic', 'lemon', 'olive oil', 'paprika'],
        steps: ['Blend all ingredients', 'Drizzle with olive oil', 'Garnish with paprika'],
        prepTime: 10,
        cookTime: 0,
        cuisine: 'Middle Eastern',
        dietary: ['Vegan','Gluten-Free'],
        imageUrl: '',
        tags: ['dip','snack','protein'],
        author: u3._id,
      },
      {
        title: 'Margherita Pizza',
        ingredients: ['pizza dough','tomato sauce','mozzarella','basil','olive oil','salt'],
        steps: ['Stretch dough','Top with sauce and cheese','Bake at high heat','Finish with basil'],
        prepTime: 15,
        cookTime: 12,
        cuisine: 'Italian',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['pizza','baking','classic'],
        author: u1._id,
      },
      {
        title: 'Pho Ga (Chicken Pho)',
        ingredients: ['chicken','rice noodles','ginger','onion','fish sauce','star anise','cinnamon'],
        steps: ['Simmer aromatic broth','Cook noodles','Assemble with herbs'],
        prepTime: 20,
        cookTime: 60,
        cuisine: 'Vietnamese',
        dietary: [],
        imageUrl: '',
        tags: ['soup','comfort','noodles'],
        author: u2._id,
      },
      {
        title: 'Pad Thai',
        ingredients: ['rice noodles','tamarind paste','fish sauce','tofu','egg','bean sprouts','peanuts'],
        steps: ['Soak noodles','Stir-fry sauce with tofu and egg','Toss noodles and sprouts','Top with peanuts'],
        prepTime: 15,
        cookTime: 12,
        cuisine: 'Thai',
        dietary: [],
        imageUrl: '',
        tags: ['noodles','street-food','sweet-savory'],
        author: u3._id,
      },
      {
        title: 'Sushi Veg Rolls',
        ingredients: ['sushi rice','nori','cucumber','avocado','carrot','soy sauce'],
        steps: ['Cook and season rice','Roll with fillings','Slice and serve'],
        prepTime: 25,
        cookTime: 10,
        cuisine: 'Japanese',
        dietary: ['Vegan','Gluten-Free'],
        imageUrl: '',
        tags: ['sushi','rolls','light'],
        author: u1._id,
      },
      {
        title: 'Nasi Goreng',
        ingredients: ['cooked rice','kecap manis','shallots','garlic','egg','prawns (optional)'],
        steps: ['Stir-fry aromatics','Add rice and sauce','Top with fried egg'],
        prepTime: 10,
        cookTime: 12,
        cuisine: 'Indonesian',
        dietary: [],
        imageUrl: '',
        tags: ['fried-rice','quick','street-food'],
        author: u2._id,
      },
      {
        title: 'Biryani (Veg)',
        ingredients: ['basmati rice','mixed vegetables','biryani masala','yogurt','fried onions','mint'],
        steps: ['Parboil rice','Layer with spiced veggies','Dum cook until aromatic'],
        prepTime: 25,
        cookTime: 35,
        cuisine: 'Indian',
        dietary: ['Veg'],
        imageUrl: '',
        tags: ['rice','celebration','spiced'],
        author: u3._id,
      },
      {
        title: 'Moroccan Chickpea Tagine',
        ingredients: ['chickpeas','apricots','onion','tomato','cinnamon','cumin','coriander'],
        steps: ['Saute aromatics','Simmer with spices and chickpeas','Finish with herbs'],
        prepTime: 15,
        cookTime: 30,
        cuisine: 'Moroccan',
        dietary: ['Vegan','Gluten-Free'],
        imageUrl: '',
        tags: ['stew','sweet-savory','one-pot'],
        author: u1._id,
      },
      {
        title: 'Ethiopian Doro Wat',
        ingredients: ['chicken','berbere spice','onions','clarified butter','eggs'],
        steps: ['Caramelize onions','Cook with berbere','Braise chicken','Serve with eggs'],
        prepTime: 20,
        cookTime: 50,
        cuisine: 'Ethiopian',
        dietary: [],
        imageUrl: '',
        tags: ['stew','spicy','injera-pair'],
        author: u2._id,
      },
      {
        title: 'Russian Borscht',
        ingredients: ['beets','cabbage','potato','carrot','onion','dill','sour cream'],
        steps: ['Simmer vegetables','Season and finish with dill','Serve with sour cream'],
        prepTime: 20,
        cookTime: 40,
        cuisine: 'Russian',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['soup','hearty','beetroot'],
        author: u3._id,
      },
      {
        title: 'Polish Pierogi (Cheese & Potato)',
        ingredients: ['flour','egg','water','potato','farmer’s cheese','onion','butter'],
        steps: ['Make dough','Fill and shape','Boil and pan-fry with butter and onions'],
        prepTime: 40,
        cookTime: 20,
        cuisine: 'Polish',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['dumplings','comfort','homestyle'],
        author: u1._id,
      },
      {
        title: 'Brazilian Feijoada',
        ingredients: ['black beans','pork','sausage','orange','bay leaves','garlic'],
        steps: ['Soak beans','Slow-cook with meats and aromatics'],
        prepTime: 20,
        cookTime: 120,
        cuisine: 'Brazilian',
        dietary: [],
        imageUrl: '',
        tags: ['stew','hearty','weekend'],
        author: u2._id,
      },
      {
        title: 'German Pretzels',
        ingredients: ['flour','yeast','water','baking soda','salt','butter'],
        steps: ['Make dough','Shape pretzels','Boil in baking soda water','Bake until brown'],
        prepTime: 30,
        cookTime: 15,
        cuisine: 'German',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['baking','snack','bread'],
        author: u3._id,
      },
      {
        title: 'British Veg Shepherd’s Pie',
        ingredients: ['lentils','carrots','peas','onion','tomato paste','mashed potatoes'],
        steps: ['Cook lentil filling','Top with mash','Bake until golden'],
        prepTime: 20,
        cookTime: 30,
        cuisine: 'British',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['casserole','comfort','bake'],
        author: u1._id,
      },
      {
        title: 'Turkish Menemen',
        ingredients: ['eggs','tomatoes','green peppers','olive oil','pepper flakes'],
        steps: ['Saute peppers and tomatoes','Scramble in eggs gently'],
        prepTime: 8,
        cookTime: 8,
        cuisine: 'Turkish',
        dietary: ['Vegetarian','Gluten-Free'],
        imageUrl: '',
        tags: ['breakfast','skillet','simple'],
        author: u2._id,
      },
      {
        title: 'Caesar Salad (No Anchovy)',
        ingredients: ['romaine','croutons','parmesan','lemon','garlic','olive oil','mustard'],
        steps: ['Whisk dressing','Toss with romaine and toppings'],
        prepTime: 10,
        cookTime: 0,
        cuisine: 'American',
        dietary: ['Vegetarian'],
        imageUrl: '',
        tags: ['salad','classic','quick'],
        author: u3._id,
      },
    ])

    // Keep only Indian, Mexican, American, Italian cuisines for privacy-focused catalog
    const allowed = ['Indian','Mexican','American','Italian']
    // Replace with curated beginner-friendly set
    await Recipe.deleteMany({})

    const cap = (s)=> s.charAt(0).toUpperCase() + s.slice(1)

    const curated = [
      // Indian
      {
        title: 'Paneer Butter Masala',
        ingredients: [
          'Paneer (200g, Cubed)', 'Butter (2 Tbsp)', 'Onion (1, Chopped)', 'Tomato Puree (1 Cup)', 'Fresh Cream (1/2 Cup)', 'Garam Masala (1 Tsp)', 'Sugar (1/2 Tsp)', 'Salt (To Taste)'
        ],
        steps: [
          'Melt butter and sauté onion until soft.',
          'Add tomato puree, garam masala, sugar, and salt. Cook 5–7 minutes.',
          'Stir in cream and simmer 2 minutes on low heat.',
          'Add paneer cubes and gently mix. Cook 2 minutes and turn off heat.',
          'Rest for 2 minutes and serve hot with naan or rice.'
        ],
        prepTime: 10, cookTime: 20, cuisine: 'Indian', dietary: ['Veg'], tags: ['Curry','Dinner'], imageUrl: '', author: u1._id
      },
      {
        title: 'Masala Dosa',
        ingredients: [
          'Dosa Batter (2 Cups)', 'Potatoes (3, Boiled & Mashed)', 'Onion (1, Sliced)', 'Mustard Seeds (1/2 Tsp)', 'Curry Leaves (6–8)', 'Turmeric (1/4 Tsp)', 'Ghee/Oil (2 Tbsp)', 'Salt (To Taste)'
        ],
        steps: [
          'Heat oil, splutter mustard seeds and curry leaves. Add onion and turmeric; sauté 2 minutes.',
          'Add mashed potatoes and salt; mix well for the masala filling.',
          'Spread dosa batter thin on a hot pan, drizzle ghee, and cook until crisp.',
          'Place filling on one side, fold, and serve hot with chutney.'
        ],
        prepTime: 15, cookTime: 15, cuisine: 'Indian', dietary: ['Veg','Gluten-Free'], tags: ['Breakfast','South Indian'], imageUrl: '', author: u2._id
      },
      {
        title: 'Rajma Chawal',
        ingredients: [
          'Kidney Beans (1 Cup, Soaked Overnight)', 'Onion (1, Chopped)', 'Tomato (2, Pureed)', 'Ginger-Garlic Paste (1 Tsp)', 'Garam Masala (1 Tsp)', 'Oil (2 Tbsp)', 'Salt (To Taste)', 'Cooked Rice (2 Cups)'
        ],
        steps: [
          'Pressure cook soaked rajma until soft.',
          'Sauté onion in oil, add ginger-garlic paste and tomato puree; cook 5 minutes.',
          'Add spices and rajma with some water; simmer 10 minutes.',
          'Serve hot with steamed rice.'
        ],
        prepTime: 10, cookTime: 35, cuisine: 'Indian', dietary: ['Veg','Gluten-Free'], tags: ['Comfort','Home Style'], imageUrl: '', author: u3._id
      },
      // Mexican
      {
        title: 'Tacos Al Pastor (Quick)',
        ingredients: [
          'Pork (500g, Thin Strips)', 'Achiote Paste (1 Tbsp)', 'Pineapple (1/2 Cup, Chopped)', 'Onion (1/2, Chopped)', 'Cilantro (2 Tbsp, Chopped)', 'Corn Tortillas (8)', 'Salt (To Taste)'
        ],
        steps: [
          'Marinate pork with achiote and salt for 10 minutes.',
          'Sear pork on high heat until browned; add pineapple for 1 minute.',
          'Warm tortillas and fill with pork, onion, and cilantro.'
        ],
        prepTime: 10, cookTime: 15, cuisine: 'Mexican', dietary: [], tags: ['Street Food','Tacos'], imageUrl: '', author: u1._id
      },
      {
        title: 'Guacamole',
        ingredients: [
          'Avocado (2, Ripe)', 'Lime Juice (1 Tbsp)', 'Onion (2 Tbsp, Finely Chopped)', 'Tomato (2 Tbsp, Diced)', 'Cilantro (1 Tbsp, Chopped)', 'Salt (To Taste)'
        ],
        steps: [
          'Mash avocados in a bowl.',
          'Stir in lime juice, onion, tomato, cilantro, and salt.',
          'Taste and adjust salt and lime.'
        ],
        prepTime: 8, cookTime: 0, cuisine: 'Mexican', dietary: ['Vegan','Gluten-Free'], tags: ['Dip','Snack'], imageUrl: '', author: u2._id
      },
      {
        title: 'Chicken Quesadilla',
        ingredients: [
          'Tortillas (4)', 'Cooked Shredded Chicken (1 Cup)', 'Cheddar (1 Cup, Shredded)', 'Onion (2 Tbsp, Chopped)', 'Oil/Butter (1 Tbsp)'
        ],
        steps: [
          'Heat tortilla in pan, add chicken, onion, and cheese on half side.',
          'Fold and cook both sides until cheese melts and tortilla is golden.',
          'Slice and serve with salsa.'
        ],
        prepTime: 5, cookTime: 8, cuisine: 'Mexican', dietary: [], tags: ['Quick','Snack'], imageUrl: '', author: u3._id
      },
      // American
      {
        title: 'Mac And Cheese (Stovetop)',
        ingredients: [
          'Macaroni (2 Cups)', 'Butter (2 Tbsp)', 'Flour (2 Tbsp)', 'Milk (2 Cups)', 'Cheddar (2 Cups, Shredded)', 'Salt & Pepper (To Taste)'
        ],
        steps: [
          'Boil macaroni until al dente; drain.',
          'Melt butter, whisk in flour for 1 minute; slowly add milk to make a smooth sauce.',
          'Stir in cheese off heat until melted. Season.',
          'Combine with macaroni and serve hot.'
        ],
        prepTime: 10, cookTime: 15, cuisine: 'American', dietary: ['Vegetarian'], tags: ['Comfort','Pasta'], imageUrl: '', author: u1._id
      },
      {
        title: 'Classic Cheeseburger',
        ingredients: [
          'Beef Patty (150g)', 'Salt & Pepper (To Taste)', 'Cheese Slice (1)', 'Burger Bun (1, Toasted)', 'Lettuce (2 Leaves)', 'Tomato (2 Slices)', 'Onion (2 Rings)'
        ],
        steps: [
          'Season patty and cook on medium-high 3–4 minutes per side.',
          'Top with cheese to melt.',
          'Assemble bun with lettuce, tomato, onion, and patty.'
        ],
        prepTime: 5, cookTime: 10, cuisine: 'American', dietary: [], tags: ['Grill','Fast Food'], imageUrl: '', author: u2._id
      },
      {
        title: 'Pancakes',
        ingredients: [
          'Flour (1 Cup)', 'Sugar (1 Tbsp)', 'Baking Powder (1 Tsp)', 'Milk (3/4 Cup)', 'Egg (1)', 'Butter (1 Tbsp, Melted)', 'Salt (Pinch)'
        ],
        steps: [
          'Whisk dry ingredients, then add milk, egg, and butter; mix gently.',
          'Cook small ladles on a non-stick pan until bubbles form; flip and cook 1 minute.',
          'Serve warm with syrup.'
        ],
        prepTime: 5, cookTime: 10, cuisine: 'American', dietary: ['Vegetarian'], tags: ['Breakfast','Easy'], imageUrl: '', author: u3._id
      },
      // Italian
      {
        title: 'Margherita Pizza (Easy)',
        ingredients: [
          'Pizza Dough (1 Ball)', 'Tomato Sauce (1/2 Cup)', 'Mozzarella (150g, Sliced)', 'Basil (Handful)', 'Olive Oil (1 Tbsp)', 'Salt (Pinch)'
        ],
        steps: [
          'Stretch dough on a tray. Spread sauce thinly.',
          'Add mozzarella and a pinch of salt. Bake hot until crust is golden.',
          'Finish with basil and a drizzle of olive oil.'
        ],
        prepTime: 10, cookTime: 12, cuisine: 'Italian', dietary: ['Vegetarian'], tags: ['Pizza','Classic'], imageUrl: '', author: u1._id
      },
      {
        title: 'Spaghetti Aglio E Olio',
        ingredients: [
          'Spaghetti (200g)', 'Garlic (4 Cloves, Sliced)', 'Olive Oil (4 Tbsp)', 'Chili Flakes (1/2 Tsp)', 'Parsley (1 Tbsp, Chopped)', 'Salt (To Taste)'
        ],
        steps: [
          'Boil spaghetti in salted water; reserve some pasta water.',
          'Gently cook garlic in olive oil; add chili flakes.',
          'Toss spaghetti with oil and some pasta water; finish with parsley and salt.'
        ],
        prepTime: 5, cookTime: 12, cuisine: 'Italian', dietary: ['Vegetarian'], tags: ['Pasta','Quick'], imageUrl: '', author: u2._id
      },
      {
        title: 'Bruschetta',
        ingredients: [
          'Baguette (1, Sliced)', 'Tomatoes (2, Diced)', 'Basil (1 Tbsp, Chopped)', 'Garlic (1 Clove, Minced)', 'Olive Oil (1 Tbsp)', 'Salt (Pinch)'
        ],
        steps: [
          'Toast baguette slices.',
          'Mix tomatoes, basil, garlic, olive oil, and salt.',
          'Top toasts and serve immediately.'
        ],
        prepTime: 8, cookTime: 8, cuisine: 'Italian', dietary: ['Vegetarian'], tags: ['Starter','Light'], imageUrl: '', author: u3._id
      }
      ,
      // Additional curated recipes to expand catalog (Indian, Mexican, American, Italian)
      // Indian
      { title:'Chana Masala', ingredients:['Chickpeas (2 Cups, Cooked)','Onion (1, Chopped)','Tomato (2, Pureed)','Ginger-Garlic (1 Tsp)','Chana Masala (1 Tsp)','Oil (1 Tbsp)','Salt (To Taste)'], steps:['Heat oil and sauté onion 2–3 min.','Add ginger-garlic and tomato; cook 5 min.','Stir in spices and chickpeas with 1/2 cup water; simmer 10 min.','Serve with rice or roti.'], prepTime:10, cookTime:20, cuisine:'Indian', dietary:['Vegan','Gluten-Free'], tags:['Curry','Everyday'], imageUrl:'', author:u1._id },
      { title:'Aloo Paratha', ingredients:['Wheat Flour (2 Cups)','Potatoes (3, Boiled & Mashed)','Green Chili (1, Chopped)','Coriander (2 Tbsp)','Garam Masala (1/2 Tsp)','Ghee/Oil (As Needed)','Salt (To Taste)'], steps:['Knead dough; rest 10 min.','Mix potato with spices and herbs.','Stuff, roll gently, and roast on tawa with ghee until golden.'], prepTime:15, cookTime:15, cuisine:'Indian', dietary:['Vegetarian'], tags:['Breakfast','Stuffed Flatbread'], imageUrl:'', author:u2._id },
      { title:'Chicken Tikka (Stovetop)', ingredients:['Chicken (500g, Cubes)','Yogurt (1/2 Cup)','Ginger-Garlic Paste (1 Tbsp)','Red Chili (1 Tsp)','Garam Masala (1 Tsp)','Oil (1 Tbsp)','Salt (To Taste)'], steps:['Marinate chicken 20 min.','Pan-sear on medium-high until cooked and lightly charred.','Squeeze lemon and serve.'], prepTime:20, cookTime:15, cuisine:'Indian', dietary:[], tags:['Starter','Grill-Style'], imageUrl:'', author:u3._id },
      { title:'Jeera Rice', ingredients:['Basmati Rice (1.5 Cups)','Cumin Seeds (1 Tsp)','Ghee (1 Tbsp)','Bay Leaf (1)','Salt (To Taste)'], steps:['Rinse rice and soak 15 min.','Temper cumin in ghee; add rice, water, salt.','Cook until fluffy; rest 5 min.'], prepTime:5, cookTime:15, cuisine:'Indian', dietary:['Vegetarian','Gluten-Free'], tags:['Side','Rice'], imageUrl:'', author:u1._id },
      // Mexican
      { title:'Salsa Roja', ingredients:['Tomatoes (4)','Onion (1/4)','Garlic (1 Clove)','Jalapeño (1)','Cilantro (2 Tbsp)','Lime (1 Tbsp)','Salt (To Taste)'], steps:['Blend roasted tomatoes, onion, garlic, jalapeño.','Stir in cilantro, lime, and salt.'], prepTime:10, cookTime:5, cuisine:'Mexican', dietary:['Vegan','Gluten-Free'], tags:['Dip','Tacos'], imageUrl:'', author:u2._id },
      { title:'Chicken Enchiladas', ingredients:['Tortillas (8)','Shredded Chicken (2 Cups)','Enchilada Sauce (1.5 Cups)','Cheese (1 Cup)','Onion (1/4, Chopped)'], steps:['Fill tortillas with chicken and onion.','Roll, place in tray, pour sauce, top with cheese.','Bake 15 min until bubbly.'], prepTime:10, cookTime:20, cuisine:'Mexican', dietary:[], tags:['Baked','Comfort'], imageUrl:'', author:u3._id },
      { title:'Elote (Mexican Street Corn)', ingredients:['Corn (4 Ears)','Mayonnaise (3 Tbsp)','Cotija/Cheese (1/4 Cup)','Chili Powder (1/2 Tsp)','Lime (Wedges)','Salt (Pinch)'], steps:['Grill corn until charred.','Brush with mayo, sprinkle cheese and chili.','Serve with lime.'], prepTime:5, cookTime:12, cuisine:'Mexican', dietary:['Vegetarian'], tags:['Snack','Street Food'], imageUrl:'', author:u1._id },
      { title:'Burrito Bowl', ingredients:['Rice (2 Cups, Cooked)','Black Beans (1 Cup)','Chicken/Tofu (1 Cup)','Corn (1/2 Cup)','Salsa (1/2 Cup)','Lettuce (1 Cup)','Sour Cream (2 Tbsp)'], steps:['Layer rice, beans, protein, corn.','Top with salsa, lettuce, and cream.'], prepTime:10, cookTime:10, cuisine:'Mexican', dietary:[], tags:['Bowl','Quick'], imageUrl:'', author:u2._id },
      // American
      { title:'Grilled Cheese Sandwich', ingredients:['Bread (4 Slices)','Cheddar (4 Slices)','Butter (2 Tbsp)'], steps:['Butter bread, add cheese.','Grill on medium until golden and melty.'], prepTime:3, cookTime:6, cuisine:'American', dietary:['Vegetarian'], tags:['Snack','Quick'], imageUrl:'', author:u3._id },
      { title:'Buffalo Wings', ingredients:['Chicken Wings (700g)','Hot Sauce (1/3 Cup)','Butter (2 Tbsp)','Flour (1/3 Cup)','Salt & Pepper'], steps:['Coat wings with flour, season, and bake/air-fry until crisp.','Toss in melted butter + hot sauce.'], prepTime:10, cookTime:30, cuisine:'American', dietary:[], tags:['Game Day','Spicy'], imageUrl:'', author:u1._id },
      { title:'Cobb Salad', ingredients:['Lettuce (4 Cups)','Chicken (1 Cup, Cooked)','Egg (2, Boiled)','Avocado (1)','Tomato (1)','Bacon (Optional)','Dressing (3 Tbsp)'], steps:['Arrange chopped ingredients.','Drizzle dressing before serving.'], prepTime:12, cookTime:0, cuisine:'American', dietary:[], tags:['Salad','Protein'], imageUrl:'', author:u2._id },
      { title:'New York Cheesecake (Easy No-Bake)', ingredients:['Cream Cheese (400g)','Sugar (1/3 Cup)','Whipping Cream (1 Cup)','Biscuits (200g, Crushed)','Butter (3 Tbsp)'], steps:['Press biscuit + butter base.','Whip cream cheese with sugar; fold in whipped cream.','Chill 6 hours.'], prepTime:20, cookTime:0, cuisine:'American', dietary:['Vegetarian'], tags:['Dessert','No-Bake'], imageUrl:'', author:u3._id },
      // Italian
      { title:'Pasta Alfredo', ingredients:['Fettuccine (200g)','Butter (2 Tbsp)','Cream (1 Cup)','Parmesan (3/4 Cup)','Garlic (1 Clove)','Salt & Pepper'], steps:['Cook pasta.','Simmer butter, cream, garlic 2–3 min; stir in parmesan.','Toss pasta; season.'], prepTime:8, cookTime:12, cuisine:'Italian', dietary:['Vegetarian'], tags:['Creamy','Pasta'], imageUrl:'', author:u1._id },
      { title:'Minestrone Soup', ingredients:['Olive Oil (1 Tbsp)','Onion (1/2)','Carrot (1)','Celery (1)','Tomato (1 Cup, Chopped)','Beans (1 Cup)','Pasta (1/2 Cup)','Stock (4 Cups)'], steps:['Sauté veg 3–4 min.','Add tomato and stock; simmer 10 min.','Add beans and pasta; cook until tender.'], prepTime:10, cookTime:20, cuisine:'Italian', dietary:['Vegetarian'], tags:['Soup','Hearty'], imageUrl:'', author:u2._id },
      { title:'Caprese Salad', ingredients:['Tomatoes (2)','Mozzarella (150g)','Basil (Handful)','Olive Oil (1 Tbsp)','Balsamic (1 Tsp)','Salt'], steps:['Slice tomatoes and mozzarella.','Layer with basil; drizzle oil and balsamic; season.'], prepTime:6, cookTime:0, cuisine:'Italian', dietary:['Vegetarian','Gluten-Free'], tags:['Salad','Fresh'], imageUrl:'', author:u3._id },
      { title:'Chicken Parmesan', ingredients:['Chicken Breast (2)','Flour (1/4 Cup)','Egg (1)','Breadcrumbs (1/2 Cup)','Marinara (1 Cup)','Mozzarella (1/2 Cup)'], steps:['Bread chicken and pan-fry until golden.','Top with marinara and mozzarella; bake 10 min.'], prepTime:12, cookTime:20, cuisine:'Italian', dietary:[], tags:['Baked','Comfort'], imageUrl:'', author:u1._id },
      // Extra to reach +20
      { title:'Vegetable Pulao', ingredients:['Basmati Rice (1.5 Cups)','Mixed Veg (2 Cups)','Whole Spices (Bay/Clove/Cinnamon)','Ghee (1 Tbsp)','Salt'], steps:['Rinse rice; sauté whole spices in ghee.','Add veg, rice, water, salt; cook until fluffy.'], prepTime:8, cookTime:18, cuisine:'Indian', dietary:['Vegetarian','Gluten-Free'], tags:['Rice','One-Pot'], imageUrl:'', author:u2._id },
      { title:'Chiles Rellenos (Cheese)', ingredients:['Poblano Peppers (4)','Cheese (1 Cup)','Eggs (2, Separated)','Flour (1/3 Cup)','Tomato Sauce (1 Cup)'], steps:['Roast and peel peppers; stuff with cheese.','Coat in flour, dip in egg batter; shallow-fry.','Serve with warm tomato sauce.'], prepTime:15, cookTime:20, cuisine:'Mexican', dietary:['Vegetarian'], tags:['Stuffed','Fried'], imageUrl:'', author:u3._id },
      { title:'Sloppy Joes', ingredients:['Ground Beef (500g)','Onion (1/2)','Ketchup (1/2 Cup)','Worcestershire (1 Tbsp)','Brown Sugar (1 Tbsp)','Buns (4)'], steps:['Brown beef with onion; drain.','Stir in sauce; simmer 8–10 min.','Serve on toasted buns.'], prepTime:5, cookTime:15, cuisine:'American', dietary:[], tags:['Sandwich','Weeknight'], imageUrl:'', author:u1._id },
      { title:'Tiramisu (Easy)', ingredients:['Ladyfingers (200g)','Espresso (1 Cup)','Mascarpone (250g)','Cream (1 Cup)','Sugar (1/3 Cup)','Cocoa (For Dusting)'], steps:['Whip mascarpone, cream, sugar until thick.','Dip ladyfingers in espresso; layer with cream.','Chill 4 hours; dust cocoa.'], prepTime:20, cookTime:0, cuisine:'Italian', dietary:['Vegetarian'], tags:['Dessert','No-Bake'], imageUrl:'', author:u2._id }
    ]

    // Auto-generate extra beginner-friendly recipes so Browse has many pages
    // Names are clean recipe names (no numbering like "Night 1 / 2"), with extra focus on Indian dishes.
    const makeExtraRecipes = () => {
      const extras = []
      const authorCycle = [u1._id, u2._id, u3._id]

      const baseSteps = [
        'Prep: Chop all vegetables and measure spices before you start cooking.',
        'Heat a pan with oil or butter on medium heat.',
        'Cook onions/garlic or other aromatics until fragrant, then add the main ingredients.',
        'Simmer and stir for 10–15 minutes until everything is cooked and flavors blend.',
        'Taste, adjust salt and spices, and serve warm.'
      ]

      const cuisines = [
        {
          cuisine: 'Indian',
          titles: [
            'Simple Dal Tadka',
            'Homestyle Potato Curry',
            'Quick Vegetable Sabzi',
            'Everyday Mixed Dal',
            'Easy Curd Rice',
            'Masala Fried Rice',
            'Paneer Bhurji',
            'Lemon Rice',
            'Curd-Based Kadhi',
            'Tomato Rasam',
            'Simple Egg Curry',
            'Stuffed Capsicum',
            'Bhindi Fry',
            'Cabbage Stir Fry',
            'Aloo Matar',
            'Jeera Aloo',
            'Veg Pulao',
            'Plain Paratha With Subzi',
            'Soft Phulka With Dal',
            'Ghee Rice'
          ],
          ingredients: [
            'Onion (1, Chopped)',
            'Tomato (1, Chopped)',
            'Ginger-Garlic Paste (1 Tsp)',
            'Basic Spice Mix (1 Tsp)',
            'Oil (1 Tbsp)',
            'Salt (To Taste)'
          ],
          dietary: ['Veg'],
          tags: ['Indian Home Food','Simple']
        },
        {
          cuisine: 'Mexican',
          titles: [
            'Bean And Rice Burrito',
            'Simple Chicken Taco Filling',
            'Cheesy Nacho Bake',
            'Veg Fajita Mix',
            'Easy Mexican Rice',
            'Simple Bean Chili'
          ],
          ingredients: [
            'Rice Or Tortillas',
            'Beans (1 Cup)',
            'Onion (1/2, Chopped)',
            'Tomato Or Salsa (1/2 Cup)',
            'Cheese (1/4 Cup)',
            'Salt & Spice Mix (To Taste)'
          ],
          dietary: [],
          tags: ['Mexican','Weeknight']
        },
        {
          cuisine: 'American',
          titles: [
            'Skillet Potato Hash',
            'One-Pan Veg And Sausage Bake',
            'Simple Chicken Skillet Dinner',
            'Creamy Veggie Pasta',
            'Easy Tomato Soup Bowl',
            'Garlic Butter Roasted Veg'
          ],
          ingredients: [
            'Potatoes Or Pasta',
            'Mixed Vegetables (1 Cup)',
            'Butter/Oil (1 Tbsp)',
            'Garlic (1 Clove, Minced)',
            'Herbs (1 Tsp)',
            'Salt & Pepper (To Taste)'
          ],
          dietary: ['Vegetarian'],
          tags: ['Comfort','One Pan']
        },
        {
          cuisine: 'Italian',
          titles: [
            'Tomato Basil Pasta',
            'Creamy Garlic Mushroom Pasta',
            'Veggie Tomato Penne',
            'Olive Oil And Herb Spaghetti',
            'Simple Tomato Bruschetta Mix',
            'Italian Vegetable Soup'
          ],
          ingredients: [
            'Pasta Or Bread',
            'Olive Oil (2 Tbsp)',
            'Garlic (2 Cloves, Sliced)',
            'Tomato (1, Diced)',
            'Basil Or Italian Herbs',
            'Salt (To Taste)'
          ],
          dietary: ['Vegetarian'],
          tags: ['Italian','Weeknight']
        }
      ]

      cuisines.forEach((cfg, cfgIndex) => {
        cfg.titles.forEach((title, i) => {
          const author = authorCycle[(cfgIndex + i) % authorCycle.length]
          extras.push({
            title,
            ingredients: cfg.ingredients,
            steps: baseSteps,
            prepTime: 10,
            cookTime: 20,
            cuisine: cfg.cuisine,
            dietary: cfg.dietary,
            tags: cfg.tags,
            imageUrl: '',
            author
          })
        })
      })

      return extras
    }

    const extraRecipes = makeExtraRecipes()

    await Recipe.create([...curated, ...extraRecipes])

    // Assign thumbnails for all remaining recipes (picsum.photos by deterministic seed)
    const remaining = await Recipe.find({})
    await Promise.all(remaining.map(async (r) => {
      if (!r.imageUrl) {
        const seed = encodeURIComponent(`${r.cuisine}-${r.title}-${r._id}`)
        r.imageUrl = `https://picsum.photos/seed/${seed}/800/600`
        await r.save()
      }
    }))

    // Enhance steps for clarity across all recipes
    const clarify = (rec) => {
      const ingSample = (rec.ingredients || []).slice(0, 3).join(', ')
      const prep = rec.prepTime ? `${rec.prepTime} min` : 'a few minutes'
      const cook = rec.cookTime ? `${rec.cookTime} min` : 'until done'
      return [
        `Prep: Gather all ingredients (${ingSample}${(rec.ingredients||[]).length>3 ? ', ...' : ''}) and read the full recipe before starting.`,
        `Mise en place: Wash, peel, and chop vegetables/proteins as needed. Measure spices and liquids. Set a pan/pot on medium heat.`,
        `Cook base: Start with aromatics (onion/garlic/ginger if applicable). Saute until fragrant, then add spices/sauces.`,
        `Main cook: Add the core ingredients and cook on medium. Stir occasionally and adjust seasoning. Aim for desired texture; typical cook time is ${cook}.`,
        `Finish & serve: Turn off heat, add garnishes (herbs, cream, cheese, lemon) as appropriate. Rest 2 minutes, then serve hot.`
      ]
    }

    for (const rec of await Recipe.find({})) {
      try {
        rec.steps = clarify(rec)
        await rec.save()
      } catch {}
    }

    // Likes/ratings example on a fresh document
    const sample = await Recipe.findOne({})
    if (sample) {
      sample.likes = sample.likes || []
      sample.ratings = sample.ratings || []
      sample.likes.push(u2._id)
      sample.ratings.push({ user: u2._id, stars: 5, comment: 'Delicious!' })
      await sample.save()
    }

    const totalNow = await Recipe.countDocuments()
    console.log('Seed completed:', { users: 3, recipes: totalNow })
    process.exit(0)
  }catch(err){
    console.error(err)
    process.exit(1)
  }
}

main()
