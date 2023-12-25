import express from "express";
import qrImage from "qr-image";
import bodyParser from "body-parser";
import { dirname } from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const port = process.env.PORT || 3000;
const __dirname = dirname(fileURLToPath(import.meta.url));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var showQrCode = false;

app.get("/", (req, res) => {
    res.render("index.ejs", { showQrCode: showQrCode });
})

app.post("/generate", (req, res) => {
    var qrCode = qrImage.image(req.body["URL"], { type: "png" });
    qrCode.pipe(fs.createWriteStream(`${__dirname}/public/images/qrCode.png`));
    res.render("index.ejs", { showQrCode: true, url: req.body["URL"] });
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})