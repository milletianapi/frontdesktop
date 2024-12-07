import {allItems} from "./AllPouchBox/component/allItems.js";
import {items, sets} from "../util.js";

const notFoundArray = [1,2,3]

export const NotfoundPouch = () => {
    return (
        <div className="w-[803px] px-[15px] left-0 top-[356px] bg-white">
            <div
                className={`w-full flex items-center text-[12px] py-1`}>
                <div className={"w-full flex justify-between items-center"}>
                    <div className="flex">
                        {notFoundArray.map((_, index) => (
                            <div key={index} className={"flex items-center"}>
                                <div className={"w-[21px] h-[21px] bg-black"}></div>
                                <div className={"ml-1 w-[90px] text-left"}>(000,000,000)</div>
                            </div>
                        ))}
                    </div>
                    <div className={"flex gap-0.5"}>
                        {allItems.map((pouch, index) => {
                            const text = items[index].label;
                            const isSet = (index === 5 || index === 9 || index === 13 || index === 17);
                            let isSets = false;
                            return (
                                <div key={index} className={"flex gap-0.5 items-center"}>
                                    {isSet &&
                                        <div
                                            className={`text-center w-7 ${isSets ? "" : "text-[#999999]"} button1`}>{sets[Math.floor(index / 4) - 1]}</div>}
                                    <div
                                        className={`text-center w-2.5 ${pouch.event !== null ? "" : "text-[#999999]"}`}>
                                        {text}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
                <button className={"ml-2 min-w-[21px] h-[21px] button1 middle"}>▼</button>
            </div>
            <div
                className="w-[773px] h-72 bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center text-3xl">
                검색 결과가 없습니다.
            </div>
        </div>
    )
}