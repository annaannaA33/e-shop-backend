const events = require("events");
const axios = require("axios");
const logger = require("../logger/logger");

const eventEmitter = new events.EventEmitter();

// TODO Импорт функции отправки email понять как!
async function sendEmail(to, subject, text) {
    // try {
    let config = {
        method: "post",
        // maxBodyLength: Infinity,
        url: "https://e-shop-email-microservice.onrender.com/sendemail",
        headers: {
            "Content-Type": "application/json",
        },
        data: {
            to,
            subject,
            text,
        },
    };

    const response = await axios.post(config);
    return response.data;
}
// TODO Определяем событие для успешного создания заказа
eventEmitter.on("orderCreated", async (orderId, userEmail) => {
    console.log(
        `Processing orderCreated event for orderId: ${orderId}, userEmail: ${userEmail}`
    );

    try {
        // Формируем данные для отправки email
        const emailData = {
            to: userEmail,
            subject: "Order Confirmation",
            text: `Your order with ID ${orderId} has been successfully created. Thank you for shopping with us!`,
        };
        // TODO Вызов функции отправки email через отдельный сервис поdумать как сделать
        // to, subject, text
        await sendEmail(emailData.userEmail, emailData.subject, emailData.text);
        
    } catch (error) {
        console.error("Error sending email:", error.message);
    }
});

module.exports = eventEmitter;
