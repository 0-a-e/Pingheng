export const serverInfoCustomEmojisSchema = {
  name: 'serverInfoCustomEmojis',
  properties: {
    id: 'string',
    aliases: {type: 'list', objectType: 'string'},
    name: 'string',
    category: {type: 'string', optional: true},
    host: {type: 'bool', optional: true},
    url: 'string',
  },
};
