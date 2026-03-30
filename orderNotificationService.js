const amqp = require("amqplib");  


async function recieveMail() {
    try { 
        const connection = await amqp.connect("amqp://localhost"); 
        const channel = await connection.createChannel(); 
        const exchange = "notification_exchange";
        const exchangeType = "topic";  
        const queue = "order_queue"; 

        await channel.assertExchange(exchange, exchangeType, {durable: false}); 
        await channel.assertQueue(queue, {durable: false}); 

        await channel.bindQueue(queue, exchange, "order.*");

        console.log("waiting for messages"); 

        channel.consume(queue, (message) => { 
            if (message !== null) { 
                console.log("order message has been recieved!!", message.content.toString()); 
                channel.ack(message); 
            }
        })
    } catch(error) { 
        console.log(error); 
    }
    
}

recieveMail(); 