import React, {} from 'react';

const switchactionring = (type: string,props: any) =>{
    switch (type) {
        case "renote":
            return {
                background:"#3eb585",
                icon:"refresh-ccw",
              //  text: "",
                text: JSON.stringify(props["data"]["item"]["user"])
            }
        case "follow":
            return {
                background:"#296bd6",
                icon:"user-plus",
                text:"フォローされました"
            }
        case "reply":
            return {
                background:"#2fcccc",
                icon:"message-circle",
                text: props["data"]["item"]["note"]["text"],
            }
        case "reaction":
            return {
                background:"#eb9534",
                icon:"activity",
                text:props["data"]["item"]["note"]["text"],
        }
        case "followRequestAccepted":
            return {
                background:"#293ad6",
                icon:"user-check",
                text: "フォローリクエストが承認されました"
            }
        case "receiveFollowRequest":
            return {
                background:"#563eb5",
                icon:"users",
                text: "フォローリクエストが来ています"
            }
        default:
            return {
                background:"#d62951",
                icon:"help-circle",
                text: "不明な通知"
            }
        }
    }
    
export default switchactionring;