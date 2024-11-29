import {
    channelOptions,
    channelStyles,
    serverOptions,
    tradeOptionsBelfast,
    tradeOptionsIria,
    tradeOptionsUladh
} from "./searchMenu/component/SelectReactOption.js";
import Select from "react-select";


export const SelectBox = (props) => {
    return (
        <div className="w-[281px] h-[205px] pl-[15px] gap-3 inline-flex">
            <div
                className="w-[101px] h-[205px] px-4 py-[15px] button1 flex-col justify-center items-center gap-[7px] inline-flex">
                <div className="w-[69px] h-4 text-left text-[#3f3b66] text-[13px]">서버</div>
                {serverOptions.map((servername, index) => {
                    return (
                        <button key={index}
                                className={`w-[69px] h-[25px] ${props.activeButton === servername.value ? `bg-[#FF9BC3]/90` : `bg-[#ffcce6]/90`} rounded-[5px] justify-center items-center inline-flex text-[#58528b] text-xs`}
                                onClick={() => props.handleServerChange(servername.value)}
                        >
                            {servername.label}
                        </button>
                    )
                })}
            </div>
            <div
                className="w-[141px] h-[205px] px-4 py-[15px] button1 flex-col justify-start items-center gap-[9px] inline-flex">
                <div className="w-[109px] h-4 text-[#3f3b66] text-[13px] flex items-center leading-none">채널</div>
                <Select
                    value={props.selectedChannel}
                    onChange={props.handleChannelChange}
                    options={props.selectedServer ? channelOptions[props.selectedServer.value] : []}
                    isSearchable
                    placeholder="채널"
                    isDisabled={!props.selectedServer}
                    styles={channelStyles}
                    className=" z-10"
                />
                <div className="w-[109px] h-4 text-[#3f3b66] text-[13px]">교역소</div>
                <Select
                    value={props.selectedTradeOption?.type === 'uladh' ? props.selectedTradeOption.option : null}
                    onChange={(option) => props.handleTradeChange(option, 'uladh')}
                    options={tradeOptionsUladh}
                    isSearchable
                    placeholder=" 울라 대륙"
                    styles={channelStyles}
                />
                <Select
                    value={props.selectedTradeOption?.type === 'belfast' ? props.selectedTradeOption.option : null}
                    onChange={(option) => props.handleTradeChange(option, 'belfast')}
                    options={tradeOptionsBelfast}
                    isSearchable
                    placeholder=" 벨바스트"
                    styles={channelStyles}
                />
                <Select
                    value={props.selectedTradeOption?.type === 'iria' ? props.selectedTradeOption.option : null}
                    onChange={(option) => props.handleTradeChange(option, 'iria')}
                    options={tradeOptionsIria}
                    isSearchable
                    placeholder=" 이리아 대륙"
                    styles={channelStyles}
                />
            </div>
        </div>
    )
}