const configureCORS = (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
  
    if (req.method === "OPTIONS") {
      res.setHeader("Access-Control-Allow-Methods", "PUT, POST, DELETE, PATCH, GET");
      return res.status(200).json({});
    }
  
    next();
  };
  
  module.exports = configureCORS;
  