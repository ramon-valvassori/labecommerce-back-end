import { TProducts, TUsers } from "./types";

export const users: TUsers[] = [
  {
    id: "u001",
    name: "Fulano",
    email: "fulano@email.com",
    password: "fulano123",
    createdAt: ""
  },
  {
    id: "u002",
    name: "Beltrana",
    email: "beltrana@email.com",
    password: "beltrana00",
    createdAt: ""
  },
];

export const products: TProducts[] = [
  {
    id: "prod001",
    name: "Mouse gamer",
    price: 250,
    description: "Melhor mouse do mercado!",
    imageUrl: "https://picsum.photos/seed/Mouse%20gamer/400",
  },
  {
    id: "prod002",
    name: "Monitor",
    price: 900,
    description: "Monitor LED Full HD 24 polegadas",
    imageUrl: "https://picsum.photos/seed/Monitor/400",
  },
];

export const createUser = (newUser: TUsers): TUsers[] => {
  users.push(newUser);
  console.log("Cadastro realizado com sucesso");

  return users;
};

export const getAllUsers = (): TUsers[] => {
  return users;
};

export const createProduct = (newProducts: TProducts): TProducts[] => {
    products.push(newProducts);
    console.log("Produto criado com sucesso");
    
    return products;
}

export const getAllProducts= (): TProducts[] => {
    return products;
  };

export const searchProductsByName = (name: string): TProducts[] => {
  
    const results = getAllProducts().filter((product) => product.name.includes(name));
   
    return results;
  };
  
  
