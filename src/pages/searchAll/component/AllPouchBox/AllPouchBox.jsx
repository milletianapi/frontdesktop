import {allItems} from "./component/allItems.js";
import {useEffect, useState} from "react";
import {AllDefaultPouchOne} from "../../../searchOne/component/Pouches/component/AllDefaultPouchOne.jsx";
import {AllPouchOne} from "../../../searchOne/component/Pouches/AllPouchOne.jsx";
import total from "../AllPouchBox/mabi.total.json"

export const AllPouchBox = ({pouches}) => {
    const [allPouch, setAllPouch] = useState(allItems);

    const handlePouchUpdate = () => {
        pouches.map((res) => {
            allItems.map((item, allIndex) => {if(res.item_name === item.item_name) {allItems[allIndex] = res}})
        })
        setAllPouch([...allItems]);
    }
    useEffect(() => {
        handlePouchUpdate()
    },[])
    return (
        <div className="w-[806px] min-h-[667px] px-[15px] py-3 left-0 top-[356px] bg-white flex justify-center flex-col">
            <div className="w-[776px] bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center">
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
            </div>
            <div className="w-[776px] bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center">
                <ul className={"flex flex-wrap"}>
                    {total.map((color, index) => {
                        return (
                            <li key={index} className={"w-5 h-5 border border-black"}
                            style={{backgroundColor: `rgb(${color._id.r}, ${color._id.g}, ${color._id.b})`}}
                            ></li>
                        )
                    })}

                </ul>
            </div>
            <div className="w-[776px] bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center">
            </div>
        </div>
    )
}