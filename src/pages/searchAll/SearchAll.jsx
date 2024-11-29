import {Title} from "../compoent/Title.jsx";
import {AllPouchBox} from "./component/AllPouchBox/AllPouchBox.jsx";
import {useState} from "react";
import {response} from "./mabialltest.js";
import {Menu} from "../compoent/Menu.jsx";
import {Filter} from "../searchOne/component/searchMenu/component/Filter.jsx";
import {Timer} from "../searchOne/component/FilterBox/component/Timer.jsx";

export const SearchAll = () => {
    const [pouches, setPouches] = useState(response);

    return (
        <div className={"w-full"}>
            <div className="w-[878px] p-[35px] bg-white justify-start items-center gap-2.5 inline-flex">
                <div className="w-[807px] relative">
                    <div className="w-[807px] bg-white rounded-[10px] flex">
                        <div className={"flex"}>
                            <div>
                                <Title/>
                                <Timer isAll={true}/>
                                <button
                                    className="ml-[18px] mt-2 mb-1 w-[247px] h-[22px] bg-[#baa0e1] active:bg-[#C571C7] rounded-[5px] border border-black middle">
                                    검색하기
                                </button>
                            </div>
                            <div className={"pt-[14px]"}>
                                <Menu/>
                                <Filter/>
                            </div>
                        </div>
                    </div>

                    {pouches.map((pouch, index) => {
                        return (<AllPouchBox key={index} pouches={pouch}/>)
                    })

                    }
                </div>
            </div>
        </div>
    )
}