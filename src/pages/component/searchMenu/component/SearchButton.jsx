import {useResetRecoilState} from 'recoil';
import {filterColorState} from "../../../../stores/Store.jsx";

export const SearchButton = ({handleSearch, isSearchEnabled, handleReset, handleChannelNavigation}) => {
    const resetFilterColorState = useResetRecoilState(filterColorState);

    return (
        <div className="w-[111px] h-[79px] gap-[5px] flex flex-wrap text-xs">
            <button
                className="w-[111px] h-[22px] bg-[#baa0e1] active:bg-[#C571C7] rounded-[5px] border border-black justify-center items-center flex"
                onClick={handleSearch}
                disabled={!isSearchEnabled}>
                검색하기
            </button>
            <button
                className="w-[111px] h-[22px] bg-[#baa0e1] active:bg-[#C571C7] rounded-[5px] border border-black justify-center items-center flex"
                onClick={() => {
                    handleReset();
                    resetFilterColorState();
                }}>
                조건초기화
            </button>
            <div className={"flex gap-[5px]"}>
                <button
                    className="w-[53px] h-[22px] bg-[#baa0e1] active:bg-[#C571C7] rounded-[5px] border border-black justify-center items-center flex"
                    onClick={() => handleChannelNavigation('previous')}>이전채널
                </button>
                <button
                    className="w-[53px] h-[22px] bg-[#baa0e1] active:bg-[#C571C7] rounded-[5px] border border-black justify-center items-center flex"
                    onClick={() => handleChannelNavigation('next')}>다음채널
                </button>
            </div>
        </div>
    );
};