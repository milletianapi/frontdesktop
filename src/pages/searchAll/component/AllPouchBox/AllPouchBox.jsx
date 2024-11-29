import {allItems} from "./component/allItems.js";
import {useEffect, useState} from "react";
import {AllDefaultPouchOne} from "../../../searchOne/component/Pouches/component/AllDefaultPouchOne.jsx";
import {AllPouchOne} from "../../../searchOne/component/Pouches/AllPouchOne.jsx";

const items = [
    "달", "감", "옥", "밀", "보",
    "양", "거", "가", "굵", "저",
    "일", "고", "최",  "저", "일",
    "고", "최",  "저", "일", "고",
    "최", "꽃"
];

const sets = ["방직","가죽","옷감","실크"]

export const AllPouchBox = ({pouches}) => {
    const [allPouch, setAllPouch] = useState(allItems);
    const [isView, setIsView] = useState(false)

    const handlePouchUpdate = () => {
        pouches.map((res) => {
            allItems.map((item, allIndex) => {if(res.item_name === item.item_name) {allItems[allIndex] = res}})
        })
        setAllPouch([...allItems]);
    }

    const handleView = () => {
        setIsView(!isView)
    }

    useEffect(() => {
        handlePouchUpdate()
    },[])
    return (
        <div className="w-[806px] min-h-[667px] px-[15px] py-3 left-0 top-[356px] bg-white">
            <div className={`w-full flex items-center text-[12px] py-1 ${!isView && `border-b border-[#9f7394]`}`}>
                <div className={"w-full flex justify-between items-center"}>
                <div className="flex items-center">
                    <div className={"w-[23px] h-[23px] bg-[#51AF76]"}></div>
                    <div className={"w-20 text-center"}>(81,175,118)</div>
                    <div className={"w-[23px] h-[23px] bg-[#E2253C]"}></div>
                    <div className={"w-20 text-center"}>(226,37,60)</div>
                    <div className={"w-[23px] h-[23px] bg-[#6E6368]"}></div>
                    <div className={"w-20 text-center"}>(110,99,104)</div>
                </div>
                <div className={"flex gap-0.5"}>
                    {allPouch.map((pouch, index) => {
                        const text = items[index];
                        const isSet = (index === 5 || index === 9 || index === 13 || index === 17);
                        let isSets = true;
                        if(isSet){
                           isSets = allPouch[index].event !== null &&
                            allPouch[index+1].event !== null &&
                            allPouch[index+2].event !== null &&
                            allPouch[index+3].event !== null
                        }
                        return (
                            <div key={index} className={"flex gap-0.5"}>
                                {isSet &&
                                    <div className={`text-center "w-6" ${isSets ? "" : "text-[#999999]"}`}>{sets[Math.floor(index/4)-1]}</div>}
                                <div  className={`text-center "w-3" ${pouch.event !== null ? "" : "text-[#999999]"}`}>
                                    {text}
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>
                <button className={"ml-2 min-w-[23px] h-[23px] bg-[#000000]"} onClick={handleView}/>
            </div>
            {isView && <div className="w-[776px] bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center">
                <div className={"flex flex-wrap"}>
                    {allPouch.map((pouch) => {
                        return (
                            <div key={pouch.item_name}>
                                {pouch.event === null ? <AllDefaultPouchOne item={pouch}/> :
                                    <AllPouchOne item={pouch}/>}
                            </div>
                        )
                    })}
                </div>
            </div>}
            {/*<div className="w-[776px] bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center">*/}
            {/*    <ul className={"flex flex-wrap"}>*/}
            {/*        {total.map((color, index) => {*/}
            {/*            return (*/}
            {/*                <li key={index} className={"w-5 h-5 border border-black"}*/}
            {/*                style={{backgroundColor: `rgb(${color._id.r}, ${color._id.g}, ${color._id.b})`}}*/}
            {/*                ></li>*/}
            {/*            )*/}
            {/*        })}*/}

            {/*    </ul>*/}
            {/*</div>*/}
        </div>
    )
}