// Dados
const proffys = [
        {
            name: "Diego Fernandes",
            avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4", whatsapp: "989987654",
            bio: "Entusiasta das melhores tecnologias de química avançada. <br><br> Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
            subject: "Química",
            cost: "20",
            weekday: [0],
            time_from: [720],
            time_to: [1220]
        },
        {
            name: "Daniele Evangelista",
            avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&v=4", whatsapp: "989987654",
            bio: "Entusiasta das melhores tecnologias de química avançada. <br><br> Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
            subject: "Química",
            cost: "20",
            weekday: [0],
            time_from: [720],
            time_to: [1220]
        }
    ]

const subjects = [
    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [
    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

    
// Funcionalidades

// "Converte" o identificador único da matéria em seu nome por capturar a posição e subtrair um número. Sendo assim, ele retorna o texto da posição, que nesse caso, é a matéria.
function getSubject(subjectNumber){
    const position = +subjectNumber - 1
    return subjects[position]
}

function pageLanding(req, res) {
    return res.render("index.html")
}

function pageStudy(req, res) {
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays}) // Não esquecer de adicionar os vetores nessa linha de retorno
}

function pageGiveClasses(req, res) {
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0 // Criou-se uma constante com um objeto que calcula a quantidade dos dados(nosso objetivo) dentro de um vetor, também criado por ele. Ele identifica que para essa constante, o tamanho de dados inseridos tem que ser maior que zero.

    // Estrutra condicional para adicionar apenas quando todos os dados estiverem inseridos.
    if (isNotEmpty){

        // Usamos a função getSubject criada mais acima para atribuir ao espaço da matéria de fato o seu nome e não mais seu identificador único no projeto.
        data.subject = getSubject(data.subject)
        // Por fim, adiciona os dados no vetor.
        proffys.push(data)
        // Logo, caso sejam adicionadas as informações com sucesso no nosso vetor Proffys. A página vai recarregar e redirecionar o usuário para a página study.html, já declarada na parte de baixo deste documento.
        return res.redirect("/study")
    }
    else {
        return res.render("give-classes.html", {subjects, weekdays})
    }
}

// Servidor
const express = require('express')
const server = express()

// Configuração do Nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

server
// Configurando os arquivos estáticos — CSS, Scripts e Imagens
    .use(express.static("public"))
    // Configurando as nossas páginas
    .get("/", pageLanding)
    .get("/study", pageStudy)
    .get("/give-classes", pageGiveClasses)
    // Configurando a porta que será aberto o servidor
    .listen(5500)