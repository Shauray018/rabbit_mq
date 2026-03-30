const amqp = require("amqplib"); 

async function sendMessage(routingKey, message) {
    try { 
        const connection = await amqp.connect("amqp://localhost"); 
        const channel = await connection.createChannel(); 
        const exchange = "notification_exchange"; 
        const exchangeType = "topic";

        await channel.assertExchange(exchange, exchangeType, {durable: false});
        

        channel.publish(exchange, routingKey, Buffer.from(JSON.stringify(message)), {persistent: true}); 
        console.log("Mail data was sent", routingKey, message); 

        setTimeout(() => { 
            connection.close(); 
        }, 500); 
    } catch (error) { 
        console.log(error);
    }
}

sendMessage("order.placed", {orderId: 1234, status: "placed"}); 
sendMessage("payment.processed", {paymentId: 5678, status: "processed"})


// const routingKeyOne = "send_mail_to_user";
        // const routingKeyTwo = "send_mail_to_subscribed_users";  

        // const message = { 
        //     to: "arun@gmail.com",
        //     from: "oji@gmail.com", 
        //     subject: "thanks", 
        //     body: "hello chacha"
        // }
        
        // await channel.assertQueue("mail_queue_to_user", {durable: false});
        // await channel.assertQueue("mail_queue_to_subscribed_users", {durable: false});

        // await channel.bindQueue("mail_queue_to_user", exchange, routingKeyOne);
        // await channel.bindQueue("mail_queue_to_subscribed_users", exchange, routingKeyTwo); 