export const noteSettingsSchema = {
  name: 'noteSettings',
  properties: {
    visibility: {type: 'string', default: 'home'},
    localOnly: {type: 'bool', default: false},
    visibleUserIds: {type: 'string[]', default: []},
  },
};
