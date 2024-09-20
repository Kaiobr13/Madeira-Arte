create table users(
                    user_id int not null auto_increment primary key,                         -- Primary key, auto incrementing
                    user_name varchar(120),                                                  -- User name, variable length
                    user_email varchar(120) unique not null,                                 -- User email, it is unique and not null
                    user_place varchar(60),                                                  -- User Address
                    user_password varchar(60) not null                                       -- User password, fixed length
);

create table product(
                    product_id int not null auto_increment primary key,                       -- Primary key, auto incrementing
                    product_name text,                                                        -- Product name, variable lenght
                    product_type_id int,                                                      -- Product type, Foreign Key
                    product_price decimal(13,2) not null,                                     -- Product value, fixed lenght
                    product_logo longblob,                                                    -- Product logo, binary data
                    product_quantity int not null                                             -- Product quantity
); 

create table productType(
                        type_id int not null auto_increment primary key,                      -- Primary key, auto incrementing
                        type_name varchar(60) not null                                        -- Product type name, variable length
);                     