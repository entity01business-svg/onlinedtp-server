const express = require("express");
const path = require("path");

const app = express();

app.get("/download-work-order", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Work Order</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            html, body {
                margin:0;
                padding:0;
                height:100%;
                background:#fff;
            }
            iframe {
                position:absolute;
                width:100%;
                height:100%;
                border:none;
            }
        </style>
    </head>
    <body>

        <iframe id="pdfFrame" src="/pdf"></iframe>

        <script>
            const frame = document.getElementById("pdfFrame");

            frame.onload = function() {
                setTimeout(() => {
                    try {
                        frame.contentWindow.focus();
                        frame.contentWindow.print();
                    } catch(e) {
                        window.print();
                    }
                }, 1200);
            };
        </script>

    </body>
    </html>
    `);
});

app.get("/pdf", (req, res) => {
    const filePath = path.join(__dirname, "work-order.pdf");

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader("Content-Disposition", "inline");

    res.sendFile(filePath);
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
