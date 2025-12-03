import React from "react";

export default function ABoutLayout({
    children, 
}: { 
    children: React.ReactNode;
}){
    return(
        <div>
            {/* <nav className="fixed right-0 top z-10 h-screen w-35 bg-gray-800 text-white">
                <ul className="text-3xl px-5 py-5">
                    <li>Home</li>
                    <li>About</li>
                    <li>Profile</li>
                </ul>
            </nav> */}
            <div>{children}</div>
        </div>
    )
}