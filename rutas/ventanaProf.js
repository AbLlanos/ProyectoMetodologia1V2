
const router = express.Router();

router.get("/ventanaProfesor", function(req, res) {
    
    if(req.session.login){
        res.render("index",{link});
    }else{
        res.render("inicio", {datos: req.session,link});
    }

});

export default router;