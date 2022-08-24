const allocation = props => {
  const data = props.data;
  let name;
  let avatarUrl;
  try {
    name = getName(data);
    avatarUrl = data.user.avatarUrl;
  } catch (error) {
    console.log(error);
    console.log('error length: ', data.length);
    name = '???';
    avatarUrl =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png';
  }
  return {name, avatarUrl};
};
const getName = (data: any) => {
  if (data.user.name != null) {
    return data.user.name;
  } else if (data.user.username && data.user.name == null) {
    return '@' + data.user.username;
  }
};

export default allocation;
