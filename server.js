const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();

app.get("/download-work-order", (req, res) => {
    const filePath = path.join(__dirname, "work-order.pdf");

    const stat = fs.statSync(filePath);

    res.writeHead(200, {
        "Content-Type": "application/pdf",
        "Content-Disposition": 'attachment; filename="work-order.pdf"',
        "Content-Length": stat.size,
        "Cache-Control": "no-store"
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
