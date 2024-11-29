import {useRecoilValue} from "recoil";
import {selectedChannelState, selectedServerState, selectedTradeState} from "../../../../../stores/Store.jsx";

export const SelectedView = () => {
    const server = useRecoilValue(selectedServerState);
    const channel = useRecoilValue(selectedChannelState);
    const trade = useRecoilValue(selectedTradeState);

    return (
        <div className="h-[22px] justify-start items-center gap-2.5 inline-flex text-xs text-[#3f3b66]">
            <div
                className="w-[122px] h-[22px] bg-[#ffcce6] rounded-[5px] middle">{server.label}
            </div>
            <div
                className="w-[122px] h-[22px] bg-[#ffcce6] rounded-[5px] middle">{trade.label}
            </div>
            <div
                className="w-[122px] h-[22px] bg-[#ffcce6] rounded-[5px] middle">{channel.label}
            </div>
        </div>
    )
}