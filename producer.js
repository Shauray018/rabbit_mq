const amqp = require("amqplib"); 

async function sendNotification(headers, message) {
    try { 
        const connection = await amqp.connect("amqp://localhost"); 
        const channel = await connection.createChannel();

        const exchange = "header_exchange"; 
        const exchangeType = "headers";

        await channel.assertExchange(exchange, exchangeType, {durable: false});

        channel.publish(exchange, "", Buffer.from(message), {
            persistent: true, 
            headers
        }); 

        console.log("Sent notification with headers!!"); 

        setTimeout(() => { 
            connection.close(); 
        }, 500); 
    } catch (error) { 
        console.log(error);
    }
}

sendNotification({"x-match": "all", "notification-type": "new_video", "content_type": "video"}, "new music video is uploaded"); 
sendNotification({"x-match": "all", "notification-type": "live_stream", "content_type": "gaming"}, "new music video is uploaded")
sendNotification({"x-match": "any", "notification-type-comment": "comment", "content_type": "vlog"}, "new music video is uploaded")
sendNotification({"x-match": "any", "notification-type-like": "like", "content_type": "vlog"}, "new music video is uploaded")






// sendMessage({id: 123, name: "iphone 19 Pro", price: 200000})

// sendMessage("order.placed", {orderId: 1234, status: "placed"}); 
// sendMessage("payment.processed", {paymentId: 5678, status: "processed"})


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