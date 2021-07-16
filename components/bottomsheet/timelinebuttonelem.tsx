import React from "react";
import Icon from "react-native-vector-icons/Feather";

const timelinebutton = (timelinestate) => {    
    const local = () => <Icon name="box" size={45} color={timelinestate === "localTimeline" ? 'rgba(255,255,255,0.9)' : 'rgb(180,180,230)'} />
    const home = () => <Icon name="home" size={45} color={timelinestate === "homeTimeline" ? 'rgba(255,255,255,0.9)' : 'rgb(180,180,230)'} />
    const global = () => <Icon name="globe" size={45} color={timelinestate === "globalTimeline" ? 'rgba(255,255,255,0.9)' : 'rgb(180,180,230)'} />
    const hybrid = () => <Icon name="shuffle" size={45} color={timelinestate === "hybridTimeline" ? 'rgba(255,255,255,0.9)' : 'rgb(180,180,230)'} />
    return [{"element":local},{"element":home},{"element":global},{"element":hybrid}];
}

export default timelinebutton;