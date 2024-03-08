const {Quiz} = require("../../bdd/sequelize")

module.exports = (app)=>{
    app.get("/quiz/:id", (req, res)=>{
        const id = req.params.id
        Quiz.findByPk(id)
            .then(quiz=>{
                if (quiz == null) {
                    const message = "Aucune question avec cet identifiant n'a été trouvé, réessayez un autre identifiant"
                    return res.status(404).json({message})
                }
                const message = "La question a bien été récupéré"
                res.json({message, data: quiz})
                })
            .catch(err=>{
                const message = "Impossible de récupérer la question. Veuillez réessayer dans quelque instant"
                res.status(500).json({message, data:err})
            })
    })
}