
import { retriveData, retriveDataById } from "@/lib/firebase/service";
import { NextRequest, NextResponse } from "next/server";

export const revalidate = 5;
export const fetchCache = "auto";



const data = [
    {
        id: 1,
        title : "Nike Field General",
        price: 10000,
        image: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/bef4ad00-36d9-4d46-a85c-8ba9ace962bd/WMNS+NIKE+FIELD+GENERAL.png"
    },
    {
        id: 2,
        title : "Nike ACG Zoom Gaiadome",
        price: 10000,
        image: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/63484b6a-47bc-4f0e-824e-3c03e0930151/ACG+ZOOM+GAIADOME+GTX+SE.png"
    },    
    {
        id: 3,
        title: "Air Jordan 1 Low SE",
        price: 10000,
        image: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f359f330-b2f1-4875-9cb2-0820339dae6d/AIR+JORDAN+1+LOW+SE.png"
    },
    {
        id: 4,
        title: "Air Jordan 1 Low SE",
        price: 10000,
        image: "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/f359f330-b2f1-4875-9cb2-0820339dae6d/AIR+JORDAN+1+LOW+SE.png"
    },
]



export async function GET(request: NextRequest) {
    const {searchParams} = new URL(request.url);
    const id = searchParams.get("id")
    
    if (id) {
        const detailProduct = await retriveDataById("products", id)
        if (detailProduct) {
            return NextResponse.json({
                status: 200,
                massage:"ID Success", 
                data:detailProduct 
            });
        }
        return NextResponse.json({
            status: 404,
            massage:"Not Found", 
            data: {}
        });
    }

    const product = await retriveData('products')

    return NextResponse.json({status: 200, massage:"Success", data: product })
}