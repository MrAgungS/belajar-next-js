'use client';
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === 'unauthenticated' ) {
            router.push('/login')
        } else {
            if (session !== undefined) {
                if (session?.user.role !== 'admin') {
                    router.push('/')
                }
            }
        }
    }, [status, session?.user.role, router]);

    return (
        <div className="w-full h-96 bg-gray-300 rounded-12px flex justify-center items-center">
            <h1>Dashboard</h1>
        </div>
    );
}
