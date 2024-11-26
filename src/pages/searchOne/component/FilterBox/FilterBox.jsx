import {Timer} from "./component/Timer.jsx";
import {SelectedView} from "./component/SelectedView.jsx";
import {SearchButton} from "../searchMenu/component/SearchButton.jsx";
import {Filter} from "../searchMenu/component/Filter.jsx";


export const FilterBox = (props) => {
    return (
        <div className="w-[507px] h-[356px] relative">
            <div className="w-[507px] h-3.5"/>
            <div className="h-[342px] flex-col justify-start items-start gap-[7px] inline-flex">
                <div className="w-[507px] h-[59.21px]">
                    <div className="h-[44.65px]"/>
                    <div className="h-[14.56px]"/>
                </div>
                <Filter></Filter>
                <div className="w-[507px] h-[79px] items-center gap-2.5 inline-flex">
                    <div className="w-[386px] h-[79px] flex-col justify-start items-start gap-[7px] inline-flex">
                        <Timer/>
                        <SelectedView/>
                    </div>
                    <SearchButton
                        handleSearch={props.handleSearch}
                        isSearchEnabled={props.isSearchEnabled}
                        handleReset={props.handleReset}
                        handleChannelNavigation={props.handleChannelNavigation}
                    />
                </div>
            </div>
        </div>
    )
}