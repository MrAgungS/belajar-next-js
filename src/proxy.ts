import { NextResponse, type NextRequest } from "next/server";
import withAuth from "./proxys/withAuth";


export function mainProxy(request: NextRequest){
    const res = NextResponse.next();
    return res;
}

export default withAuth(mainProxy, [
    "/dashboard", 
    "/profiles", 
    "/login",
    "/register"
])