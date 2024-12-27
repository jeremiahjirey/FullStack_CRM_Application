import CountUp from "react-countup";

export function Card({ date, value, type, action }) {
    const redirect = (action) => {
        window.location.href = action;
    };

    return (
        <div
            onClick={() => redirect(action)}
            className="rounded-2xl odd:bg-yellow even:bg-purple p-4 flex-1 min-w-[150px] cursor-pointer  transform transition-transform duration-200 hover:scale-105 active:scale-110"
        >
            <div className="flex justify-between items-center">
                <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-600">
                    {date}
                </span>
                <img
                    src="/storage/images/more.png"
                    alt=""
                    className="h-5 w-5 hidden sm:block"
                />
            </div>
            <h1 className="text-2xl font-semibold my-4">
                <CountUp end={value} delay={1} duration={3} />
            </h1>
            <h2 className="capitalize text-sm font-medium text-gray-500">
                {type}
            </h2>
        </div>
    );
}
