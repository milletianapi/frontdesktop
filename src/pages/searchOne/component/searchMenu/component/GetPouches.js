import axios from "axios";
import {serverOptions} from "./SelectReactOption.js";

export const GetPouches = async (server, channel, trade, setPouches) => {
    const channelNum = channel.value.split("_")[1];
    if (server.value === 'all') {
        if (channelNum <= 42) {
            server = serverOptions[1]
        } else if (channelNum > 42 && channelNum <= 66) {
            server = serverOptions[2];
            channel = {value: `channel_${channelNum - 42}`}
        } else if (channelNum > 66 && channelNum <= 81) {
            server = serverOptions[3];
            channel = {value: `channel_${channelNum - 66}`}
        } else if (channelNum > 81 && channelNum <= 96) {
            server = serverOptions[4];
            channel = {value: `channel_${channelNum - 81}`}
        }
    }
    console.log(server.value)
    console.log(channel.value)
    setPouches(null);
    try {
        let res = await axios.get("https://m.milletianapi.com/read", {
            params: {
                server: server.value,
                channel: channel.value,
                trade: trade.value,
            }
        });
        console.log(res.data);
        if(res.data === 'error'){alert(`넥슨 API가 아직 업데이트 되지 않았습니다. 주기가 26~31분 남았을 때 다시 시도해주세요.`)} else
        if (res.data !== null && res.data !== undefined && res.data !== '') {
            setPouches(res.data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    }
};