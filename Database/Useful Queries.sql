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

select cli_name, det_id, prod_id from client
inner join orders on ord_cli_id = cli_id
inner join order_details on ord_id = det_ord_id
inner join product on det_prod_id = prod_id;