const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// Servir a pasta public normalmente
app.use(express.static(path.join(__dirname, 'public')));

// Outras pastas fora da public
app.use('/imagens', express.static(path.join(__dirname, 'arquivos/imagens')));
app.use('/documentos', express.static(path.join(__dirname, 'arquivos/documentos')));

// Página inicial
app.get('/', (req, res) => {
  res.send('Servidor funcionando!');
});

// Iniciar o servidor
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

