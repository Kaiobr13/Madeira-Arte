create table user(
                    user_id int not null auto_increment primary key,                           -- Primary key, auto incrementing
                    user_name varchar(120),                                                    -- User name
                    user_email varchar(120) unique not null,                                   -- User email, it is unique and not null
                    user_password varchar(60) not null,                                        -- User criptographed password
                    user_phone varchar(15),                                                    -- User phone number
                    user_place varchar(60),                                                    -- User address
                    user_last_login datetime,                                                  -- User last login date
                    user_register_date datetime default current_timestamp,                     -- User registration date
                    class_id int not null                                                      -- User class, foreign key to class
);

create table class(
                    class_id int not null auto_increment primary key,                         -- Primary key, auto incrementing
                    class_name varchar(60) not null                                           -- Class name
);

create table product(
                    product_id int not null auto_increment primary key,                        -- Primary key, auto incrementing
                    product_name varchar(120),                                                 -- Product name
                    product_description text,                                                  -- Product description
                    category_id int not null,                                                  -- Product category, foreign key to category 
                    product_price decimal(10,2) not null,                                      -- Product value
                    stock_quantity int not null,                                               -- Product quantity
                    supplier_id int not null                                                   -- Product supplier, foreign key to supplier
);

create table category(
                    category_id int not null auto_increment primary key,                       -- Primary key, auto incrementing
                    category_name varchar(60) not null                                         -- Product category name, if is a table, chair etc.
);

create table supplier(
                    supplier_id int not null auto_increment primary key,                       -- Primary key, auto incrementing
                    supplier_name varchar(120),                                                -- Company name
                    supplier_contact varchar(30),                                              -- Name of the representative
                    supplier_address text,                                                     -- Supplier address
                    supplier_email varchar(120) unique not null,                               -- Supplier email, it is unique and not null
                    supplier_phone varchar(15)                                                 -- Supplier phone
);

create table supplier_contacts(
                            sp_id int not null auto_increment primary key,                      -- Primary key, auto incrementing
                            supplier_id int not null,                                           -- Supplier id, foreign key to supplier
                            user_id int not null                                                -- User id, foreign key to user
                            contact_role text not null                                          -- Contact role
);

create table orders(
                    order_id int not null auto_increment primary key,                          -- Primary key, auto incrementing
                    order_date date not null,                                                  -- Date when the order was made
                    order_status varchar(60) not null,                                         -- Order status
                    user_id int not null,                                                      -- Must be a client id to work, foreign key to user
                    order_total decimal(10,2) not null                                         -- Total price of the order
);

create table order_details(
                            details_id int not null auto_increment primary key,                 -- Primary key, auto incrementing
                            order_id int not null,                                              -- Order id, foreign key to order
                            product_id int not null,                                            -- Product id, foreign key to product
                            details_quantity int not null,                                      -- Quantity of each product
                            product_unit_price decimal(10,2) not null                           -- Price of each product
);

create table stocks(
                    stock_id int not null auto_increment primary key,                           -- Primary key, auto incrementing
                    product_id int not null,                                                    -- Product id, foreign key to product
                    quantity int not null                                                       -- Quantity of each product was moved
);

create table payments(
                    payment_id int not null auto_increment primary key,                         -- Primary key, auto incrementing
                    order_id int not null,                                                      -- Order id, foreign key to order
                    payment_method varchar(60) not null,                                        -- Payment method
                    payment_date date not null,                                                 -- Date when the payment was made
                    payment_status varchar(60) not null                                         -- Payment status
                    payment_total decimal(10,2) not null                                        -- Total price of the payment
);

-- Foreign Keys Constraints

alter table user 
add constraint user_fk_class
foreign key (class_id) references class(class_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

alter table product
add constraint product_fk_category
foreign key (category_id) references category(category_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

alter table product
add constraint product_fk_supplier
foreign key (supplier_id) references supplier(supplier_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

alter table supplier_contact
add constraint supplier_contact_fk_supplier
foreign key (supplier_id) references supplier(supplier_id)
ON DELETE CASCADE;

alter table supplier_contact
add constraint supplier_contact_fk_user
foreign key (user_id) references user(user_id)
ON DELETE CASCADE;

alter table orders
add constraint orders_fk_user
foreign key (user_id) references user(user_id)
ON DELETE RESTRICT ON UPDATE CASCADE;

alter table order_details
add constraint order_details_fk_order
foreign key (order_id) references orders(order_id)
ON DELETE CASCADE;

alter table order_details
add constraint order_details_fk_product
foreign key (product_id) references product(product_id)
ON DELETE CASCADE;

alter table stocks
add constraint stocks_fk_product
foreign key (product_id) references product(product_id)
ON DELETE CASCADE;

alter table payments
add constraint payments_fk_order
foreign key (order_id) references orders(order_id)
ON DELETE CASCADE;