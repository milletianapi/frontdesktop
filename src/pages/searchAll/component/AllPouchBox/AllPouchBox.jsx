import {useEffect, useState} from "react";
import {AllDefaultPouchOne} from "../../../searchOne/component/Pouches/component/AllDefaultPouchOne.jsx";
import {AllPouchOne} from "../../../searchOne/component/Pouches/AllPouchOne.jsx";
import {items, sets} from "../../util.js";
import {allItems} from "./component/allItems.js";

export const AllPouchBox = ({pouches, isOne}) => {
    const color = pouches._id;
    const [allPouch, setAllPouch] = useState([...allItems]);
    const [isView, setIsView] = useState(false)

    const colors = ["a", "b", "c"].map((colorKey) => {
        if (!color[colorKey]) {
            return {label: colorKey.toUpperCase() + "팟", rgb: "0, 0, 0"};
        }
        return {
            label: colorKey.toUpperCase() + "팟",
            rgb: `${color[colorKey].r}, ${color[colorKey].g}, ${color[colorKey].b}`,
        };
    });

    const handlePouchUpdate = () => {
        pouches.items.map((res) => {
            allPouch.map((item, allIndex) => {
                if (res.item_name === item.item_name) {
                    allPouch[allIndex] = res
                }
            })
        })
        setAllPouch([...allPouch]);
    }

    const handleView = () => {
        setIsView(!isView)
    }

    useEffect(() => {
        if(isOne){setIsView(true)}
        handlePouchUpdate()
    },[])
    return (
        <div className="w-[803px] px-[15px] left-0 top-[356px] bg-white">
            <div className={`w-full flex items-center text-[12px] py-1 ${!isView && `border-b border-[#9f7394]`}`}>
                <div className={"w-full flex justify-between items-center"}>
                    <div className="flex">
                        {colors.map(({label, rgb}) => (
                            <div key={`${label}`} className={"flex items-center"}>
                                <div className={"w-[21px] h-[21px]"} style={{backgroundColor: `rgb(${rgb})`}}></div>
                                <div className={"ml-1 w-[90px] text-left"}>({rgb})</div>
                            </div>
                        ))}
                </div>
                <div className={"flex gap-0.5"}>
                    {allPouch.map((pouch, index) => {
                        const text = items[index].label;
                        const isSet = (index === 5 || index === 9 || index === 13 || index === 17);
                        let isSets = true;
                        if(isSet){
                           isSets = allPouch[index].event !== null &&
                            allPouch[index+1].event !== null &&
                            allPouch[index+2].event !== null &&
                            allPouch[index+3].event !== null
                        }
                        return (
                            <div key={index} className={"flex gap-0.5 items-center"}>
                                {isSet &&
                                    <div
                                        className={`text-center w-7 ${isSets ? "" : "text-[#999999]"} button1`}>{sets[Math.floor(index / 4) - 1]}</div>}
                                <div className={`text-center w-2.5 ${pouch.event !== null ? "" : "text-[#999999]"}`}>
                                    {text}
                                </div>
                            </div>
                        );
                    })}
                </div>
                </div>
                <button className={"ml-2 min-w-[21px] h-[21px] button1 middle"} onClick={handleView}>▼</button>
            </div>
            {isView && <div className="w-[773px] bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center">
                <div className={"flex flex-wrap"}>
                    {allPouch.map((pouch) => {
                        return (
                            <div key={pouch.item_name}>
                                {pouch.event === null ? <AllDefaultPouchOne item={pouch}/> :
                                    <AllPouchOne item={pouch} color={color} colors={colors}/>}
                            </div>
                        )
                    })}
                </div>
            </div>}
        </div>
    )
}