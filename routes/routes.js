const { findLigData } = require('../middleware/mongodbOperationsMiddleware')
module.exports = function (app) {
  
    app.get('/saml-sp',async (req,res)=>{
        const result = await findLigData(req.db)
        res.send(result)
    });
    
};