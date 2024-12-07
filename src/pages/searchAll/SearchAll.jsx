import {Title} from "../compoent/Title.jsx";
import {AllPouchBox} from "./component/AllPouchBox/AllPouchBox.jsx";
import {useEffect, useMemo, useState} from "react";
import {Menu} from "../compoent/Menu.jsx";
import {Filter} from "../searchOne/component/searchMenu/component/Filter.jsx";
import {Timer} from "../searchOne/component/FilterBox/component/Timer.jsx";
import {SearchAllButton} from "./component/SearchAllButton.jsx";
import {FilterPouch} from "./component/FilterPouch.jsx";
import {NotfoundPouch} from "./component/NotfoundPouch.jsx";
import {items} from "./util.js";
import axios from "axios";

const defaultPouch = {"_id": {"a": {"r": 0, "g": 0, "b": 0}, "b": {"r": 0, "g": 0, "b": 0}, "c": {"r": 0, "g": 0, "b": 0}}, "items": []}

const setting = JSON.parse(JSON.stringify(items));

export const SearchAll = () => {
    const [pouches, setPouches] = useState([defaultPouch]);
    const [filterStart, setFilterStart] = useState(false);
    const [query, setQuery] = useState({"items.item_name": {$all: []}})
    const [loading, setLoading] = useState(true)
    const [pouchFilter, setPouchFilter] = useState(setting);
    const [searchAllReady, setSearchAllReady] = useState({status:"로딩중", count: 0});
    const [oneMinute, setOneMinute] = useState(0);

    useEffect(() => {
        const handleping = async () => {
            const status = await axios.get("https://milletianapi.com/searchallping")
            setSearchAllReady(status.data)
        }
        handleping();
    },[oneMinute])

    const renderedPouches = useMemo(() => {
        console.log(pouches.length);
        if(pouches.length === 0){return (<NotfoundPouch/>)}
        return pouches.map((pouch, index) => (
            <AllPouchBox key={index} pouches={pouch} isOne={pouches.length === 1}/>
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
                                <Timer isAll={true} setOneMinute={setOneMinute}/>
                                <div
                                    className={"ml-[15px] h-[50px] mt-[7px] mb-[7px] w-[251px] button1 middle flex-wrap text-[#3f3f3f] text-sm text-center"}>
                                    <div className={"w-[251px]"}><p>주머니 갱신 여부 : {searchAllReady.status}</p></div>
                                    <div><p>{searchAllReady.status === `준비중` ? `이전` : `현재`} 주기 색상 종류 : {searchAllReady.count}</p></div>
                                </div>
                                <SearchAllButton setPouches={setPouches}
                                                 setQuery={setQuery}
                                                 query={query}
                                                 filterStart={filterStart}
                                                 setFilterStart={setFilterStart}
                                                 setloading={setLoading}
                                                 setPouchFilter={setPouchFilter}
                                />
                            </div>
                            <div className={"pt-[14px]"}>
                                <Menu/>
                                <div className={"h-[7px]"}></div>
                                <Filter/>
                                <FilterPouch
                                    filterStart={filterStart}
                                    setFilterStart={setFilterStart}
                                    query={query}
                                    setQuery={setQuery}
                                    setPouchFilter={setPouchFilter}
                                    pouchFilter={pouchFilter}
                                    />
                            </div>
                        </div>
                    </div>
                    <div className={`${loading ? "" : "text-3xl text-center mt-10"}`}>
                        {loading ? renderedPouches : `주머니를 가져오는 중 ...`}
                    </div>
                </div>
            </div>
        </div>
    )
}
