select * from class;
select * from client;
select * from supplier;
select * from category;
select * from stocks;
select * from product;

select prod_name, prod_price, quantity
from product
inner join stocks on prod_stock_id = stock_id;

select * from logs;
select * from order_details;
select * from orders;