"use client"
import { MenuIcon } from "lucide-react"
import Link from "next/link"
import React, { useState } from "react"
import Button from "@/src/components/ui/Button"

interface IMenu {
    onclick: boolean
}


const Menu: React.FC<IMenu> = ({ onclick }) => {
    const [touch, setTouch] = useState(false)
    const products = ["Features", "Pricing", "FAQ"]
    return (
        <div className="relative md:hidden ">
            <div
                className="text-white cursor-pointer"
                onClick={() => setTouch(value => !value)}
            >
                <MenuIcon />
            </div>
            <div className={`${touch ? "absolute right-0 top-12" : "hidden"} flex flex-col justify-between p-4 min-h-[200px] min-w-[200px] bg-white rounded`}>
                <ul className="flex flex-col gap-y-1">
                    {products.map((v, i) =>
                        <Link key={i} href={`/${v.toLowerCase()}`}>
                            <p className="hover:text-green-500 bg-gray-600 p-1 rounded">{v}</p>
                        </Link>
                    )}
                </ul>
                <div className="flex justify-between">
                    <Link href="/sign-in">
                        <Button varient="secondary" size="sm" children="Sign In" />
                    </Link>
                    <Link href="/sign-up">
                        <Button size="sm" children="Sign Up" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Menu