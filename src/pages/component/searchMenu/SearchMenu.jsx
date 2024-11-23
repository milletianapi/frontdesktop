import {ServerSelect} from "./component/ServerSelect.jsx";
import {TradeSelect} from "./component/TradeSelect.jsx";
import {ChannelSelect} from "./component/ChannelSelect.jsx";
import {SearchButton} from "./component/SearchButton.jsx";

export const SearchMenu = () => {

    return (
        <div className={"mt-[10px] flex justify-center flex-wrap"}>
            <div className={"w-[360px] flex"}>
                <ServerSelect/>
                <TradeSelect/>
                <div className={"pl-[5px]"}>
                    <ChannelSelect/>
                </div>
            </div>
                <SearchButton
                    handleSearch={handleSearch}
                    isSearchEnabled={isSearchEnabled}
                    handleChannelNavigation={handleChannelNavigation}
                    handleReset={handleReset}
                />
        </div>
    );
};
