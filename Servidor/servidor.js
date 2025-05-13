

var app = express();
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.set('views', './views');

var server = http.createServer(app);
server.listen(80);

console.log('Servidor rodando ...'.rainbow);

app.get('/', function (requisicao, resposta){
resposta.redirect('home.html')
})

app.get('/inicio', function (requisicao, resposta){
var nome = requisicao.query.info;
console.log(nome);
})

app.post('/inicio', function (requisicao, resposta){
var data = requisicao.body.data;
console.log(data);
})

app.get('/cadastro',function (requisicao, resposta){
var nome = requisicao.query.nome;
var sobrenome = requisicao.query.sobrenome;
var nascimento = requisicao.query.nascimento;
var civil = requisicao.query.civil;

resposta.render('resposta_cadastro', {nome, sobrenome, nascimento, civil})
})


const mongoclient= mongodb.mongoclient;
const url = 'mongodb+srv://Guilherme:<gui6996133>@guilherme.ofbge3g.mongodb.net/?retryWrites=true&w=majority&appName=Guilherme'
const client = new mongoclient(url, {usenewurlparser: true})
var dbo = client.db("exemplo_bd")
var usuarios = dbo.Collection("usuaerios")

app.listen(80, () => {
  console.log('Servidor rodando na porta 80');
});

app.post("/cadastrar_usuario", function(req, resp) {
  var data = { db_nome: req.body.nome, db_login: req.body.login, db_senha: req.body.senha };

  usuarios.insertOne(data, function (err) {
    if (err) {
      resp.render('resposta_usuario', {resposta: "Erro ao cadastrar usuário!"})
    }else {
      resp.render('resposta_usuario', {resposta: "Usuário cadastrado com sucesso!"})        
    };
  });
 
});

