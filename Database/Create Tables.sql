create table client(
                    cli_id int not null auto_increment primary key,                         -- Primary key, auto incrementing
                    cli_name varchar(120),                                                  -- user name
                    cli_email varchar(120) unique not null,                                 -- user email, it is unique and not null
                    cli_password varchar(60) not null,                                      -- user criptographed password
                    cli_phone varchar(30),                                                  -- user phone number
                    cli_place varchar(60),                                                  -- user address
                    cli_last_login datetime,                                                -- user last login date
                    cli_register_date datetime default current_timestamp,                   -- user registration date
                    cli_cla_id int not null                                                 -- user class, foreign key to class
);

create table class(
                    cla_id int not null auto_increment primary key,                          -- Primary key, auto incrementing
                    cla_name varchar(60) not null                                            -- Class name
); 

create table supplier(
                     sup_id int not null auto_increment primary key,                       -- Primary key, auto incrementing
                     sup_name varchar(120),                                                -- Company name
                     sup_contact varchar(30),                                              -- Name of the representative
                     sup_address text,                                                     -- Supplier address
                     sup_email varchar(120) unique not null,                               -- Supplier email, it is unique and not null
                     sup_phone varchar(30),                                                -- Supplier phone
                     sup_cla_id int not null                                               -- Supplier class, foreign key to class
);

create table category(
                     cat_id int not null auto_increment primary key,                       -- Primary key, auto incrementing
                     cat_name varchar(60) not null                                         -- Product category name, if is a table, chair etc.
);  

create table product(
                    prod_id int not null auto_increment primary key,                   -- Primary key, auto incrementing
                    prod_name varchar(120),                                            -- Product name
                    prod_cat_id int not null,                                          -- Product category, foreign key to category 
                    prod_price decimal(10,2) not null,                                 -- Product value
                    prod_sup_id int not null,                                          -- Product supplier, foreign key to supplier
                    prod_stock_id int not null,                                        -- Product stock, foreign key to stock
                    prod_img_path varchar(255)                                         -- Product Image Path
);

create table supplier_contacts(
                    sp_id int not null auto_increment primary key,                             -- Primary key, auto incrementing
                    sp_sup_id int not null,                                                    -- Supplier id, foreign key to supplier
                    sp_cli_id int not null                                                     -- client id, foreign key to client
);         

create table orders(
                    ord_id int not null auto_increment primary key,                          -- Primary key, auto incrementing
                    ord_date date not null,                                                  -- Date when the order was made
                    ord_status varchar(60) not null,                                         -- Order status
                    ord_cli_id int not null,                                                 -- Must be a client id to work, foreign key to client
                    ord_total decimal(10,2) not null                                         -- Total price of the order
);

create table order_details(
                    det_id int not null auto_increment primary key,                        -- Primary key, auto incrementing
                    det_ord_id int not null,                                               -- Order id, foreign key to order
                    det_prod_id int not null,                                              -- Product id, foreign key to product
                    det_quantity int not null,                                             -- Quantity of each product
                    prod_unit_price decimal(10,2) not null                              -- Price of each product
);

create table stocks(
                    stock_id int not null auto_increment primary key,                          -- Primary key, auto incrementing
                    quantity int not null                                                      -- Quantity of each product
);

create table payments(
                    pay_id int not null auto_increment primary key,                        -- Primary key, auto incrementing
                    pay_ord_id int not null,                                               -- Order id, foreign key to order
                    pay_method varchar(60) not null,                                       -- Payment method
                    pay_date date not null,                                                -- Date when the payment was made
                    pay_status varchar(60) not null,                                       -- Payment status
                    pay_total decimal(10,2) not null                                       -- Total price of the payment + delivery 
);

create table logs(
                    log_id int not null auto_increment primary key,                          -- Primary key, auto incrementing
                    log_message text not null                                                -- Log message
);

-- Foreign Keys Constraints

alter table client 
add constraint client_fk_class
foreign key (cli_cla_id) references class(cla_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

alter table product
add constraint product_fk_category
foreign key (prod_cat_id) references category(cat_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

alter table product
add constraint product_fk_supplier
foreign key (prod_sup_id) references supplier(sup_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

alter table product
add constraint product_fk_stock
foreign key (prod_stock_id) references stocks(stock_id)
ON DELETE CASCADE;

alter table supplier_contacts
add constraint supplier_contact_fk_supplier
foreign key (sp_sup_id) references supplier(sup_id)
ON DELETE CASCADE;

alter table supplier_contacts
add constraint supplier_contact_fk_client
foreign key (sp_cli_id) references client(cli_id)
ON DELETE CASCADE;

alter table orders
add constraint orders_fk_client
foreign key (ord_cli_id) references client(cli_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

alter table order_details
add constraint order_details_fk_order
foreign key (det_ord_id) references orders(ord_id)
ON DELETE CASCADE;

alter table order_details
add constraint order_details_fk_product
foreign key (det_prod_id) references product(prod_id)
ON DELETE CASCADE;

alter table payments
add constraint payments_fk_order
foreign key (pay_ord_id) references orders(ord_id)
ON DELETE CASCADE;

alter table prodimg
add constraint product_images_fk
foreign key (pi_prod_id) references product(prod_id)
ON DELETE CASCADE;

alter table prodimg
add constraint product_images_fk_images
foreign key (pi_img_id) references images(img_id)
ON DELETE CASCADE;