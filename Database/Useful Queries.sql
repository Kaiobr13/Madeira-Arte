select * from class;
select * from client;
select * from supplier;
select * from category;
select * from stocks;
select * from product;

select prod_name as ProductName, prod_price as Price, quantity
from product
inner join stocks on prod_stock_id = stock_id;

select * from logs;
select * from order_details;
select * from orders;

select cli_name as Client, det_id as Details, prod_id as ProductID
from client
inner join orders on ord_cli_id = cli_id
inner join order_details on ord_id = det_ord_id
inner join product on det_prod_id = prod_id;

select img_path from product;

module.exports = router;