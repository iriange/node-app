const {Quiz} = require("../../bdd/sequelize")

module.exports = (app)=>{
    app.get("/quiz", (req, res)=>{
        Quiz.findAll()
        .then(quizs=>{
            const message = "Toutes les questions ont bien été récupéré"
            res.json({message, data: quizs})
        })
        .catch(err=>{
            const message = "Impossible de récupérer la question. Veuillez réessayer dans quelque instant"
            res.status(500).json({message, data:err})
        })
    })
}