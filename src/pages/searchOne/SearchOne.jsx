import {Title} from "./component/Title.jsx";
import {PouchBox} from "./component/PouchBox.jsx";
import {SelectBox} from "./component/SelectBox.jsx";
import {FilterBox} from "./component/FilterBox/FilterBox.jsx";
import {useRecoilState} from "recoil";
import {
    pouchesState,
    selectedChannelState,
    selectedServerState,
    selectedTradeState
} from "../../stores/Store.jsx";
import {useCallback, useState} from "react";
import {channelOptions, serverOptions} from "./component/searchMenu/component/SelectReactOption.js";
import {GetPouches} from "./component/searchMenu/component/GetPouches.js";


export const SearchOne = () => {
    const [selectedServer, setSelectedServer] = useRecoilState(selectedServerState);
    const [selectedChannel, setSelectedChannel] = useRecoilState(selectedChannelState);
    const [activeButton, setActiveButton] = useState('lute');
    const [selectedTradeOption, setSelectedTradeOption] = useState({
        type: "uladh",
        option: {value: "tirChonaill", label: "티르 코네일"}
    });
    const [selectedTrade, setSelectedTrade] = useRecoilState(selectedTradeState);
    const [pouches, setPouches] = useRecoilState(pouchesState);

    const handleServerChange = useCallback((value) => {
        const option = serverOptions.find((server) => server.value === value);
        setSelectedServer(option);
        setSelectedChannel({value: 'channel_1', label: '1 채널'});
        setActiveButton(value);
    }, [setSelectedServer, setSelectedChannel]);

    const handleChannelChange = useCallback((option) => {
        setSelectedChannel(option);
    }, [setSelectedChannel]);

    const handleChannelNavigation = useCallback(async (direction) => {
        if (!selectedServer || !selectedChannel) return;
        const value = selectedChannel.value.split("_");
        const label = selectedChannel.label.split(" ");
        const totalChannels = channelOptions[selectedServer.value].length;
        value[1] = direction === 'next' ? (parseInt(value[1], 10) % totalChannels) + 1 : (parseInt(value[1], 10) - 2 + totalChannels) % totalChannels + 1;
        const valueStr = value[0] + "_" + value[1];
        const labelStr = value[1] + " " + label[1];
        const channel = {value: valueStr, label: labelStr};
        setSelectedChannel(channel);
        await GetPouches(selectedServer, channel, selectedTrade, setPouches);
    }, [selectedChannel, selectedServer, selectedTrade, setSelectedChannel, setPouches]);

    const handleTradeChange = useCallback((option, tradeType) => {
        setSelectedTradeOption({type: tradeType, option});
        setSelectedTrade(option);
    }, [setSelectedTradeOption, setSelectedTrade]);

    const handleSearch = useCallback(async () => {
        if (!selectedServer || !selectedChannel || !selectedTrade) return;
        await GetPouches(selectedServer, selectedChannel, selectedTrade, setPouches);
    }, [selectedServer, selectedChannel, selectedTrade, setPouches]);

    const handleReset = useCallback(() => {
        setSelectedServer(serverOptions.find(option => option.value === 'lute'));
        setSelectedChannel({value: 'channel_1', label: '1 채널'});
        setSelectedTrade({value: "tirChonaill", label: "티르 코네일"});
        setSelectedTradeOption({type: "uladh", option: {value: "tirChonaill", label: "티르 코네일"}});
        setActiveButton('lute');
    }, [setSelectedServer, setSelectedChannel, setSelectedTrade, setSelectedTradeOption]);

    const isSearchEnabled = selectedServer && selectedChannel && selectedTrade;

    return (
        <div className={"w-full"}>
            <div className="w-[878px] p-[35px] bg-white justify-start items-center gap-2.5 inline-flex">
                <div className="w-[807px] relative">
                    <div className="w-[807px] bg-white rounded-[10px] flex">
                        <div>
                            <Title/>
                            <SelectBox activeButton={activeButton}
                                       handleServerChange={handleServerChange}
                                       selectedTradeOption={selectedTradeOption}
                                       handleTradeChange={handleTradeChange}
                                       handleChannelChange={handleChannelChange}
                                       selectedChannel={selectedChannel}
                                       selectedServer={selectedServer}
                            />
                        </div>
                        <FilterBox
                            handleSearch={handleSearch}
                            isSearchEnabled={isSearchEnabled}
                            handleReset={handleReset}
                            handleChannelNavigation={handleChannelNavigation}
                        />
                    </div>
                    <PouchBox/>
                </div>
            </div>
        </div>
    )
}