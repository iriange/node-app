const {Quiz} = require("../../bdd/sequelize")

module.exports = (app)=>{
    app.get("/api/user/:id", (req, res)=>{
        const id = req.params.id
        Quiz.findByPk(id)
            .then(user=>{
                if (user == null) {
                    const message = "Aucun utilisateur avec cet identifiant n'a été trouvé, réessayez un autre identifiant"
                    return res.status(404).json({message})
                }
                const message = "L'utilisateur a bien été récupéré"
                res.json({message, data: user})
                })
            .catch(err=>{
                const message = "Impossible de récupérer la question. Veuillez réessayer dans quelque instant"
                res.status(500).json({message, data:err})
            })
    })
}