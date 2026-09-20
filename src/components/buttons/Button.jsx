const MyButton = (props) => {
    const { size, buttonStyle, onClick, children } = props;
    let classStyle = "rounded-4xl text-black border-3 hover:text-white transition-all duration-500 hover:scale-115";
    switch (buttonStyle) {
        case "delete":
            classStyle += " bg-red-200 border-red-800 hover:bg-red-600 hover:text-white hover:border-red-800";
            break;
        case "cancel":
            classStyle += " bg-gray-200 border-gray-600 hover:bg-gray-600 hover:text-white hover:border-gray-800";
            break;
        case "navbar":
            classStyle += " bg-blue-200 border-blue-800 hover:bg-blue-600 hover:text-white hover:border-blue-800";
            break;
        default:
            classStyle += " bg-violet-200 border-violet-300 hover:bg-purple-600 hover:text-white hover:border-purple-800";
            break;
    }

    switch (size) {
        case "small":
            classStyle += " text-sm px-4 py-1 m-1 hover:pt-0.5 hover:pb-1.5";
            break;
        case "large":
            classStyle += " text-lg px-12 py-3 m-3 hover:pt-2 hover:pb-4";
            break;
        default:
            classStyle += " text-base px-8 py-2 m-2 hover:pt-1 hover:pb-3";
            break;
    }

    return (
        <div className="flex justify-center items-center">
            <button
                onClick={onClick}
                className = {classStyle}
            >
                {children}
            </button>
        </div>
    )
}

export default MyButton