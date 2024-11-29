import { Link, useLocation } from "react-router-dom";

export const Menu = () => {
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <div className={"mt-1.5 mb-[18px]"}>
            <div
                className="w-[508px] h-[35px] py-[5px] bg-[#81ffdb]  rounded-lg justify-center items-center gap-[17px] inline-flex">
                <Link to="/"
                      className={`w-[115px] h-[35px] py-2 ${
                          isActive("/") ? "bg-[#05B1A9]" : "hover:bg-[#26DECF] active:bg-[#05B1A9]"
                      } rounded-[7px] justify-center items-center flex`}>
                    <div className={`text-base ${isActive("/") ? "text-[#393939]" : "text-[#676767]"}`}>메인</div>
                </Link>
                <Link to="/"
                      className={`w-[115px] h-[35px] py-2 ${
                          isActive("/searchone") ? "bg-[#05B1A9]" : "hover:bg-[#26DECF] active:bg-[#05B1A9]"
                      } rounded-[7px] justify-center items-center flex`}>
                    <div className={`text-base ${isActive("/searchone") ? "text-[#393939]" : "text-[#676767]"}`}>채널순회</div>
                </Link>
                <Link to="searchall"
                      className={`w-[115px] h-[35px] py-2 ${
                          isActive("/searchall") ? "bg-[#05B1A9]" : "hover:bg-[#26DECF] active:bg-[#05B1A9]"
                      } rounded-[7px] justify-center items-center flex`}>
                    <div className={`text-base ${isActive("/searchall") ? "text-[#393939]" : "text-[#676767]"}`}>전체검색</div>
                </Link>
                <button
                    className={`w-[115px] h-[35px] py-2 ${
                        isActive("/statistics") ? "bg-[#05B1A9]" : "hover:bg-[#26DECF] active:bg-[#05B1A9]"
                    } rounded-[7px] justify-center items-center flex`}>
                    <div className={`text-base ${isActive("/statistics") ? "text-[#393939]" : "text-[#676767]"}`}>통계</div>
                </button>
            </div>
        </div>
    );
};
