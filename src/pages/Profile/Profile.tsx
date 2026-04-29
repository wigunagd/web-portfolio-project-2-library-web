import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import ProfileTab from "./ProfileTab";
import { useAppSelector } from "@/redux/3_redux";
import BorrowedListTab from "./BorrowedListTab";
import ReviewTab from "./ReviewTab";

const Profile = () => {

    const btn_tabs = [
        { id: '', label: 'Profile' },
        { id: 'borrowedlist', label: 'Borrowed List' },
        { id: 'reviews', label: 'Reviews' },
    ];

    const authState = useAppSelector((state) => state.auth);

    const hash = window.location.hash.replace('#', '');
    const [btnState, setBtnState] = useState(hash);

    const handleBtnTab = ({ txt }: { txt: string }) => {
        setBtnState(txt);
    }

    function acceptedHash(currentHash: string): boolean {
        return ['profile', 'borrowedlist', 'reviews'].includes(currentHash)
    }

    useEffect(() => {
        const handleHashChange = () => {
            const currentHash = window.location.hash.replace('#', '');
            if (acceptedHash(currentHash)) {
                setBtnState(currentHash);
            }
        };

        window.addEventListener('hashchange', handleHashChange);
        return () => window.removeEventListener('hashchange', handleHashChange);
    }, []);

    return (
        <>
            <Navbar />

            <main className=" min-h-screen pt-23 md:px-0 px-4 w-full md:max-w-300 mx-auto gap-12 grid mb-5">
                <div className="flex flex-col w-full max-w-250 gap-8 mx-auto">

                    <div className="flex flex-col w-full gap-6 md:mt-10">
                        <div className="grid grid-cols-3 gap-2 p-2 bg-neutral-100 rounded-xl max-w-139.25">
                            {btn_tabs.map((tab) => {
                                const isActive = tab.id === btnState || (tab.id === '' && btnState === 'profile');
                                return (
                                    <Button
                                        key={tab.id}
                                        onClick={() => handleBtnTab({ txt: tab.id })}
                                        variant="ghost2"
                                        className={`${isActive && 'bg-white rounded-lg h-10'}`}
                                    >
                                        {tab.label}
                                    </Button>
                                );
                            })}
                        </div>

                        <ProfileTab
                            name={authState.user.name}
                            email={authState.user.email}
                            phone={authState.user.phone ?? ''}
                            imgUrl={authState.user.profilePhoto}

                            className={(!acceptedHash(btnState) || btnState === 'profile') ? '' : 'hidden'}
                        />

                        <BorrowedListTab className={btnState === 'borrowedlist' ? '' : 'hidden'} />

                        <ReviewTab className={btnState === 'reviews' ? '' : 'hidden'} />

                    </div>

                </div>
            </main>

            <Footer className="mb-18" />
        </>
    )
}

export default Profile;