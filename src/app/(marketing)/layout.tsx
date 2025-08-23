import Link from "next/link"
import Button from "@/src/components/ui/Button"
import Menu from "@/src/components/ui/Menu"



const MarketingLayout = async ({ children }: { children: React.ReactNode }) => {
    const products = ["Features", "Pricing", "FAQ"]
    const resources = ["Documentation", "Github"]
    const legal = ["Terms of Service"]

    return (
        <div className="flex flex-col items-center w-full">
            <header className="flex justify-center w-full md:w-[1128px] px-4 md:px-0 h-[64px] border-b border-gray-600">
                <nav className="flex justify-between items-center w-full">
                    <div className="flex items-center justify-center gap-x-16">
                        <Link href="/">
                            <p className="text-2xl font-bold text-brand-color-primary">Mode</p>
                        </Link>
                        <ul className="hidden md:flex gap-x-8">
                            {products.map((v, i) =>
                                <Link key={i} href={`/${v.toLowerCase()}`}>
                                    <li className="cursor-pointer hover:text-brand-color-primary">{v}</li>
                                </Link>
                            )}
                        </ul>
                    </div>

                    {/* for big devices */}
                    <div className="hidden md:flex gap-x-8">
                        <Link href="/sign-in">
                            <Button varient="secondary" size="md" children="Sign In" />
                        </Link>
                        <Link href="/sign-up">
                            <Button size="md" children="Sign Up" />
                        </Link>
                    </div>

                    {/* for small devices */}
                    <Menu onclick={true} />
                </nav>
            </header>

            <main>{children}</main>

            <footer className="flex flex-col w-full md:w-[1128px] px-4 py-4  ">
                <div className="flex flex-col md:flex-row md:justify-between py-2 w-full border-b border-t border-gray-600 gap-y-8">
                    <div className="md:max-w-25/100">
                        <p className="font-bold text-brand-color-primary">Mode</p>
                        <p>A modern project management tool built with Next.js.</p>
                    </div>
                    <div className="flex gap-x-8">
                        <div className="flex flex-col gap-y-2">
                            <p className="font-bold">Products</p>
                            <ul className="flex flex-col gap-x-8">
                                {products.map((v, i) =>
                                    <Link key={i} href={`/${v.toLowerCase()}`}>
                                        <li className="cursor-pointer hover:text-brand-color-primary">{v}</li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <p className="font-bold">Resources</p>
                            <ul className="flex flex-col gap-x-8">
                                {resources.map((v, i) =>
                                    <Link key={i} href={`/${v.toLowerCase()}`}>
                                        <li className="cursor-pointer hover:text-brand-color-primary">{v}</li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                        <div className="flex flex-col gap-y-2">
                            <p className="font-bold">Legal</p>
                            <ul className="flex flex-col gap-x-8">
                                {legal.map((v, i) =>
                                    <Link key={i} href={`/${v.toLowerCase()}`}>
                                        <li className="cursor-pointer hover:text-brand-color-primary">{v}</li>
                                    </Link>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
                <p className="text-center text-gray-500">© 2025 Mode. All rights reserved.</p>
            </footer>
        </div>
    )
}

export default MarketingLayout