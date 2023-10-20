import express, { Request, Response } from "express";
import cors from "cors";
import { db } from "./database/knex";

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
    const result = await db.raw(`
        SELECT * FROM users;
      `);

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

  const createdAt = new Date().toISOString();

  const query = `INSERT INTO users (id, name, email, password, created_at) VALUES (?, ?, ?, ?, ?)`;

  try {
    await db.raw(query, [id, name, email, password, createdAt]);

    res.status(201).json("Usuário Cadastrado com sucesso");
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

    await db.raw(`
        DELETE FROM users
        WHERE id = "${idToDelete}";
      `);

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

app.put("/product/:id", async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const newId = req.body.id;
    const newName = req.body.name;
    const newPrice = req.body.price;
    const newDescription = req.body.description;
    const newImage_url = req.body.image_url;

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

    if (newPrice !== undefined) {
      if (typeof newPrice !== "number") {
        res.status(400);
        throw new Error("'Price' deve ser um number");
      }
    }

    if (newDescription !== undefined) {
      if (typeof newDescription !== "string") {
        res.status(400);
        throw new Error("'description' deve ser uma string");
      }
    }

    if (newImage_url !== undefined) {
      if (typeof newPrice !== "string") {
        res.status(400);
        throw new Error("'Image_url' deve ser uma string");
      }
    }

    const [product] = await db.raw(`
        SELECT * FROM products
        WHERE id = "${id}";
      `);

    if (product) {
      await db.raw(`
            UPDATE products
            SET
              id = "${newId || product.id}",
              name = "${newName || product.name}",
              price = "${newPrice || product.price}",
              description = "${newDescription || product.description}",
              image_url = "${newImage_url || product.image_url}"
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

// Purchases

app.get("/purchases", async (req: Request, res: Response) => {
  try {
    const result = await db.raw(`
          SELECT * FROM purchases
        `);

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
        CREATE TABLE purchase_products (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            purchase_id TEXT,
            product_id TEXT,
            quantity INTEGER,
            FOREIGN KEY(purchase_id) REFERENCES purchases(id),
            FOREIGN KEY(product_id) REFERENCES products(id)
        );
        
        `);

    res.send("Tabela purchases criada com sucesso!");
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
  try {
    const { id, buyer, products } = req.body;

    if (
      !id ||
      !buyer ||
      !products ||
      !Array.isArray(products) ||
      products.length === 0
    ) {
      res.status(400).json({ error: "Pedido inválido." });
      return;
    }

    const buyerExists = await db.raw("SELECT * FROM users WHERE id = ?", [
      buyer,
    ]);

    if (!buyerExists || !buyerExists.length) {
      res.status(400).json({ error: "Comprador não encontrado." });
      return;
    }

    for (const product of products) {
      const { id: productId, quantity } = product;
      const productExists = await db.raw(
        "SELECT * FROM products WHERE id = ?",
        [productId]
      );

      if (!productExists || !productExists.length) {
        res
          .status(400)
          .json({ error: `Produto com ID ${productId} não encontrado.` });
        return;
      }
    }

    const createdAt = new Date().toISOString();
    const total_price = calculateTotalPrice(products);
    await db.raw(
      "INSERT INTO purchases (id, buyer, total_price, created_at) VALUES (?, ?, ?, ?)",
      [id, buyer, total_price, createdAt]
    );

    for (const product of products) {
      const { id: productId, quantity } = product;
      await db.raw(
        "INSERT INTO purchase_products (purchase_id, product_id, quantity) VALUES (?, ?, ?)",
        [id, productId, quantity]
      );
    }

    res.status(201).json({ message: "Pedido realizado com sucesso" });
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: "Erro interno do servidor." });
  }
});

function calculateTotalPrice(products: any[]): number {
  return 0;
}

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
