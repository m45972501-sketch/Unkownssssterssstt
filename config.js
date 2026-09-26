module.exports = {
  "token": "token",
  "clientId": "id-bot",
  "status": {
    "type": "WATCHING",
    "text": "/help | 🇵🇸🇱🇧",
    "presence": "dnd"
  },
  "prefix": "/",
  "tickets": {
    "categoryId": "",
    "supportRoleId": "",
    "logChannelId": "",
    "counter": 0,
    "types": [
      {
        "name": "استفسار",
        "value": "question",
        "emoji": "❓"
      },
      {
        "name": "دعم فني",
        "value": "support",
        "emoji": "🛠️"
      },
      {
        "name": "بارنتر تكت",
        "value": "partner",
        "emoji": "🤝"
      },
      {
        "name": "تقديم ميديا",
        "value": "media",
        "emoji": "🎥"
      },
      {
        "name": "بلاغ عن خطأ",
        "value": "bug",
        "emoji": "🐛"
      },
      {
        "name": "تشهير",
        "value": "defamation",
        "emoji": "🚨"
      }
    ]
  },
  "apply": {
    "enabled": true,
    "channelId": "",
    "reviewChannelId": "",
    "reviewRoleId": "",
    "logsChannelId": ""
  },
  "autorole": {
    "enabled": false,
    "roleId": ""
  },
  "welcomer": {
    "enabled": false,
    "channelId": "",
    "message": "أهلًا بك {user} في {server}!"
  },
  "protection": {
    "enabled": false,
    "antiLink": false,
    "antiBot": false
  },
  "broadcast": {
    "enabled": true
  },
  "languageSettings": {
    "default": "ar"
  }
};
