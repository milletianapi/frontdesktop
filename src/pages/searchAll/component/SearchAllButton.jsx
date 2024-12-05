import axios from "axios";
import {useRecoilState} from "recoil";
import {createColorState, filterColorState} from "../../../stores/Store.jsx";
import {items} from "../util.js";

const buttonFunc = [`조건초기화`, `전체 검색하기`]

export const SearchAllButton = ({query,setQuery,setFilterStart,setPouchFilter,setPouches,filterStart,setloading}) => {
    const [filterColors, setFilterColors] = useRecoilState(filterColorState);

    const handleGroupedPouch = async () => {
        const ColorQuery = {};
        if(filterStart){ColorQuery["items.item_name"] = query["items.item_name"]}
        const calculateRange = (value, tolerance) => ({
            "$gte": Math.max(0, value - tolerance),
            "$lte": Math.min(255, value + tolerance)
        });
        ['a', 'b', 'c'].forEach(color => {
            if (filterColors[color].active) {
                const { tolerance, rgb } = filterColors[color];
                ColorQuery[`_id.${color}.r`] = calculateRange(rgb.r, tolerance)
                ColorQuery[`_id.${color}.g`] = calculateRange(rgb.g, tolerance)
                ColorQuery[`_id.${color}.b`] = calculateRange(rgb.b, tolerance)
            }
        });
        setloading(false)
        console.log(ColorQuery)
        const group = await axios.post('https://milletianapi.com/getgroup', (ColorQuery)
            , {headers: {"Content-Type": "application/json"}})
        setPouches(group.data)
        setloading(true)
    }

    const handleReset = () => {
        setPouchFilter([...items])
        console.log([...items])
        console.log()
        setQuery({"items.item_name": {$all: []}})
        setFilterStart(false)

        setFilterColors({ a: createColorState(), b: createColorState(), c: createColorState() })
    }

    return (
        <>
            <button
                className="ml-[18px] mt-2 mb-1 w-[251px] h-[44px] bg-[#baa0e1] active:bg-[#C571C7] rounded-[5px] border border-black middle text-2xl"
                onClick={handleReset}
            >
                조건초기화
            </button>
            <button
                className="ml-[18px] mt-2 mb-1 w-[251px] h-[44px] bg-[#baa0e1] active:bg-[#C571C7] rounded-[5px] border border-black middle text-2xl"
                onClick={handleGroupedPouch}
            >
                검색하기
            </button>
        </>
    )
}