
//Dados
const proffys = [
    {
        name:"Diego Fernandes", 
        avatar:"https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp:"899889829", 
        bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
        subject:"Química", 
        cost:"20",
        weekday:[0], 
        time_from:[720], 
        time_to:[1220]
    },
    {
        name:"Leonardo Rezende", 
        avatar:"https://scontent.fbfh14-1.fna.fbcdn.net/v/t1.0-9/69613147_486965212140146_1498633575564574720_n.jpg?_nc_cat=108&_nc_sid=09cbfe&_nc_eui2=AeGEeRh7J9MBEVad-IfV_yeyosqAJLRrABOiyoAktGsAE79XmtjLL9Y1VngYayMu7XU_Eq_5lhY4kquU7XLqBlj_&_nc_ohc=qzUyixllgsIAX-ujIlg&_nc_ht=scontent.fbfh14-1.fna&oh=16385b5a22ac4695fdc80c141a9a29bd&oe=5F50E02C",
        whatsapp:"899889829", 
        bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões",
        subject:"Matemática", 
        cost:"30",
        weekday:[1], 
        time_from:[720], 
        time_to:[1220]
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
    "Química"
]

const weekdays = [
    "Domingo",
    "Terça-feira",
    "Segunda-feira",
    "Quinta-feira",
    "Quarta-feira",
    "Sábado",
    "Sexta-feira"
]

//Funcionalidades
function getSubject(subjectNumber) {
    const position = +subjectNumber-1
    return subjects[position]
}

function pageLanding(req, res){
    return res.render("index.html")
}

function pageStudy(req, res){
    const filters = req.query
    return res.render("study.html", {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(req, res){
    const data = req.query

    const isNotEmpty = Object.keys(data).length > 0
    //se tiver dados
    if(isNotEmpty) {

        data.subject = getSubject(data.subject)
        //Adicionar dados a lista de proffys
        proffys.push(data)
        return res.redirect("/study")
    }

    //se nao, mostrar a pagina
    return res.render("give-classes.html", {subjects, weekdays})
}

//Servidor
const express = require('express')
const server = express()

//importar e configurar nunjucks
const nunjucks = require('nunjucks')
nunjucks.configure('src/views',{ 
    express: server,
    noCache: true,
})

//Inicio e configuração do servidor
server
// configurar arquivos estáticos (css, scripts, imagens)
.use(express.static("public"))
//rotas da aplicação
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
//start do servidor
.listen(5500)