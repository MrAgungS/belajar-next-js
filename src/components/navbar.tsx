"use client"
import { signIn, signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function NavBar(){
    const pathname = usePathname();
    const router = useRouter();
    const{data: session, status}: {status:string} = useSession();
    return(
        <div className="flex bg-gray-800 py-2 px-5">
            <nav className="flex bg-gray-800 items-center w-full">
                <div className="flex items-center flex-1">
                    <h1 className="text-white px-3">Navbar</h1>
                    <ul className="flex ml-5">
                        <Link href={"/"}>
                        <li className={`mr-3 ${
                            pathname === "/" ? "text-white" : "text-blue-300"} transition ease-in-out hover:-translate-y-0.5 hover:scale-80`}>Home</li>
                        </Link>
                        <Link href={"/about"}>
                        <li className={`mr-3 ${
                            pathname === "/about" ? "text-white" : "text-blue-300"} transition ease-in-out hover:-translate-y-0.5 hover:scale-80`}>about</li>
                        </Link>
                        <Link href={"/profile"}>
                        <li className={`mr-3 ${
                            pathname === "/profile" ? "text-white" : "text-blue-300"} transition ease-in-out hover:-translate-y-0.5 hover:scale-80`}>Profile</li>
                        </Link>
                    </ul>
                </div>
                <div>
                    {status === 'authenticated' ? (
                        <button 
                        className="bg-white rounded-md px-3 text-sm h-7 cursor-pointer"
                        onClick={() => signOut()}
                        >Log Out</button>
                    ): (
                    <button 
                        className="bg-white rounded-md px-3 text-sm h-7 cursor-pointer"
                        onClick={() => signIn()}
                        >Login</button>
                    )}
                </div>
           </nav>
        </div>
    )
}