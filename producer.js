const amqp = require("amqplib"); 

async function sendMail() {
    try { 
        const connection = await amqp.connect("amqp://localhost"); 
        const channel = await connection.createChannel(); 
        const exchange = "mail_exchange"; 
        const routingKeyOne = "send_mail_to_user";
        const routingKeyTwo = "send_mail_to_subscribed_users";  

        const message = { 
            to: "arun@gmail.com",
            from: "oji@gmail.com", 
            subject: "thanks", 
            body: "hello chacha"
        }

        await channel.assertExchange(exchange, "direct", {durable: false});
                
        await channel.assertQueue("mail_queue_to_user", {durable: false});
        await channel.assertQueue("mail_queue_to_subscribed_users", {durable: false});

        await channel.bindQueue("mail_queue_to_user", exchange, routingKeyOne);
        await channel.bindQueue("mail_queue_to_subscribed_users", exchange, routingKeyTwo); 

        channel.publish(exchange, routingKeyTwo, Buffer.from(JSON.stringify(message))); 
        console.log("Mail data was sent", message); 

        setTimeout(() => { 
            connection.close(); 
        }, 500); 
    } catch (error) { 
        console.log(error);
    }
}

sendMail(); 