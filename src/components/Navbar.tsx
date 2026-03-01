import { icBag, icClose, icDropDown, icMenu, icSearch, icSearch2, imgTmpProfilePic } from "@/assets/asset";
import LogoNav from "./LogoNav";
import { Button } from "./ui/button";
import { useAppDispatch, useAppSelector } from "@/redux/3_redux";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "./ui/dropdown-menu";
import { useEffect, useState } from "react";
import { logout } from "@/redux/1_authSlice";

const Navbar = () => {

    const [showSearch, setShowSearch] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    // const [cartCount, setCartCount] = useState(0);
    const cartCount = 0;

    const useIsMobile = (breakpoint: number = 768) => {
        const [isMobile, setIsMobile] = useState(window.innerWidth < breakpoint);

        useEffect(() => {
            const mediaQuery = window.matchMedia(`(max-width: ${breakpoint}px)`);
            const handleResize = (e: MediaQueryListEvent) => {
                setIsMobile(e.matches);
            };
            mediaQuery.addEventListener('change', handleResize);
            return () => mediaQuery.removeEventListener('change', handleResize);
        }, [breakpoint]);

        return isMobile;
    };

    const isMobile = useIsMobile();

    const authState = useAppSelector((state) => state.auth);
    const islogin = (authState.accessToken !== "" && authState.isLoggedin);
    const dispatch = useAppDispatch();

    const handleToggleSearch = () => {
        setShowSearch(!showSearch);
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    return (
        <header className="fixed top-0 left-0 w-full border-b bg-white z-50">

            <nav className="flex flex-row w-full max-w-300 justify-between items-center mx-auto h-16 md:h-20 px-4 md:px-0 gap-2 md:gap-4">
                <LogoNav />

                <div id="searchbar" className={`flex-1 min-w-0 h-11 py-2 px-4 border md:max-w-125 rounded-full items-center 
                    ${!isMobile || showSearch ? 'flex' : 'hidden'}`
                }>
                    <img src={icSearch} className="w-5 h-5 shrink-0" />
                    <input id="search" name="search" className="h-full w-full outline-none bg-transparent min-w-0" value={authState.user.profilePhoto} />
                </div>

                {
                    isMobile && showSearch && (
                        <Button variant={'ghost2'} onClick={handleToggleSearch} className="block md:hidden">
                            <img src={icClose} />
                        </Button>
                    )
                }



                <div id="menu-group" className="flex shrink-0 gap-4">

                    <div id="user-group" className={` shrink-0 items-center
                        ${isMobile && showSearch ? 'hidden' : 'flex'}
                        `}>
                        <Button variant={'ghost2'} onClick={handleToggleSearch} className="block md:hidden">
                            <img src={icSearch2} />
                        </Button>

                        <Button variant={'ghost2'} asChild>
                            <a href="/cart" className="relative">
                                <img src={icBag} />
                                <span className="absolute top-0 right-3 flex items-center justify-center text-white bg-accent-red w-5 h-5 rounded-full">{cartCount}</span>
                            </a>
                        </Button>


                        {!islogin && (
                            <>
                                {
                                    showLogin && isMobile ?
                                        (
                                            <Button variant={'ghost2'} onClick={() => setShowLogin(!showLogin)} className="block md:hidden">
                                                <img src={icClose} />
                                            </Button>
                                        ) :
                                        (
                                            <Button variant={'ghost2'} onClick={() => setShowLogin(!showLogin)} className="block md:hidden">
                                                <img src={icMenu} />
                                            </Button>
                                        )
                                }
                                <div id="btn-menu"
                                    className={`
                                    ${showLogin && isMobile
                                            ? "fixed inset-0 z-5 bg-white flex flex-col gap-6 mt-20 px-5"
                                            : "hidden md:flex md:static md:bg-transparent md:flex-row md:gap-4"
                                        }
                                    `}
                                >
                                    <Button variant={'ghost'} asChild className="border rounded-full h-10 md:h-14 px-4 md:px-8">
                                        <a href="/login">Login</a>
                                    </Button>
                                    <Button asChild className="rounded-full h-10 md:h-14 px-4 md:px-8">
                                        <a href="/register">Register</a>
                                    </Button>
                                </div>
                            </>
                        )}

                        {islogin && (
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button variant={'ghost2'} className="flex items-center gap-2 h-16 hover:bg-neutral-50">
                                        <img src={authState.user.profilePhoto ?? imgTmpProfilePic} alt="" />
                                        <span className="text-md font-semibold hidden md:flex">{authState.user.name}</span>
                                        <img src={icDropDown} className="hidden md:flex" />
                                    </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent className="py-2 w-40">
                                    <a href="#" onClick={handleLogout} className="w-full px-2">Logout</a>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        )}

                    </div>

                </div>
            </nav>
        </header>
    )
}

export default Navbar;