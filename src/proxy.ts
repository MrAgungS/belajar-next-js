import { NextResponse, type NextRequest } from "next/server";


export default function proxy(request: NextRequest){
    const isLogin = true;
    if (!isLogin) {
        return NextResponse.redirect(new URL("/login", request.url));
    }
}

export const config = {
    matcher: ["/dashboard/:path*"],
}