export type TUsers = {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string; // Formato esperado: 'YYYY-MM-DDTHH:mm:ss.SSSZ'
};

export type TProducts = {
  id: string;
  name: string;
  price: number;
  description: string;
  imageUrl: string;
};
