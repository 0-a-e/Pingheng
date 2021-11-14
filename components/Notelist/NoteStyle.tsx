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
    reactionpill:{
      position:"relative",
      marginLeft: 'auto',
      right:10,
      marginTop:0,
      zIndex:10
    },
    incardcontainer:{
      height: 77,
      flexDirection: 'column',
      //width: "100%",
      width: "74%",
    },
    topcontainer:{
      width: "100%",
      flexDirection: 'row',
      paddingTop: 5
    },
    /*RT系*/
    RTicon:{
      marginTop:5,
      marginLeft:32,
      color: "#fff"
  
    },
    RT1container:{
      flexDirection: 'row',
      position: 'relative',
      marginTop: 5,
      zIndex:-3,
    },
    RTtext:{
      color: "#fff",
      fontSize: 13,
      width: "100%",
    },
    RT2container:{
      height:25,
      width: 77,
      marginLeft:-30,
      zIndex:-3,
      backgroundColor:"#3eb585",
    },
    RTtextcontainer:{
      backgroundColor:"#3eb585",
      borderTopEndRadius: 50,
      borderBottomEndRadius:50,
      paddingLeft: 5,
      justifyContent: 'center',
      paddingRight:5,
      maxWidth: "65%"

    },
    normalcontainer:{
      width: "100%",
      flexDirection: 'column',
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
    /*RT系ここまで*/
    notetext:{
      color:　"#fff",
    },
    avatar: {
        backgroundColor: "rgba(230,230,230,1)",
        height: 77,
    },
  
    notebox:{
      marginLeft: 5,
      //width: "85%",
      width: 100,
      height: 100,
      backgroundColor: "#ffffff"
    },
    name:{
      color: "#fff",
      flexDirection:'row',
      maxWidth: 100,
},
    uncontainer:{
      height:20,
//      width:20
    },
    username:{
      color: "rgba(200,200,200,1)",
      marginLeft: 5,
      fontSize: 14,
      height:20,
      flexDirection: 'row',
      alignItems: 'center',
      maxWidth: 100,
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

      
