module.exports = {
    name: "primes",
    description: "Gives you prime numbers!",
    usage: ``,
    category: `misc`,
    accessableby: "Members",
    aliases: ["prime"]
}

const primesPath = './commands/misc/primes/primes.txt';
const { writeFile, readFileSync } = require('fs');

module.exports.run = async (bot, msg) => { 
    const startPrimes = [];
    const primes = [];
    let numb = 1;
    let string = "";

    try{
        startPrimes.push(...JSON.parse(readFileSync(primesPath,{encoding:'UTF8'})));
        numb = startPrimes.last() || 1;
    }catch(err){
        console.log(err);
    }

    async function prime(){
        while(numb++){
            if([...primes,...startPrimes].every(p=>numb%p)){
                primes.push(numb);
                string = `\`\`\`${primes.join(" ")}\`\`\``;
                if(string.length >= 1980){
                    primes.pop();
                    break;
                }
            }
        }
    }
    await prime();

    writeFile(primesPath,JSON.stringify([...startPrimes,...primes]),e=>e?console.error(e):null);

    return msg.channel.send(`\`\`\`${primes.join(" ")}\`\`\``)
}
