import { logo } from "@/assets/asset";

const LogoNav = () => {
    return (
        <a href="/" className="flex gap-[11.7px] items-center">
            <img src={logo} alt="Logo" className="" />
            <span className="text-logo font-bold hidden md:block">Booky</span>
        </a>
    )
}

export default LogoNav;