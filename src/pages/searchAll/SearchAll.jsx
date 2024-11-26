import {Title} from "../compoent/Title.jsx";
import {AllPouchBox} from "./component/AllPouchBox/AllPouchBox.jsx";
import {useState} from "react";
import {response} from "./data.js";
import {Link} from "react-router-dom";
import {Menu} from "../compoent/Menu.jsx";

export const SearchAll = () => {
    const [pouches, setPouches] = useState(response);

    return (
        <div className={"w-full"}>
            <div className="w-[878px] p-[35px] bg-white justify-start items-center gap-2.5 inline-flex">
                <div className="w-[807px] relative">
                    <div className="w-[807px] bg-white rounded-[10px] flex">
                        <div className={"flex"}>
                            <Title/>
                            <div className={"pt-[14px]"}>
                                <Menu/>
                            </div>
                        </div>
                    </div>
                    <AllPouchBox pouches={pouches}/>
                </div>
            </div>
        </div>
    )
}