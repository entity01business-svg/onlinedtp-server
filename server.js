const express = require("express");
const path = require("path");

const app = express();

app.get("/work-order.pdf", (req, res) => {
    const filePath = path.join(__dirname, "work-order.pdf");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    res.sendFile(filePath);
});

app.get("/download-work-order", (req, res) => {
    res.redirect(302, "/work-order.pdf");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
