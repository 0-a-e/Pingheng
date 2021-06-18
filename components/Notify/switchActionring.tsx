import React, {} from 'react';

const switchactionring = (type: string,props: any) =>{
    switch (type) {
        case "renote":
         // json位置の参考用　消さない
         //   console.log("333---");
         //   console.log(props["data"]["item"]["note"]["renote"]["text"]);
         //未実装: pollvote
            return {
                background:"#3eb585",
                icon:"refresh-ccw",
              //  text: "",
                text: props["data"]["item"]["note"]["renote"]["text"]
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
        case "quote":
            //console.log("333---");
            //これは元ツイートの文章
            //console.log(props["data"]["item"]["note"]["renote"]["text"]);     
            //  鍵アカウントのときはNullになるぽい？
            // いや　鍵外してもnullか ["note"]にそもそもないぽい　["data"]["item"]でもなし？　全部でもIDもtextもない　意味わからん　諦め
            console.log(props);
            return {
                background:"#3ea9b5",
                icon:"git-branch",
                text: "引用リノートされました"
            }
        case "mention":
            return {
                background:"#72b811",
                icon:"at-sign",
                text: "メンションされました"
            }
        default:
            console.log("Unknown event: " + type);
            return {
                background:"#d62951",
                icon:"help-circle",
                text: "不明な通知"
            }
        }
    }
    
export default switchactionring;