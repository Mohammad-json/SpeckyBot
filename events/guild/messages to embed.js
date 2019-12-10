const { RichEmbed } = require('discord.js')

module.exports = async (bot, msg) => {
    const s_settings = require('../../s_settings.json')
    const u_settings = require('../../u_settings.json')
    var color;
    try{
        if (msg.author.id == bot.user.id || msg.channel.type == "dm") return;
        if(s_settings[msg.guild.id]){
            if(s_settings[msg.guild.id].mtechannel){
                if(s_settings[msg.guild.id].mtechannel.includes(msg.channel.id)){
                    try{
                        if(u_settings[msg.member.id]){
                            if(u_settings[msg.member.id].embedcolor){
                                color = `${u_settings[msg.member.id].embedcolor}`;
                            }
                        }else{
                            color = `${(Math.random()*0xFFFFFF<<0).toString(16)}`;
                        }
                        await msg.delete();
                        if(msg.content){
                            var embed = new RichEmbed()
                                .setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`)
                                .setDescription(`${msg.content}`)
                                .setColor(`#${color}`);
                            if(msg.attachments.length == 1){
                                embed.setImage(msg.attachments[0].url)
                            }
                            await msg.channel.send(embed);
                            if(msg.attachments.length > 1){
                                msg.attachments.forEach(att => {
                                    var embed2 = new RichEmbed().setAuthor(`${msg.author.username}`, `${msg.author.avatarURL}`).setImage(msg.attachments[0].url)
                                    msg.channel.send(embed2);
                                })
                            }
                        }
                        if(msg.embeds.length){
                            await msg.embeds.forEach(emb => msg.channel.send(new RichEmbed(emb).setThumbnail(msg.author.avatarURL)))
                        }
                    }catch(e){
                        console.log(`Error in MTE system (message.js) occurred: ${msg.channel.id}, ${msg.guild.id}`);
                    }
                }
            }
        }   
    }catch(err){console.log(err)}
}

module.exports.config = {
    event: "message"
}