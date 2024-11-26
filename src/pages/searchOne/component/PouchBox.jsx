import Pouch from "./Pouches/Pouch.jsx";

export const PouchBox = () => {
    return (
        <div
            className="w-[806px] h-[667px] px-[15px] py-3 left-0 top-[356px] bg-white flex justify-center">
            <div className="w-[776px] bg-white rounded-[10px] border border-[#9f7394] py-5 flex justify-center">
                <div>
                    <Pouch/>
                </div>
            </div>
        </div>
    )
}