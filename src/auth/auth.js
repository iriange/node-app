const jwt = require("jsonwebtoken");
const key = require("../auth/private_key");

module.exports = (req, res, next) => {
  const authorizationHeaders = req.headers.authorization;

  if (!authorizationHeaders) {
    const message =
      "Aucun jeton d'authentification n'a été fourni, Veuillez ajouter un";
    return res.status(401).json({ message });
  }

  const token = authorizationHeaders.split(" ")[1];

  const decodedToken = jwt.verify(token, key, (err, decoded) => {
    if (err) {
      const message =
        "L'utilisateur n'est pas autorisé à accéder a cette ressource";
      return res.status(401).json({ message });
    }
    const userId = decoded.userId
    if (req.body.userId && req.body.userId !== userId) {
        const message = "L'identifiant est invalide"
        return res.status(401).json({message})
    }else{
        next()
    }
  });
};
