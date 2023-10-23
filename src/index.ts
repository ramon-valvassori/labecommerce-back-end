import {
  products,
  users,
  createUser,
  createProduct,
  getAllUsers,
  getAllProducts,
  searchProductsByName
} from "./database";

const newUser = {
  id: "u003",
  name: "Astrodev",
  email: "astrodev@email.com",
  password: "astrodev99",
  createdAt: new Date().toISOString(),
};

const updatedUsers = createUser(newUser);

const newProduct = {
  id: "prod003",
  name: "SSD gamer",
  price: 349.99,
  description:
    "Acelere seu sistema com velocidades incríveis de leitura e gravação.",
  imageUrl: "https://images.unsplash.com/photo",
};

const updatedProducts = createProduct(newProduct);

const results = searchProductsByName("gamer");
  
  

//console.log(users);
//console.log(products);
//console.log(updatedUsers);
//console.log(updatedProducts);
//console.log(getAllUsers());
//console.log(getAllProducts());
console.log(results);

