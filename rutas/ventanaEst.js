import express from "express";

import link from "../config/link.js";

const router = express.Router();

router.get("/ventanaEstudiante", function(req, res) {
    
    if(req.session.login){
        res.render("index",{link});
    }else{
        res.render("inicio", {datos: req.session,link});
    }

});

export default router;