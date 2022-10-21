const allocation = props => {
  const data = props.data;
  let name;
  let ifNoName;
  let avatarUrl;
  try {
    const getNameRes = getName(data);
    name = getNameRes.name;
    ifNoName = getNameRes.ifNoName;
    avatarUrl = data.user.avatarUrl;
  } catch (error) {
    console.log(error);
    console.log('error length: ', data.length);
    name = '???';
    avatarUrl =
      'https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Question_mark_%28black%29.svg/800px-Question_mark_%28black%29.svg.png';
  }
  return {name, avatarUrl, ifNoName};
};
const getName = (data: any) => {
  if (data.user.name !== null && data.user.name !== '') {
    return {name: data.user.name, ifNoName: false};
  } else if (data.user.username) {
    return {name: '@' + data.user.username, ifNoName: true};
  }
};

export default allocation;
