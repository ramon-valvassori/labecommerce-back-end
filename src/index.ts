/* import {
  products,
  users,
  createUser,
  createProduct,
  getAllUsers,
  getAllProducts,
  searchProductsByName
} from "./database"; */

/*const newUser = {
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
console.log(results); */

import express, { Request, Response } from 'express'
import cors from 'cors'
import { TProducts, TUsers} from './types'
import { products, users } from './database'


const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.get('/ping', (req: Request, res: Response) => {
  res.send('Pong!')
});

app.get("/users", (req: Request, res: Response) => {
  const result: TUsers[] = users;

  res.status(200).send(result)
})

app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string; 
  const name = req.body.name as string;
  const email = req.body.email as string;
  const password = req.body.password as string;
  const createdAt = req.body.createdAt as string;

  const newUser: TUsers = { id, name, email, password, createdAt };

  users.push(newUser);

  res.status(201).send("Cadastro realizado com sucesso");
})

app.delete("/users/:id", (req: Request, res: Response) => {
  const idToDelete = req.params.id;

  const userIndex = users.findIndex((user) => user.id === idToDelete);

  if(userIndex >= 0) {
    users.splice(userIndex, 1)
  }
  res.status(200).send("Usuário deletado com sucesso");
})

app.get("/products", (req: Request, res: Response) => {
  const result: TProducts[] = products;

  res.status(200).send(result)
})

app.post("/products", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string; 
  const price = req.body.price as number;
  const description = req.body.description as string;
  const imageUrl = req.body.imageUrl as string;

  const newProduct: TProducts = { id, name, price, description, imageUrl };

  products.push(newProduct);

  res.status(201).send("Produto cadastrado com sucesso");
})

app.delete("/products/:id", (req: Request, res: Response) => {
  const idToDelete = req.params.id;

  const productIndex = products.findIndex((product) => product.id === idToDelete);

  if(productIndex >= 0) {
    products.splice(productIndex, 1)
  }
  res.status(200).send("Produto deletado com sucesso");
})

app.put('/products/:id', (req: Request, res: Response) => {
  const idToEdit = req.params.id
    
	const newId = req.body.id as string | undefined         
	const newName = req.body.name as string | undefined    
	const newPrice = req.body.price as number | undefined      
	const newDescription = req.body.description as string | undefined  
  const newImageUrl = req.body.imageUrl as string | undefined

  const product = products.find((product) => product.id === idToEdit)

  if (product) {
      product.id = newId || product.id
      product.name = newName || product.name
      product.price = isNaN(Number(newPrice)) ? product.price : newPrice as number
      product.description = newDescription || product.description
      product.imageUrl = newImageUrl || product.imageUrl
  }

  res.status(200).send("Atualização realizada com sucesso")
})





