const {Quiz} = require("../../bdd/sequelize")

module.exports = (app)=>{
    app.post("/quiz", (req, res)=>{
        const body = req.body
        Quiz.create(body)
            .then(quiz=>{
                const message = `La question '${body.question}' a bien été créé`
                res.json({message, data: quiz})
            })
            .catch(err=>{
                const message = "Impossible de récupérer la question. Veuillez réessayer dans quelque instant"
                res.status(500).json({message, data:err})
            })
    })
}