insert into class(class_name)
values ('Admin'),
       ('Supplier'),
       ('User');

insert into client(client_name, client_email, client_password, class_id)
values ('admin', 'admin', 'admin', 1);

insert into supplier(supplier_name, supplier_contact, supplier_address, supplier_email, supplier_phone)
values ('Madeiras do Norte Lda.', 'João Silva', 'Porto', 'info@madeirasdonorte.pt', '+351 22 123 4567'),
       ('Ferragens Lisboa', 'Maria Santos', 'Lisboa', 'contato@ferragenslisboa.pt', '+351 21 234 5678'),
       ('TintaVerde', 'Antonio Ferreira', 'Coimbra', 'comercial@tintaverde.pt', '+351 239 456 789'),
       ('Tecelagem Portuguesa', 'Sofia Almeida', 'Braga', 'tecelagem@portugesa.pt', '+351 235 789 012'),
       ('EquipMadeiras', 'Ricardo Mendes', 'Faro', 'suporte@equipmadeira.pt', '+351 289 123 456');

insert into category (category_name)
values 
    ('Mesas'),
    ('Cadeiras'), 
    ('Estantes'), 
    ('Armários'), 
    ('Decoração'),
    ('Outros');   

INSERT INTO product (product_name, category_id, product_price, stock_quantity, supplier_id, product_image)
VALUES 
    ('Mesa de Jantar Rústica Black Mate', 1, 300.00, 10, 1),
    ('Mesa de Centro Vintage Tampo Duplo', 1, 150.50, 8, 1),
    ('Mesa Lateral Compacta', 1, 80.00, 15, 1),
    ('Armário de Cozinha', 4, 400.00, 6, 1),
    ('Guarda-roupa Espelhado', 4, 520.00, 4, 1),
    ('Armário Multiuso', 4, 275.00, 10, 1),
    ('Cadeira de Madeira Maciça', 2, 60.00, 20, 2),
    ('Cadeira Dobrável', 2, 45.50, 30, 2),
    ('Banco Baixo Estofado', 2, 55.00, 25, 2),
    ('Painel Decorativo', 3, 95.50, 16, 2),
    ('Espelho com Moldura de Madeira', 5, 85.00, 14, 3),
    ('Moldura de Parede Artesanal', 5, 30.00, 40, 3),
    ('Porta-retrato de Madeira', 5, 20.50, 35, 3),
    ('Abajur com Base de Madeira', 5, 60.00, 18, 3),
    ('Prateleira Decorativa', 3, 65.25, 20, 4),
    ('Cesto de Madeira Natural', 5, 25.00, 28, 4),
    ('Estante Modular', 3, 200.75, 5, 4),
    ('Estante para Livros', 3, 180.00, 12, 4),
    ('Banco de Jardim', 6, 120.00, 12, 5),
    ('Caixa Organizadora de Madeira', 6, 25.50, 22, 5),
    ('Suporte para Vasos', 6, 15.00, 30, 5);

