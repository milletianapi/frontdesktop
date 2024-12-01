import axios from "axios";

const buttonFunc = [`조건초기화`, `전체 검색하기`]

export const SearchAllButton = (props) => {

    const handleGroupedPouch = async () => {
        props.setloading(false)
        const group = await axios.post('https://milletianapi.com/getgroup', (props.filterStart ? props.query : {})
            , {headers: {"Content-Type": "application/json"}})
        props.setPouches(group.data)
        props.setIsDefault(false)
        props.setloading(true)
    }

    return (
        <>
            {buttonFunc.map((func, index) => (<button
                key={index}
                className="ml-[18px] mt-2 mb-1 w-[251px] h-[44px] bg-[#baa0e1] active:bg-[#C571C7] rounded-[5px] border border-black middle text-2xl"
                onClick={handleGroupedPouch}
            >
                {func}
            </button>))}
        </>
    )
}