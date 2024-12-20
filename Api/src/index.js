console.log('Servidor está inicializando...');

const express = require('express');
const app = express();
const cors = require('cors');
const clientsRouter = require('./routes/clients');
const productsRouter = require('./routes/products');
const ordersRouter = require('./routes/orders');
const recommendationsRouter = require('./routes/recommendations'); // Nova rota


const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.json({ message: 'ok' });
});

app.use('/clients', clientsRouter);
app.use('/products', productsRouter);
app.use('/orders', ordersRouter);
app.use('/recommendations', (req, res) => res.send('Testando rota'));
app.use('/recommendations', recommendationsRouter); // Adicionar a rota de recomendações

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });
  return;
});

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
