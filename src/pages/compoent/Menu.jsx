import {Link, useLocation} from "react-router-dom";
import {useRecoilState} from "recoil";
import {createColorState, filterColorState} from "../../stores/Store.jsx";

export const Menu = () => {
    const location = useLocation();
    const [filterColors, setFilterColors] = useRecoilState(filterColorState);

    const handleReset = () => {
        setFilterColors({ a: createColorState(), b: createColorState(), c: createColorState() })
    }

    const isActive = (path) => location.pathname === path;

    return (
        <div className={"mt-1.5 mb-[18px]"}>
            <div
                className="w-[508px] h-[35px] py-[5px] bg-[#81ffdb]  rounded-lg middle gap-[17px]">
                <Link to="/"
                      className={`w-[115px] h-[35px] py-2 ${
                          isActive("/") ? "bg-[#05B1A9]" : "hover:bg-[#26DECF] active:bg-[#05B1A9]"
                      } rounded-[7px] middle`}>
                    <div className={`text-base ${isActive("/") ? "text-[#393939]" : "text-[#676767]"}`}>메인</div>
                </Link>
                <Link to="/searchone"
                      className={`w-[115px] h-[35px] py-2 ${
                          isActive("/searchone") ? "bg-[#05B1A9]" : "hover:bg-[#26DECF] active:bg-[#05B1A9]"
                      } rounded-[7px] middle`}
                      onClick={() => {handleReset()}}
                >
                    <div className={`text-base ${isActive("/searchone") ? "text-[#393939]" : "text-[#676767]"}`}>채널순회</div>
                </Link>
                <Link to="/searchall"
                      className={`w-[115px] h-[35px] py-2 ${
                          isActive("/searchall") ? "bg-[#05B1A9]" : "hover:bg-[#26DECF] active:bg-[#05B1A9]"
                      } rounded-[7px] middle`}
                      onClick={() => {handleReset()}}
                >
                    <div className={`text-base ${isActive("/searchall") ? "text-[#393939]" : "text-[#676767]"}`}>전체검색</div>
                </Link>
                {/*<Link to="/statistics"*/}
                {/*    className={`w-[115px] h-[35px] py-2 ${*/}
                {/*        isActive("/statistics") ? "bg-[#05B1A9]" : "hover:bg-[#26DECF] active:bg-[#05B1A9]"*/}
                {/*    } rounded-[7px] middle`}>*/}
                {/*    <div className={`text-base ${isActive("/statistics") ? "text-[#393939]" : "text-[#676767]"}`}>통계</div>*/}
                {/*</Link>*/}
            </div>
        </div>
    );
};
