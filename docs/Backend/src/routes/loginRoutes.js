const express = require('express');
const router = express.Router();

const cors = require("cors");
router.use(cors());

router.post("/", (req, res) => {

    console.log(req.body, res.body);

    res.status(200).json({
        message: 'Login is success'
    })
});

module.exports = router;