"use client";
import "./globals.css";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonStyles } from "@/components/tailgrids/core/button";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useEffect, useState, createContext } from "react";
import { fetchProducts, Product } from "@/data/products";
import { Badge } from "@/components/tailgrids/core/badge";

export const globalDataContext = createContext<any>(null);

export default function RootLayout({ children }: LayoutProps<"/">) {
  const pathname = usePathname();

  const [products, setProducts] = useState<Product[]>([]);
  const [carts, setCarts] = useState<Product[]>([]);

  useEffect(() => {
    fetchProducts()
      .then((data) => setProducts(data as Product[]))
      .catch((err) => setProducts([]));
  }, []);

  useEffect(() => {
    console.log(products);
  }, [products]);

  return (
    <globalDataContext.Provider
      value={{ products, setProducts, carts, setCarts }}
    >
      <html>
        <head>
          <title>CSI205-68096159-ภาณุ ศรีบุญเพ็ง</title>
        </head>
        <body>
          <Header />
          <nav className="flex justify-center gap-3 my-4">
            <Link
              href={"/"}
              className={buttonStyles({
                appearance: pathname === "/" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Home
            </Link>
            <Link
              href={"/calculator"}
              className={buttonStyles({
                appearance: pathname === "/calculator" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Calculator
            </Link>
            <Link
              href={"/animation"}
              className={buttonStyles({
                appearance: pathname === "/animation" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Animation
            </Link>
            <Link
              href={"/todos"}
              className={buttonStyles({
                appearance: pathname === "/todos" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Todos
            </Link>
            <Link
              href={"/products"}
              className={buttonStyles({
                appearance: pathname === "/products" ? "fill" : "outline",
                variant: "primary",
                size: "sm",
              })}
            >
              Products({products.length})
            </Link>
            <div className="relative">
              <Link
                href={"/carts"}
                className={buttonStyles({
                  appearance: pathname === "/carts" ? "fill" : "outline",
                  variant: "primary",
                  size: "sm",
                })}
              >
                Carts
              </Link>
              <Badge
                size={"sm"}
                className="bg-red-500 text-white font-bold absolute -top-2 -right-2 pointer-events-none"
              >
                {carts.length}
              </Badge>
            </div>
          </nav>
          <main className="min-h-full flex flex-col">{children}</main>
          <Footer />
        </body>
      </html>
    </globalDataContext.Provider>
  );
}
