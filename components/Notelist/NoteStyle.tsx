import { StyleSheet} from 'react-native';


const notestyles = StyleSheet.create({
    card:{
      borderRadius: 50,
      backgroundColor: "rgb(31,34,42)",
      borderWidth: 0,
      padding: 0,
      height: 77
    },
  
    cardwrapper:{
      flexDirection: 'row',
    },
  
    topcontainer:{
      width: "100%",
      flexDirection: 'row',
      paddingTop: 5
    },
    RTicon:{
      marginTop:5,
      marginLeft:32,
      color: "#fff"
  
    },
    RT1container:{
      flexDirection: 'row',
      position: 'relative',
      zIndex:-3,
    },
    RTtext:{
      color: "#fff",
      fontSize: 13,
      marginTop:3
    },
    RTtextcontainer:{
      backgroundColor:"#3eb585",
      borderTopEndRadius: 50,
      borderBottomEndRadius:50,
      marginTop:5,
      paddingLeft: 5,
      paddingRight:5,
      maxWidth: "65%"

    },
    topRTcontainer:{
      height:25,
      width: 77,
      marginTop: 5,
      marginLeft:-30,
      backgroundColor:"#3eb585",
    },
    normalcontainer:{
      width: "87%",
      flexDirection: 'column',
      paddingTop: 5,
    },
    notetext:{
      color:　"#fff",
    },
    avatar: {
        backgroundColor: "rgba(230,230,230,1)",
        height: 77
    },
    renoteavatarcontainer:{
      position: "absolute",
      height:25,
      width:25,
      marginRight:3,
      marginLeft:52
    },
    renoteavataroverlay:{
      backgroundColor: "rgba(230,230,230,1)",
    },
  
    notebox:{
      marginLeft: 5,
      //width: "85%",
      width: 100,
      height: 100,
      backgroundColor: "#ffffff"
    },
    name:{
      color: "#fff"
    },
    username:{
      color: "rgba(200,200,200,1)",
      marginLeft: 5
    },
  
    incardcontainer:{
      height: 77,
      flexDirection: 'column',
      //rowにすればtitleの位置は合うけど横ならびになって本文が見えなくなる
      //Avaterの位置変更で修正済み
    },
    linkbox:{
      position: 'absolute',
      zIndex:18,
      height: 77,
      width:60,
      right:0,
      borderTopEndRadius:50,
      borderBottomEndRadius:50,
      justifyContent: 'center', //Centered vertically
    //  paddingLeft:83,  
      backgroundColor:"#343640"

}});

export default notestyles;

      
