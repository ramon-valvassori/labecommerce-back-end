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




