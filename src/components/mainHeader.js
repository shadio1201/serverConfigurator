import Logo from "../assets/cctvnordic_Logo.png"



function header() {
    return (
        <header className="py-2 px-4 flex justify-center items-center bg-white shadow-lg h-[10vh]">
            <p className="font-bold text-2xl">
                <img src={Logo} alt="cctvnordic logo" className=" w-fit h-12" />
            </p>
        </header>
    );
}

export default header