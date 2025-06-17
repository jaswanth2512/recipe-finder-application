// Direct mapping of recipe names to specific data
export const recipeMapping = {
  "Truffle Infused Mushroom Risotto": {
    image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=600&h=400&fit=crop&auto=format",
    ingredients: ["2 cups Arborio rice", "4 cups mushroom stock", "1 cup wild mushrooms", "1/2 cup white wine", "1 onion diced", "3 cloves garlic", "1/4 cup truffle oil", "1/2 cup Parmesan", "2 tbsp butter"],
    cookingTime: 45,
    chef: "Chef Marco Rossi",
    description: "Luxurious Italian risotto with wild mushrooms and aromatic truffle oil."
  },

  "Mediterranean Grilled Octopus": {
    image: "https://images.unsplash.com/photo-1559847844-d721426d6edc?w=600&h=400&fit=crop&auto=format",
    ingredients: ["2 lbs fresh octopus", "1/4 cup olive oil", "3 lemons juiced", "2 tbsp oregano", "4 cloves garlic", "1 red onion", "1/2 cup olives", "2 tomatoes"],
    cookingTime: 90,
    chef: "Chef Dimitri Kostas",
    description: "Tender grilled octopus with Mediterranean herbs, olive oil, and lemon."
  },

  "Caramelized Onion Tart": {
    image: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&h=400&fit=crop&auto=format",
    ingredients: ["1 sheet puff pastry", "4 large onions", "4 oz goat cheese", "3 eggs", "1/2 cup cream", "2 tbsp thyme", "1 tbsp brown sugar"],
    cookingTime: 60,
    chef: "Chef Sophie Laurent",
    description: "Rustic French tart with sweet caramelized onions and goat cheese."
  },

  "Szechuan Chili Crisp Noodles": {
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&h=400&fit=crop&auto=format",
    ingredients: ["1 lb fresh noodles", "3 tbsp chili crisp", "2 tbsp soy sauce", "1 tbsp black vinegar", "4 cloves garlic", "2 tbsp sesame oil", "3 green onions"],
    cookingTime: 15,
    chef: "Chef Li Wei",
    description: "Fiery Szechuan noodles with numbing peppercorns and chili crisp."
  },

  "Herb Crusted Rack of Lamb": {
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=600&h=400&fit=crop&auto=format",
    ingredients: ["2 lamb racks", "1 cup breadcrumbs", "3 tbsp rosemary", "3 tbsp thyme", "4 cloves garlic", "3 tbsp Dijon mustard", "3 tbsp olive oil"],
    cookingTime: 25,
    chef: "Chef Antoine Beaumont",
    description: "Elegant French rack of lamb with aromatic herb crust."
  },

  "Miso Glazed Eggplant": {
    image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?w=600&h=400&fit=crop&auto=format",
    ingredients: ["2 large eggplants", "3 tbsp white miso", "2 tbsp mirin", "2 tbsp sake", "1 tbsp sugar", "1 tbsp ginger", "1 tbsp sesame seeds"],
    cookingTime: 30,
    chef: "Chef Yuki Tanaka",
    description: "Japanese-style eggplant glazed with sweet and savory miso sauce."
  },

  "Lemon Basil Sorbet": {
    image: "https://images.unsplash.com/photo-1488900128323-21503983a07e?w=600&h=400&fit=crop&auto=format",
    ingredients: ["6 fresh lemons", "1 cup sugar", "2 cups water", "1/4 cup fresh basil", "1 tbsp lemon zest", "Pinch of salt"],
    cookingTime: 30,
    chef: "Chef Isabella Martinez",
    description: "Refreshing citrus sorbet with aromatic fresh basil."
  },

  "Korean Spicy Tofu Stew": {
    image: "https://images.unsplash.com/photo-1498654896293-37aacf113fd9?w=600&h=400&fit=crop&auto=format",
    ingredients: ["1 package soft tofu", "1 cup kimchi", "2 tbsp gochujang", "1 onion", "4 cloves garlic", "3 green onions", "1 cup mushrooms", "2 eggs"],
    cookingTime: 20,
    chef: "Chef Park Min-jung",
    description: "Comforting Korean soft tofu stew with kimchi and gochujang."
  },

  "Argentinian Chimichurri Steak": {
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
    ingredients: ["2 lbs ribeye steak", "1 cup parsley", "1/2 cup cilantro", "6 cloves garlic", "1/4 cup red wine vinegar", "1/2 cup olive oil", "1 tsp red pepper flakes"],
    cookingTime: 20,
    chef: "Chef Diego Morales",
    description: "Perfectly grilled Argentine steak with fresh chimichurri sauce."
  },

  "Persian Jeweled Rice": {
    image: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=600&h=400&fit=crop&auto=format",
    ingredients: ["2 cups basmati rice", "1/2 tsp saffron", "1/4 cup barberries", "1/4 cup almonds", "1/4 cup pistachios", "2 tbsp orange peel", "1 tsp cinnamon"],
    cookingTime: 45,
    chef: "Chef Reza Hosseini",
    description: "Festive Persian rice with colorful dried fruits and nuts."
  },

  "Thai Green Curry": {
    image: "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=600&h=400&fit=crop&auto=format",
    ingredients: ["1 lb chicken thigh", "2 cans coconut milk", "3 tbsp green curry paste", "1 Thai eggplant", "1 bell pepper", "1/4 cup Thai basil", "6 bamboo shoots"],
    cookingTime: 30,
    chef: "Chef Siriporn Tanaka",
    description: "Authentic Thai green curry with tender chicken and vegetables."
  },

  "French Ratatouille": {
    image: "https://images.unsplash.com/photo-1572441713132-51c75654db73?w=600&h=400&fit=crop&auto=format",
    ingredients: ["1 large eggplant", "2 zucchini", "2 bell peppers", "4 tomatoes", "1 onion", "4 cloves garlic", "2 tbsp thyme", "2 tbsp basil", "1/4 cup olive oil"],
    cookingTime: 60,
    chef: "Chef Pierre Dubois",
    description: "Classic Provençal vegetable stew with aromatic herbs."
  },

  "Japanese Matcha Cheesecake": {
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=600&h=400&fit=crop&auto=format",
    ingredients: ["8 oz cream cheese", "3 large eggs", "2 tbsp matcha powder", "1/3 cup sugar", "2 tbsp flour", "1/3 cup milk", "2 tbsp butter", "1 tsp vanilla"],
    cookingTime: 60,
    chef: "Chef Yuki Tanaka",
    description: "Light and fluffy Japanese-style cheesecake infused with matcha."
  },

  "Moroccan Tagine": {
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=600&h=400&fit=crop&auto=format",
    ingredients: ["3 lbs chicken thighs", "1 cup dried apricots", "1/2 cup green olives", "1/4 cup almonds", "2 tsp cinnamon", "2 tsp ginger", "1/2 tsp saffron", "2 onions"],
    cookingTime: 90,
    chef: "Chef Fatima Al-Zahra",
    description: "Aromatic Moroccan stew with tender chicken and dried fruits."
  },

  "Cajun Blackened Salmon": {
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&h=400&fit=crop&auto=format",
    ingredients: ["4 salmon fillets", "2 tbsp paprika", "1 tbsp garlic powder", "1 tbsp oregano", "1 tbsp thyme", "1 tsp cayenne", "1 tsp black pepper", "3 tbsp butter"],
    cookingTime: 15,
    chef: "Chef Marcus Johnson",
    description: "Spicy Cajun-seasoned salmon with perfectly blackened crust."
  },

  "Italian Osso Buco": {
    image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=600&h=400&fit=crop&auto=format",
    ingredients: ["4 veal shanks", "1 cup white wine", "2 cups tomatoes", "2 carrots", "2 celery stalks", "1 onion", "1/4 cup gremolata", "2 cups beef stock"],
    cookingTime: 120,
    chef: "Chef Giuseppe Verdi",
    description: "Traditional Milanese braised veal shanks in rich tomato sauce."
  },

  "Vietnamese Pho": {
    image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&h=400&fit=crop&auto=format",
    ingredients: ["2 lbs beef bones", "1 lb rice noodles", "1 lb beef brisket", "6 star anise", "1 cinnamon stick", "4-inch ginger", "1 onion", "3 tbsp fish sauce"],
    cookingTime: 180,
    chef: "Chef Linh Nguyen",
    description: "Traditional Vietnamese beef noodle soup with aromatic broth."
  },

  "Greek Spanakopita": {
    image: "https://images.unsplash.com/photo-1544982503-9f984c14501a?w=600&h=400&fit=crop&auto=format",
    ingredients: ["1 lb fresh spinach", "1 package phyllo pastry", "8 oz feta cheese", "4 oz ricotta", "3 eggs", "1/2 cup dill", "1 onion", "1/2 cup olive oil"],
    cookingTime: 45,
    chef: "Chef Yianna Kostas",
    description: "Traditional Greek spinach pie with crispy phyllo and feta."
  },

  "Mexican Mole Poblano": {
    image: "https://images.unsplash.com/photo-1565299585323-38174c4a6471?w=600&h=400&fit=crop&auto=format",
    ingredients: ["4 lbs chicken", "6 poblano chilies", "4 ancho chilies", "2 oz Mexican chocolate", "1/4 cup sesame seeds", "3 tomatoes", "1 onion", "20+ spices"],
    cookingTime: 120,
    chef: "Chef Carmen Rodriguez",
    description: "Complex Mexican sauce with chocolate and over 20 ingredients."
  }
};

export default recipeMapping;
