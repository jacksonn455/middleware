module.exports = (req, res, next) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    // Loga no console a data/hora atual, o método HTTP (GET, POST, etc.) e a URL da requisição
  
    next(); 
    // Chama o próximo middleware na cadeia de execução
  };
  