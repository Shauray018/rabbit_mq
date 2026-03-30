const amqp = require("amqplib");  


async function recieveMail() {
    try { 
        const connection = await amqp.connect("amqp://localhost"); 
        const channel = await connection.createChannel(); 

        const exchange = "new_product_launch";
        const exchangeType = "fanout";
        
        await channel.assertExchange(exchange, exchangeType, {durable: false}); 

        const queue = await channel.assertQueue("", {exclusive: true}); 
        console.log("Waiting for messages => ", queue)

        await channel.bindQueue(queue.queue, exchange, "");

        console.log("waiting for messages"); 

        channel.consume(queue.queue, (message) => { 
            const product = JSON.parse(message.content.toString());
            if (message !== null) { 
                console.log("sms notification has been recieved!!", product.name); 
                channel.ack(message); 
            }
        })
    } catch(error) { 
        console.log(error); 
    }
    
}

recieveMail(); 