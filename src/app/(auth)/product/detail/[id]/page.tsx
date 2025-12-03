import { getData } from "@/services/product";
import Image from "next/image";

export default async function DetailProductPage(props: any) {
    const {params} = props;
    const url = `http://localhost:3000/api/product?id=${params.id}`;
    console.log(url);
    
    const product = await getData(url);
    
    
    return (
        <div className="container mx-auto my-10">
            <div className="W-1/2 mx-auto border border-gray-700">
                <Image 
                    src={product.data.image}
                    alt={product.data.name}
                    width={500}
                    height={500}
                    className="w-full object-cover aspect-square col-span-2"
                />
                <div>
                    <h3>{product.data.name}</h3>
                    <h3>{product.data.price}</h3>
                </div>
            </div>
        </div>
    )
}