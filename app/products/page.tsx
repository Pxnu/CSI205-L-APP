"use client";
import { useContext, useEffect } from "react";
import { globalDataContext } from "../layout";
import { Product } from "@/data/products";
import Image from "next/image";
import { Button, buttonStyles } from "@/components/tailgrids/core/button";

export default function Page() {
  const { products, setProducts, carts, setCarts } =
    useContext(globalDataContext);

  useEffect(() => {
    console.log(products);
  }, [products]);

  const addToCarts = (product: Product) => {
    setProducts(products.filter((p: Product) => p.id != product.id));

    setCarts([...carts, product]);
  };

  return (
    <div className="border-2 border-gray-500 rounded-md w-fit mx-auto overflow-hidden">
      <div className="grid grid-cols-5 gap-4 p-4 bg-cyan-100/20">
        {products.map((product: Product) => (
          <div key={product.id}>
            <div className="relative w-37.5 h-37.5 border-2 border-gray-500/50 rounded-t-md overflow-hidden">
              <Image
                src={product.thumbnailUrl}
                alt={"image"}
                width={150}
                height={150}
              />
              <div className="absolute top-0 right-0 bg-black/40 px-1 rounded-md text-white text-sm m-1">
                {product.price}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/60 text-white text-sm px-2 py-1 line-clamp-2">
                {product.title}
              </div>
            </div>
            <div
              className={`${buttonStyles({
                variant: "success",
                appearance: "outline",
                size: "sm",
              })} rounded-none rounded-b-md cursor-pointer`}
              onClick={() => {
                addToCarts(product);
              }}
            >
              <span className="px-3 pt-2 text-[1rem] font-bold">Add to carts</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}