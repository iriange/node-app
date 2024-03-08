const {Quiz} = require("../../bdd/sequelize")

module.exports = (app)=>{
    app.put("/quiz/:id", (req, res)=>{
        const id = req.params.id
        const body = req.body
        Quiz.update(body, {where: {id:id}})
            .then((_)=>{
            return Quiz.findByPk(id)
                .then((quiz)=>{
                    if (quiz == null) {
                        const message = "Aucune question avec cet identifiant n'a été trouvé, réessayez un autre identifiant"
                        return res.status(404).json({message})
                    }
                    const message = `La question n°${id} a bien été modifié`
                    res.json({message, data: quiz})
                })
            })
            .catch(err=>{
                const message = "Impossible de récupérer la question. Veuillez réessayer dans quelque instant"
                res.status(500).json({message, data:err})
            })
    })
}