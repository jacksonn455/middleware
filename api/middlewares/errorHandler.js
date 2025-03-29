module.exports = (err, req, res, next) => {
    console.error(err.stack); 
    // Exibe o stack trace do erro no console para debugging
  
    const statusCode = err.statusCode || 500; 
    // Usa o status do erro se estiver definido, senão retorna 500 (Erro Interno do Servidor)
  
    const message = err.message || 'Erro interno do servidor'; 
    // Usa a mensagem do erro ou um texto padrão
  
    res.status(statusCode).json({
      status: 'error', 
      statusCode, 
      message
    }); 
    // Retorna a resposta em formato JSON com detalhes do erro
  };
  