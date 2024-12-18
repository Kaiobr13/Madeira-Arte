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

insert into product (prod_name, prod_cat_id, prod_price, prod_sup_id, prod_stock_id, img_path)
values 
    ('Mesa de Jantar Rústica Black Mate', 1, 300.00, 1, 1, "/images/black-mate.png"),
    ('Mesa de Centro Vintage Tampo Duplo', 1, 150.50, 1, 2, "/images/mesa-vintage.png"),
    ('Mesa Lateral Compacta', 1, 80.00, 1, 3, "/images/mesa-barnet.png"),
    ('Armário de Cozinha', 4, 400.00, 1, 4, "/images/armario-ivar.png"),
    ('Guarda-roupa Espelhado', 4, 520.00, 1, 5, "/images/roupeiro-cinza.png"),
    ('Armário Multiuso', 4, 275.00, 1, 6, "/images/armario-escuro.png"),
    ('Cadeira de Madeira Estofada', 2, 60.00, 2, 7, "/images/cadeira-granite.png"),
    ('Cadeira Dobrável', 2, 45.50, 2, 8, "/images/cadeira-dallas.png"),
    ('Banco Baixo Estofado', 2, 55.00, 2, 9, "/images/banco-baixo-estofado.png"),
    ('Painel Decorativo', 3, 95.50, 2, 10, "/images/painel-decorativo.png"),
    ('Espelho com Moldura de Madeira', 5, 85.00, 3, 11, "/images/espelho-moldura.png"),
    ('Decoração Vintage', 5, 30.00, 3, 12, "/images/decoracao-vintage.png"),
    ('Porta-retrato de Madeira', 5, 20.50, 3, 13, "/images/portaretrato.png"),
    ('Candeeiro com Base de Madeira', 5, 60.00, 3, 14, "/images/candeeiro-madeira.png"),
    ('Prateleira Decorativa', 3, 65.25, 4, 15, "/images/prateleira-decorativa.png "),
    ('Organizador empilhável natural', 5, 25.00, 4, 16, "/images/organizador-madeira.png"),
    ('Estante Modular de Carvalho', 3, 200.75, 4, 17, "/images/estante-modular.png"),
    ('Estante para Livros', 3, 180.00, 4, 18, "/images/estante-hemnes.png"),
    ('Banco de Jardim', 6, 120.00, 5, 19, "/images/banco-jardim.png"),
    ('Caixa Organizadora de Madeira', 6, 25.50, 5, 20, "/images/caixa-organizadora.png"),
    ('Suporte para Vasos', 6, 15.00, 5, 21, "/images/suporte-vasos.png");   
