import express from "express";

import link from "../config/link.js";

const router = express.Router();

router.get("/ventanaProfesor", function(req, res) {
    
    if(req.session.login){
        res.render("index",{link});
    }else{
        res.render("inicio", {datos: req.practica,link});
    }

});

export default router;