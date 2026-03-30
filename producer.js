const amqp = require("amqplib"); 

async function sendMessage(product) {
    try { 
        const connection = await amqp.connect("amqp://localhost"); 
        const channel = await connection.createChannel();

        const exchange = "new_product_launch"; 
        const exchangeType = "fanout";

        await channel.assertExchange(exchange, exchangeType, {durable: false});

        const message = JSON.stringify(product);

        channel.publish(exchange, "", Buffer.from(message), {persistent: true}); 
        console.log(" Sent =>", message); 

        setTimeout(() => { 
            connection.close(); 
        }, 500); 
    } catch (error) { 
        console.log(error);
    }
}

sendMessage({id: 123, name: "iphone 19 Pro", price: 200000})

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