import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";
import { Product } from "./types";

const app = express();

app.use(cors());
app.use(express.json());

app.listen(3003, () => {
  console.log(`Servidor rodando na porta ${3003}`);
});

app.get("/ping", (req: Request, res: Response) => {
  res.send("Pong!");
});

// Usuários

app.get("/users", async (req: Request, res: Response) => {
  try {
    const result = await db("users");

    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/create-table-users", async (req: Request, res: Response) => {
  try {
    await db.raw(`
      CREATE TABLE users (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at TEXT DEFAULT (DATETIME('now', 'localtime'))
    );
      `);

    res.send("Tabela users criada com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/users", async (req: Request, res: Response) => {
  const { id, name, email, password } = req.body;

  if (!id || !name || !email || !password) {
    res.status(400).json({ error: "Todos os campos são obrigatórios." });
    return;
  }



  try {
    await db
      .insert({
        id: id,
        name: name,
        email: email,
        password: password
        
      })
      .into("users");

    res.status(200).send({ message: "Cadastro realizado com sucesso!" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.delete("/users/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [user] = await db.raw(`
        SELECT * FROM users
        WHERE id = "${idToDelete}";
      `);

    if (!user) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    await db("users").del().where({ id: idToDelete });

    res.status(200).send({ message: "User deletado com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.put("/users/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newPassword = req.body.password;

    if (newId !== undefined) {
      if (typeof newId !== "string") {
        res.status(400);
        throw new Error("'id' deve ser string");
      }

      if (newId.length < 1) {
        res.status(400);
        throw new Error("'id' deve possuir no mínimo 1 caractere");
      }
    }

    if (newName !== undefined) {
      if (typeof newName !== "string") {
        res.status(400);
        throw new Error("'name' deve ser string");
      }

      if (newName.length < 2) {
        res.status(400);
        throw new Error("'name' deve possuir no mínimo 2 caracteres");
      }
    }

    if (newPassword !== undefined) {
      if (typeof newPassword !== "string") {
        res.status(400);
        throw new Error("'password' deve ser string");
      }
    }

    const [user] = await db.raw(`
        SELECT * FROM users
        WHERE id = "${id}";
      `);

    if (user) {
      await db.raw(`
            UPDATE users
            SET
              id = "${newId || user.id}",
              name = "${newName || user.name}",
              password = "${newPassword || user.password}"
            WHERE
              id = "${id}";
          `);
    } else {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    res.status(200).send({ message: "Atualização realizada com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

//Produtos

app.get("/products", async (req: Request, res: Response) => {
  try {
    const { name } = req.query;

    let query = "SELECT * FROM products";
    let params = [];

    if (name) {
      query += " WHERE name LIKE ?";
      params.push(`%${name}%`);
    }

    const result = await db.raw(query, params);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/create-table-products", async (req: Request, res: Response) => {
  try {
    await db.raw(`
      CREATE TABLE products (
        id TEXT PRIMARY KEY UNIQUE NOT NULL,
        name TEXT NOT NULL,
        price REAL NOT NULL,
        description TEXT NOT NULL,
        image_url TEXT NOT NULL 
    )
      `);

    res.send("Tabela products criada com sucesso!");
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/products", async (req: Request, res: Response) => {
  const { id, name, price, description, image_url } = req.body;

  if (!id || !name || !price || !description || !image_url) {
    res.status(400).json({ error: "Todos os campos são obrigatórios." });
    return;
  }

  const query = `INSERT INTO products (id, name, price, description, image_url) VALUES (?, ?, ?, ?, ?)`;

  if (query.length > 0) {
    res.status(400).json({ error: "ID já está em uso." });
    return;
  }

  try {
    await db.raw(query, [id, name, price, description, image_url]);

    res.status(201).json("Produto Cadastrado com sucesso");
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.delete("/products/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [product] = await db.raw(`
        SELECT * FROM products
        WHERE id = "${idToDelete}";
      `);

    if (!product) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    await db.raw(`
        DELETE FROM pŕoducts
        WHERE id = "${idToDelete}";
      `);

    res.status(200).send({ message: "Produto deletado com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

// Purchases

app.get("/purchases", async (req: Request, res: Response) => {
  try {
    let query = "SELECT * FROM purchases";

    const result = await db.raw(query);
    res.status(200).send(result);
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/create-table-purchases", async (req: Request, res: Response) => {
  try {
    await db.raw(`
            CREATE TABLE purchases (
                id TEXT PRIMARY KEY,
                buyer TEXT NOT NULL,
                created_at TEXT DEFAULT (DATETIME('now', 'localtime'))
                FOREIGN KEY(buyer) REFERENCES users(id)
                ON UPDATE CASCADE 
                ON DELETE CASCADE
                )
        `);

    res.status(201).json({ message: "Tabela 'purchases' criada com sucesso." });
  } catch (error: any) {
    console.error(error.message);
    res
      .status(500)
      .json({ error: "Erro interno do servidor ao criar a tabela." });
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [purchase] = await db.raw(`
                SELECT * FROM purchases
                WHERE id = "${idToDelete}";
              `);

    if (!purchase) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    await db.raw(`
                DELETE FROM purchases
                WHERE id = "${idToDelete}";
              `);

    res.status(200).send({ message: "Compra deletada com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.post("/purchases", async (req: Request, res: Response) => {
  const { id, buyer, products } = req.body;

  if (!id || !buyer || !products) {
    res.status(400).json({ error: "Todos os campos são obrigatórios." });
    return;
  }

  const query = `INSERT INTO products (id,buyer, products) VALUES (?, ?, ?)`;

  if (query.length > 0) {
    res.status(400).json({ error: "ID já está em uso." });
    return;
  }

  try {
    await db.raw(query, [id, buyer, products]);

    res.status(201).json("Produto Cadastrado com sucesso");
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

app.delete("/purchases/:id", async (req: Request, res: Response) => {
  try {
    const idToDelete = req.params.id;

    const [purchase] = await db.raw(`
          SELECT * FROM purchases
          WHERE id = "${idToDelete}";
        `);

    if (!purchase) {
      res.status(404);
      throw new Error("'id' não encontrada");
    }

    await db.raw(`
          DELETE FROM purchases
          WHERE id = "${idToDelete}";
        `);

    res.status(200).send({ message: "Compra deletada com sucesso" });
  } catch (error) {
    console.log(error);

    if (res.statusCode === 200) {
      res.status(500);
    }

    if (error instanceof Error) {
      res.send(error.message);
    } else {
      res.send("Erro inesperado");
    }
  }
});

app.get("/purchases/:id", async (req: Request, res: Response) => {
  const purchaseId = req.params.id;

  try {
    const purchaseDetails = await db.raw(
      `
              SELECT purchases.id AS purchaseId, users.id AS buyerId, users.name AS buyerName, users.email AS buyerEmail, 
              purchases.created_at AS createdAt
              FROM users 
              INNER JOIN purchases ON users.id = purchases.buyer
              WHERE purchases.id = ?;
            `,
      [purchaseId]
    );

    const products = await db.raw(
      `
              SELECT products.id, products.name, products.price, products.description, products.image_url AS imageUrl,
              purchase_products.quantity
              FROM products
              INNER JOIN purchase_products ON products.id = purchase_products.product_id
              WHERE purchase_products.purchase_id = ?;
            `,
      [purchaseId]
    );

    const totalPrice: number = products.reduce(
      (acc: number, product: Product) => {
        return acc + product.price * product.quantity;
      },
      0
    );

    const response = {
      purchaseId: purchaseDetails[0].purchaseId,
      buyerId: purchaseDetails[0].buyerId,
      buyerName: purchaseDetails[0].buyerName,
      buyerEmail: purchaseDetails[0].buyerEmail,
      totalPrice: totalPrice,
      createdAt: purchaseDetails[0].createdAt,
      products: products,
    };

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});