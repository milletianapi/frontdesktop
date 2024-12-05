import {items, sets} from "../util.js";
import {useEffect, useState} from "react";

// eslint-disable-next-line react/prop-types
export const FilterPouch = ({filterStart, query, setQuery, setFilterStart, pouchFilter, setPouchFilter}) => {

    const test = (e) => {
        console.log(e.target.checked);
        setFilterStart(e.target.checked);
    }

    const handleChangeFilterStatus = (e, itemName, index) => {
        const temp = [...pouchFilter];
        temp[index].checked = e.target.checked;
        setPouchFilter(temp);
        if (e.target.checked) {
            query["items.item_name"].$all.push(itemName);
            setQuery(query);
            console.log(query);
            return;
        }
        query["items.item_name"].$all = query["items.item_name"].$all.filter(item => item !== itemName);
        setQuery(query);
        console.log(query);
    };

    return (
        <div
            className={`mt-[7px] flex px-5 items-center w-[507px] h-[44px] button1 text-[#3f3f3f] text-[12px] gap-0.5`}>
            <div className={"mr-[6px]"}>
                <p>주머니 별 보기</p>
                <label>활성화<input type={"checkbox"} className={"ml-1 w-2.5 h-2.5 mt-0.5 translate-y-[1px]"}
                                 checked={filterStart}
                                 onChange={(e) => test(e)}
                /></label>
            </div>
            {pouchFilter.map((pouch, index) => {
                const isSet = (index === 5 || index === 9 || index === 13 || index === 17); // 셋트 체크박스 위치
                const setGroupStartIndex = isSet ? index : Math.floor(index / 4) * 4 + 1; // 셋트 시작점 계산
                const setGroupIndices = [...Array(4).keys()].map(i => setGroupStartIndex + i); // 셋트 체크박스 인덱스 그룹

                const handleSetCheckboxChange = (e) => {
                    const isChecked = e.target.checked;
                    setGroupIndices.forEach(i => {
                        if (i < pouchFilter.length) { // 인덱스가 유효한지 확인
                            handleChangeFilterStatus({target: {checked: isChecked}}, pouchFilter[i].item_name, i);
                        }
                    });
                };


                return (
                    <div key={index} className={"flex gap-0.5 items-center "}>
                        {isSet && (
                            <label>
                                <div
                                    className={`text-center w-7 ${pouchFilter[setGroupStartIndex]?.event !== null ? "" : "text-[#999999]"} button1 -translate-y-[1px]`}
                                >
                                    {sets[Math.floor(index / 4) - 1]}
                                </div>
                                <input
                                    type={"checkbox"}
                                    className={"ml-[9px] w-2.5 h-2.5 mt-[1px]"}
                                    checked={
                                        pouchFilter[setGroupStartIndex].checked &&
                                        pouchFilter[setGroupStartIndex + 1].checked &&
                                        pouchFilter[setGroupStartIndex + 2].checked &&
                                        pouchFilter[setGroupStartIndex + 3].checked
                                    }
                                    onChange={handleSetCheckboxChange}
                                />
                            </label>
                        )}
                        <label
                            className={`text-center w-2.5 ${pouch.event !== null ? "" : "text-[#999999]"}`}
                        >
                            {pouch.label}
                            <input
                                type={"checkbox"}
                                className={"w-2.5 h-2.5 mt-[3px]"}
                                checked={pouch.checked}
                                onChange={(e) => handleChangeFilterStatus(e, pouch.item_name, index)}
                            />
                        </label>
                    </div>
                );
            })}
        </div>)
}