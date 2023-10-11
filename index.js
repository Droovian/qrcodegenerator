import express from "express";
import { dirname } from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";
import qrcode from "qrcode";

const __dirname = dirname(fileURLToPath(import.meta.url));
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/home/home.html");
});

app.post("/submit", async (req, res) => {
    try {
        const user_url = req.body.url;

        const qrCodeDataUrl = await qrcode.toDataURL(user_url);

        res.send(`
            <div id="qrcode-container">
                <img id="qrcode-image" src="${qrCodeDataUrl}" alt="QR Code">
            </div>
        `);
    } catch (err) {
        console.error(err);
        res.status(500).send("Error generating QR code for entered URL, retry!");
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
