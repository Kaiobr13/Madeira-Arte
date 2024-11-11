insert into class(cla_name)
values ('Admin'),
       ('Supplier'),
       ('User');

insert into client(cli_name, cli_email, cli_password, cli_cla_id)
values ('admin', 'admin', 'admin', 1);

insert into supplier(sup_name, sup_contact, sup_address, sup_email, sup_phone, sup_cla_id)
values ('Madeiras do Norte Lda.', 'João Silva', 'Porto', 'info@madeirasdonorte.pt', '+351 22 123 4567', 2),
       ('Ferragens Lisboa', 'Maria Santos', 'Lisboa', 'contato@ferragenslisboa.pt', '+351 21 234 5678', 2),
       ('TintaVerde', 'Antonio Ferreira', 'Coimbra', 'comercial@tintaverde.pt', '+351 239 456 789', 2),
       ('Tecelagem Portuguesa', 'Sofia Almeida', 'Braga', 'tecelagem@portugesa.pt', '+351 235 789 012', 2),
       ('EquipMadeiras', 'Ricardo Mendes', 'Faro', 'suporte@equipmadeira.pt', '+351 289 123 456', 2);

insert into category (cat_name)
values 
    ('Mesas'),
    ('Cadeiras'), 
    ('Estantes'), 
    ('Armários'), 
    ('Decoração'),
    ('Outros');   

insert into stocks (quantity)
values
    (10),
    (8),
    (15),
    (6),
    (4),
    (10),
    (20),
    (30),
    (25),
    (16),
    (14),
    (40),
    (35),
    (18),
    (4),
    (28),
    (5),
    (12),
    (5),
    (22),
    (30);

insert into product (prod_name, prod_cat_id, prod_price, prod_sup_id, prod_stock_id)
values 
    ('Mesa de Jantar Rústica Black Mate', 1, 300.00, 1, 1),
    ('Mesa de Centro Vintage Tampo Duplo', 1, 150.50, 1, 2),
    ('Mesa Lateral Compacta', 1, 80.00, 1, 3),
    ('Armário de Cozinha', 4, 400.00, 1, 4),
    ('Guarda-roupa Espelhado', 4, 520.00, 1, 5),
    ('Armário Multiuso', 4, 275.00, 1, 6),
    ('Cadeira de Madeira', 2, 60.00, 2, 7),
    ('Cadeira Dobrável', 2, 45.50, 2, 8),
    ('Banco Baixo Estofado', 2, 55.00, 2, 9),
    ('Painel Decorativo', 3, 95.50, 2, 10),
    ('Espelho com Moldura de Madeira', 5, 85.00, 3, 11),
    ('Decoração Vintage', 5, 30.00, 3, 12),
    ('Porta-retrato de Madeira', 5, 20.50, 3, 13),
    ('Candeeiro com Base de Madeira', 5, 60.00, 3, 14),
    ('Prateleira Decorativa', 3, 65.25, 4, 15),
    ('Organizador empilhável natural', 5, 25.00, 4, 16),
    ('Estante Modular de Carvalho', 3, 200.75, 4, 17),
    ('Estante para Livros', 3, 180.00, 4, 18),
    ('Banco de Jardim', 6, 120.00, 5, 19),
    ('Caixa Organizadora de Madeira', 6, 25.50, 5, 20),
    ('Suporte para Vasos', 6, 15.00, 5, 21);