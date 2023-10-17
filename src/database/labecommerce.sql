-- Active: 1695758877062@@127.0.0.1@3306

CREATE TABLE users (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TEXT NOT NULL
);

DROP TABLE users;

SELECT * FROM users;

INSERT INTO users (id, name, email, password, created_at)
VALUES 
('u001', 'Maria', 'maria@hotmail.com', '12345678', '02 Ago 2022'),
('u002', 'João', 'joao@hotmail.com', '23456789', '03 Set 2021'),
('u003', 'Luana', 'luana@hotmail.com', '34567890', '05 Out 2020');

CREATE TABLE products (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL,
    price REAL NOT NULL,
    description TEXT NOT NULL,
    image_url TEXT NOT NULL 
)

DROP TABLE products;

SELECT * FROM products;

INSERT INTO products (id, name, price, description, image_url)
VALUES 
('c001', 'Samsung Galaxy A34', 1599, '128GB 5G Tela 6.6'' Dual Chip 6GB RAM Câmera Tripla de até 48MP + Selfie 13MP Bateria de 5000mAh - Violeta', 'https://m.media-amazon.com/images/I/61cx-e-3OqL._AC_SX679_.jpg'),
('c002', 'Samsung Galaxy S23', 7199, '512GB Tela 6.8'' 12GB RAM IP68 Processador Qualcomm Snapdragon 8 Gen 2 Câmera Quádrupla de até 200MP + Selfie 12MP - Preto', 'https://m.media-amazon.com/images/I/61aEbAwahaL._AC_SX679_.jpg'),
('c003', 'Samsung Galaxy A14', 779, '64 GB Prata 4G Octa-Core 4GB RAM 6,6" Câm. Tripla + Selfie 13MP Dual Chip', 'https://a-static.mlcdn.com.br/800x560/smartphone-samsung-galaxy-a14-64-gb-prata-4g-octa-core-4gb-ram-66-cam-tripla-selfie-13mp-dual-chip/magazineluiza/237063400/e8788418bdfc17d9e587e6bd3570f058.jpg'),
('c004', 'Samsung Galaxy A-33', 1884.99, '5 G, 128 Gb, Dual - Sm-A336Mzwlzto, Branco, Quadriband', 'https://m.media-amazon.com/images/I/611BL0R8ZfL._AC_SX679_.jpg'),
('c005', 'Sansung Galaxy A-53', 2599, '28 Gb, Dual - Sm-A536Ezoszto, Rosa, Quadriband', 'https://m.media-amazon.com/images/I/61CjwysSH5L._AC_SX679_.jpg');