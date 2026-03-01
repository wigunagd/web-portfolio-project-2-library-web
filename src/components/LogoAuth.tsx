import { logo } from "@/assets/asset";

const LogoAuth = () => {
    return (
        <a href="/" className="flex gap-[11.7px] items-center">
            <img src={logo} alt="Logo" className="" />
            <span className="text-logo font-bold">Booky</span>
        </a>
    )
}

export default LogoAuth;