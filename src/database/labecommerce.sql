-- Active: 1695758877062@@127.0.0.1@3306

/*Cria tabela users*/
CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

/*Deleta tabela*/
DROP TABLE users;

/*Seleciona a tabela users*/
SELECT * FROM users;

/*Popula a tabela users*/
INSERT INTO users (id, name, email, password, created_at)
VALUES 
('u001', 'Maria', 'maria@hotmail.com', '12345678', '02 Ago 2022'),
('u002', 'João', 'joao@hotmail.com', '23456789', '03 Set 2021'),
('u003', 'Luana', 'luana@hotmail.com', '34567890', '05 Out 2020');

/*Insere um usuário na tabela users*/
INSERT INTO users 
VALUES ('u004', 'Mariana', 'mariana@hotmail.com', '12345678', '02 Jan 2023');

/*Deleta um usuário da tabela users pelo id*/
DELETE FROM users
WHERE id = 'u001';

/*Cria a tabela products*/
CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL 
)

/*Deleta a tabela products*/
DROP TABLE products;

/*Seleciona a tabela products*/
SELECT * FROM products;

/*Seleciona um termo da tabela users*/
SELECT * FROM products 
WHERE description LIKE '%tripla%'

/*Popula a tabela products*/
INSERT INTO products (id, name, price, description, image_url)
VALUES 
('c001', 'Samsung Galaxy A34', 1599, '128GB 5G Tela 6.6'' Dual Chip 6GB RAM Câmera Tripla de até 48MP + Selfie 13MP Bateria de 5000mAh - Violeta', 'https://m.media-amazon.com/images/I/61cx-e-3OqL._AC_SX679_.jpg'),
('c002', 'Samsung Galaxy S23', 7199, '512GB Tela 6.8'' 12GB RAM IP68 Processador Qualcomm Snapdragon 8 Gen 2 Câmera Quádrupla de até 200MP + Selfie 12MP - Preto', 'https://m.media-amazon.com/images/I/61aEbAwahaL._AC_SX679_.jpg'),
('c003', 'Samsung Galaxy A14', 779, '64 GB Prata 4G Octa-Core 4GB RAM 6,6" Câm. Tripla + Selfie 13MP Dual Chip', 'https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a14-64-gb-prata-4g-octa-core-4gb-ram-66-cam-tripla-selfie-13mp-dual-chip/magazineluiza/237063400/e8788418bdfc17d9e587e6bd3570f058.jpg'),
('c004', 'Samsung Galaxy A-33', 1884.99, '5 G, 128 Gb, Dual - Sm-A336Mzwlzto, Branco, Quadriband', 'https://m.media-amazon.com/images/I/611BL0R8ZfL._AC_SX679_.jpg'),
('c005', 'Sansung Galaxy A-53', 2599, '28 Gb, Dual - Sm-A536Ezoszto, Rosa, Quadriband', 'https://m.media-amazon.com/images/I/61CjwysSH5L._AC_SX679_.jpg');

/*Insere um produto na tabela products*/
INSERT INTO products
VALUES ('c006', 'Samsung Galaxy A54', 1699, '5G 128GB Tela 6.4'' Dual Chip 8GB RAM Preto Câmera Tripla de até 50MP Selfie 32MP', 'https://www.girafa.com.br/visao/default/img/produtos/smartphone/celulares/samsung-galaxy-a54-128gb-5g-tela-6-4-dual-chip-8gb-ram-camera-tripla-de-ate-50mp-selfie-32mp-preto-912885-1678990433-1.webp');

/*Deleta um produto da tabela products pelo id*/
DELETE FROM products
WHERE id = '001';

/*Edita os campos de um produto pelo id*/
UPDATE products
SET id = "c007", name = "Samsung Galaxy S25", price = 1299, description = "5g, 128gb, Dual, Azul", image_url = "https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a23-128gb-azul-5g-octa-core-4gb-ram-66-cam-quadrupla-selfie-8mp/magazineluiza/236591700/106db1960e6710f5351bbc4986567956.jpg"
WHERE id = "c003";


