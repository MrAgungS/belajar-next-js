import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getData } from "@/services/product";

type ProductPageProps = {
    params: Promise<{ slug: string[] }>;
};


export default async function ProductPage(props: ProductPageProps) {
    const params = await props.params;
    const products = await getData("http://localhost:3000/api/product");

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {!params.slug &&
                products.data.length > 0 && 
                products.data.map((product: any) => ( 
                    <div
                        key={product.id}
                        className="bg-neutral-primary-soft p-6 border border-default rounded-base shadow-xs hover:shadow-md transition-shadow"
                    >
                        <Link href="#">
                            <Image
                                className="rounded-base mb-4 object-cover w-full"
                                alt={product.name ?? "Product Image"}
                                src={product.image}
                                width={300}
                                height={300}
                                loading="lazy"
                            />
                        </Link>

                        {/* Rating */}
                        <div className="flex items-center gap-2 mb-4">
                            <div className="flex">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <svg
                                        key={i}
                                        className="w-5 h-5 text-fg-yellow"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z"/>
                                    </svg>
                                ))}
                            </div>

                            <span className="bg-brand-softer border border-brand-subtle text-fg-brand-strong text-xs font-medium px-2 py-0.5 rounded-sm">
                                4.8 / 5
                            </span>
                        </div>

                        {/* Title */}
                        <Link href="#">
                            <h3 className="text-lg font-semibold text-heading leading-snug line-clamp-2">
                                {product.name}
                            </h3>
                        </Link>

                        {/* Price + Button */}
                        <div className="flex items-center justify-between mt-4">
                            <span className="text-2xl font-bold text-heading">
                                ${product.price}
                            </span>

                            <button
                                type="button"
                                className="inline-flex items-center gap-2 text-black bg-brand hover:bg-brand-strong border border-transparent focus:ring-4 focus:ring-brand-medium shadow-xs font-medium rounded-base text-sm px-4 py-2 transition"
                            >
                                <svg
                                    className="w-4 h-4"
                                    aria-hidden="true"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        stroke="currentColor"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312"
                                    />
                                </svg>
                                Add to cart
                            </button>
                        </div>
                    </div>
                ))}
            {params.slug?.length > 0 && (
                <div>
                    <p>id : {params.slug[0]}</p>
                    <p>Brand : {params.slug[1]}</p>
                </div>
            )}
        </div>
    );
}
