const express = require("express");
const nodemailer = require("nodemailer");
const app = express();
require("dotenv").config();
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: "SENDER_EMAIL",
        pass: "SENDER_EMAIL_PASS",
    },
});

app.post("/send-email", (req, res) => {
    const { email, orderId } = req.body;
    const mailOptions = {
        from: "SENDER_EMAIL",
        to: email,
        subject: "Order Confirmation",
        text: `Your order with ID ${orderId} has been successfully created!`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send("Error sending email.");
        }
        res.send({
            success: true,
            message: "Email sent successfully",
            info: info.response,
        });
    });
});

const PORT = 4000;
app.listen(PORT, () => {
    console.log(`Email service running on port ${PORT}`);
});
