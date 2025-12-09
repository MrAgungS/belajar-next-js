
import { getData } from "@/services/product";
import dynamic from "next/dynamic";
import Image from "next/image";

const Modal = dynamic(() => import('@/components/core/Modal'))

export default async function DetailProductPage(props: any) {
    const {params} = props;
    const url = `http://localhost:3000/api/product?id=${params.id}`;
    console.log(url);
    
    const product = await getData(url);
    
    
    return (
        <Modal>
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
        </Modal>


    )
}