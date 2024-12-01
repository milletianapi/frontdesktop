import {Title} from "../compoent/Title.jsx";
import {AllPouchBox} from "./component/AllPouchBox/AllPouchBox.jsx";
import {useMemo, useState} from "react";
import {Menu} from "../compoent/Menu.jsx";
import {Filter} from "../searchOne/component/searchMenu/component/Filter.jsx";
import {Timer} from "../searchOne/component/FilterBox/component/Timer.jsx";
import {SearchAllButton} from "./component/SearchAllButton.jsx";
import {FilterPouch} from "./component/FilterPouch.jsx";

export const SearchAll = () => {
    const [pouches, setPouches] = useState([]);
    const [isDefault, setIsDefault] = useState(true);
    const [filterStart, setFilterStart] = useState(false);
    const [query, setQuery] = useState({"items.item_name": {$all: []}})
    const [loading, setLoading] = useState(true)

    const renderedPouches = useMemo(() => {
        return pouches.map((pouch, index) => (
            <AllPouchBox key={index} pouches={pouch} setIsDefault={setIsDefault} />
        ));
    }, [pouches]);

    return (
        <div className={"w-full"}>
            <div className="w-[878px] p-[35px] bg-white justify-start items-center gap-2.5 inline-flex">
                <div className="w-[807px] relative">
                    <div className="w-[807px] bg-white rounded-[10px] flex">
                        <div className={"flex"}>
                            <div>
                                <Title/>
                                <Timer isAll={true}/>
                                <SearchAllButton setPouches={setPouches} setIsDefault={setIsDefault} query={query}
                                                 filterStart={filterStart} setloading={setLoading}/>
                            </div>
                            <div className={"pt-[14px]"}>
                                <Menu/>
                                <div className={"h-[7px]"}></div>
                                <Filter/>
                                <FilterPouch setFilterStart={setFilterStart} query={query} setQuery={setQuery}/>
                            </div>
                        </div>
                    </div>
                    {loading ? renderedPouches : `주머니를 가져오는 중 ...`}
                </div>
            </div>
        </div>
    )
}
