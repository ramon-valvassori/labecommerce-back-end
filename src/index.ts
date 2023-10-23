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

import express, { Request, Response } from "express";
import cors from "cors";
import { TProducts, TUsers } from "./types";
import { products, users } from "./database";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

app.get("/users", (req: Request, res: Response) => {
  try {
    const result: TUsers[] = users;

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/users", (req: Request, res: Response) => {
  const id = req.body.id as string;
  const name = req.body.name as string;
  const email = req.body.email as string;
  const password = req.body.password as string;
  const createdAt = req.body.createdAt as string;

  const newId = req.body.id as string;
  const newName = req.body.name as string;
  const newEmail = req.body.email as string;
  const newPassword = req.body.password as string;
  const newCreatedAt = req.body.createdAt as string;

  const newUser: TUsers = { id, name, email, password, createdAt };

  const existingUser = users.find(
    (user) => user.id === id || user.email === email
  );
  if (existingUser) {
    res.status(409).send("Já existe um usuário com esse id ou e-mail");
    return;
  }

  if (newId !== undefined) {
    if (typeof newId !== "string") {
      res.status(400);
      throw new Error("Id deve ser uma string");
    }

    if (newId.length !== 3) {
      throw new Error("O id deve ter 4 caracteres");
    }
  }

  if (newName !== undefined) {
    if (typeof newName !== "string") {
      res.status(400);
      throw new Error("O name deve ser uma string");
    }

    if (newName.length < 2) {
      throw new Error("O name deve ter no mínimo 2 caracteres");
    }
  }

  if (newEmail !== undefined) {
    if (typeof newEmail !== "string") {
      res.status(400);
      throw new Error("O Email deve ser uma string");
    }

    if (newName.length < 2) {
      throw new Error("O email deve ter no mínimo 2 caracteres");
    }
  }

  if (newPassword !== undefined) {
    if (typeof newPassword !== "string") {
      res.status(400);
      throw new Error("O password deve ser uma string");
    }

    if (newPassword.length < 8) {
      throw new Error("O password deve ter no mínimo 8 caracteres");
    }
  }

  users.push(newUser);

  res.status(201).send("Cadastro realizado com sucesso");
});

app.delete("/users/:id", (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const userIndex = users.findIndex((user) => user.id === idToDelete);

    if (userIndex < 0) {
      res.status(404).send("Usuário não encontrado");
      return;
    }

    delete users[userIndex];

    res.status(200).send("Usuário deletado com sucesso");
  } catch (error) {
    console.log(error);
  }
});

app.get("/products", (req: Request, res: Response) => {
  try {
    const result: TProducts[] = products;
    if (products.length < 1) {
      res.statusCode = 400;
      throw new Error("deve possuir pelo menos um caractere");
    }

    res.status(200).send(result);
  } catch (error) {
    console.log(error);
  }
});

app.post("/products", (req: Request, res: Response) => {
  try {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const description = req.body.description as string;
    const imageUrl = req.body.imageUrl as string;

    const newId = req.body.id as string;
    const newName = req.body.name as string;
    const newPrice = req.body.price as number;
    const newDescription = req.body.description as string;
    const newImageUrl = req.body.imageUrl as string;

    const newProduct: TProducts = { id, name, price, description, imageUrl };

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("Id deve ser uma string");
      }

      if (newId.length !== 3) {
        throw new Error("O id deve ter 4 caracteres");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("o name deve ser uam string");
      }

      if (newName.length < 2)
        throw new Error("o name deve ter no mínimo 2 caracteres");
    }

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("O price deve ser um number");
      }
    }

    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400);
        throw new Error("O description deve ser uam string");
      }
    }

    if (newImageUrl !== undefined) {
      if (typeof newImageUrl !== "string") {
        res.status(400);
        throw new Error("A imagemUrl deve ser uma string");
      }
    }

    products.push(newProduct);

    res.status(201).send("Produto cadastrado com sucesso");
  } catch (error) {
    console.log(error);
  }
});

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const productIndex = products.findIndex(
      (product) => product.id === idToDelete
    );

    if (productIndex < 0) {
      res.status(404).send("Produto não encontrado");
      return;
    }

    delete products[productIndex];

    res.status(200).send("Produto deletado com sucesso");
  } catch (error) {
    console.log(error);
  }
});

app.put("/products/:id", (req, res) => {
  try {
    const id = req.params.id;

    const newId = req.body.id as string | undefined;
    const newName = req.body.name as string | undefined;
    const newPrice = req.body.price as number | undefined;
    const newDescription = req.body.description as string | undefined;
    const newImageUrl = req.body.imageUrl as string | undefined;

    if (id !== undefined) {
      if (typeof id !== "string") {
        res.status(400).send("'id' deve ser uma string");
        return;
      }

      const product = products.find((product) => product.id === id);

      if (!product) {
        res.status(400).send("'Produto' não cadastrado");
        return;
      }

      if (newId !== undefined) {
        if (typeof newId !== "string") {
          res.status(400).send("Id deve ser uma string");
          return;
        }

        if (newId.length !== 7) {
          res.status(400).send("O id deve ter 7 caracteres");
          return;
        }
      }

      // (verificação de newName, newPrice, newDescription, newImageUrl)

      if (product) {
        product.id = newId !== undefined ? newId : product.id;
        product.name = newName !== undefined ? newName : product.name;
        product.price = newPrice !== undefined ? (isNaN(Number(newPrice)) ? product.price : Number(newPrice)) : product.price;
        product.description = newDescription !== undefined ? newDescription : product.description;
        product.imageUrl = newImageUrl !== undefined ? newImageUrl : product.imageUrl;
      }

      res.status(200).send("Atualização realizada com sucesso");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Erro interno do servidor");
  }
});

