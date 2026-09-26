const {Client,GatewayIntentBits,Partials,Collection,Events,ActivityType,REST,Routes}=require('discord.js');
const fs=require('fs'),path=require('path'),config=require('./config'),settings=require('./settings.json');
const client=new Client({intents:[GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildMessages,GatewayIntentBits.MessageContent,GatewayIntentBits.GuildModeration,GatewayIntentBits.GuildPresences],partials:[Partials.Channel,Partials.Message,Partials.User,Partials.GuildMember]});
client.commands=new Collection(); client.settings=settings; client.config=config;
for(const file of fs.readdirSync(path.join(__dirname,'src')).filter(f=>f.endsWith('.js'))){try{const c=require(path.join(__dirname,'src',file));if(c?.data?.name)client.commands.set(c.data.name,c)}catch(e){console.error('[LOAD]',file,e.message)}}
client.once(Events.ClientReady,async c=>{
 console.log(`Logged in as ${c.user.tag}`);
 c.user.setPresence({status:config.status.presence||'dnd',activities:[{name:config.status.text,type:ActivityType.Watching}]});
 try{const rest=new REST({version:'10'}).setToken(config.token);await rest.put(Routes.applicationCommands(config.clientId),{body:[...client.commands.values()].map(x=>x.data.toJSON())});console.log('Global slash commands registered.')}catch(e){console.error('REGISTER',e.message)}
});
client.on(Events.InteractionCreate,async i=>{
 try{
  if(i.isChatInputCommand()){const c=client.commands.get(i.commandName);if(c)await c.execute(i,client);}
  else if(i.isButton()||i.isStringSelectMenu()||i.isModalSubmit()){
   for(const n of ['tickets','apply']){const c=client.commands.get(n);if(c?.handleInteraction)await c.handleInteraction(i,client);}
  }
 }catch(e){console.error(e);const x={content:'❌ حدث خطأ أثناء التنفيذ.',ephemeral:true};if(i.replied||i.deferred)await i.followUp(x).catch(()=>{});else await i.reply(x).catch(()=>{});}
});
client.on(Events.GuildMemberAdd,async m=>{for(const n of ['autorole','welcomer']){const c=client.commands.get(n);if(c?.onMemberAdd)await c.onMemberAdd(m,client)}});
client.on(Events.MessageCreate,async m=>{if(m.author.bot||!m.guild)return;for(const n of ['autoreply','protection','alias']){const c=client.commands.get(n);if(c?.onMessage)await c.onMessage(m,client)}});
client.login(config.token);
