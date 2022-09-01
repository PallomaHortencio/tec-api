import mysql from 'mysql2';

/* Configurando a conexão */
const conexao = mysql.createConnection({
   /*LOCAL  
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'escola' */

    /* REMOTO */
    host: "srv28.prodns.com.br",
    user: "webmaio1_hortenc",
    password: "palloma2001",
    database: "webmaio1_escolapalloma"
});


/* Conectando ao banco de dados */
//conexao.connect();

conexao.connect (erro => {
    if(erro) {
    console.error(`Erro ao conectar: ${erro.message}`);
    } else {
        console.log(`Banco conectado em: ${conexao.config.host}`);
    }
})

export default conexao;