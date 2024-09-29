const express = require("express");
//const axios = require("axios");
const registerEmailSentEvent = async (orderId, userEmail) => {
    const event = {
        orderId,
        userEmail,
        timestamp: new Date().toISOString(),
        type: "EMAIL_SENT",
    };
    await axios.post(
        "https://your-event-orchestrator-url.com/api/events",
        event
    );
    console.log("Email sent event registered:", event);
};

const sendOrderConfirmationEmail = async (orderId, userEmail) => {
    try {
        await axios.post("http://localhost:5000/sendemail", {
            to: userEmail,
            subject: "Order Confirmation",
            text: `Your order (ID: ${orderId}) has been created successfully!`,
        });
    } catch (error) {
        throw new Error("Error sending email.");
    }
};

module.exports = {
    sendOrderConfirmationEmail,
    registerEmailSentEvent,
};
