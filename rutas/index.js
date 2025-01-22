import express from "express";

import link from "../config/link.js";

const router = express.Router();

router.get("/", (req, res) => {
    res.render("index", { link });
});

export default router;