import { icSocial1Fb, icSocial2Ig, icSocial3Linkedin, icSocial4Tiktok, logo } from "@/assets/asset";

const social = [
    {
        id: 'Facebook',
        href: '#',
        iconImg: icSocial1Fb
    }, {
        id: 'Instagram',
        href: '#',
        iconImg: icSocial2Ig
    }, {
        id: 'LinkedIn',
        href: '#',
        iconImg: icSocial3Linkedin
    }, {
        id: 'Tiktok',
        href: '#',
        iconImg: icSocial4Tiktok
    },
];

const Footer = ({ className }: { className?: string }) => {
    return (
        <footer className={`flex py-10 md:py-20 px-4 md:px-0 w-full border-t ${className}`}>
            <div className="flex flex-col w-full gap-10 items-center max-w-300 mx-auto">
                <div className="flex flex-col w-full gap-5.5 items-center max-w-300 mx-auto">
                    <a href="/" className="flex gap-[11.7px] items-center">
                        <img src={logo} alt="Logo" className="" />
                        <span className="text-logo font-bold">Booky</span>
                    </a>
                    <span className="text-sm md:text-md w-full text-center">Discover inspiring stories & timeless knowledge, ready to borrow anytime. Explore online or visit our nearest library branch.</span>
                </div>

                <div className="flex flex-col w-full gap-5 items-center max-w-300 mx-auto">
                    <span className="text-md font-bold">Follow on Social Media</span>

                    <div className="flex flex-row gap-3">
                        {
                            social.map((s, i) => (
                                <a key={i} href={s.href}>
                                    <img src={s.iconImg} alt={s.id} />
                                </a>
                            ))
                        }
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer;