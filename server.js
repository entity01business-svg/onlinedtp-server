const express = require("express");
const path = require("path");

const app = express();

/* Route that shows PDF and auto-triggers print */
app.get("/download-work-order", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Work Order</title>
        <style>
            html, body {
                margin: 0;
                padding: 0;
                height: 100%;
                background: #fff;
            }
            embed {
                width: 100%;
                height: 100%;
            }
        </style>
    </head>
    <body>

        <embed src="/pdf" type="application/pdf" />

        <script>
            // Wait for PDF to render before printing
            setTimeout(function() {
                window.print();
            }, 1500);
        </script>

    </body>
    </html>
    `);
});

/* Direct PDF route */
app.get("/pdf", (req, res) => {
    const filePath = path.join(__dirname, "work-order.pdf");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");
    res.setHeader("Cache-Control", "no-store");

    res.sendFile(filePath);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
