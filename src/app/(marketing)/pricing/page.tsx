import Button from "@/src/components/ui/Button";
import { CheckIcon, XIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const Pricing = async() => {
    const plans = [
        {
            title: "Free",
            cost: "0",
            info: "Perfect for individuals and small teams getting started.",
            details: [
                {
                    features: "Up to 3 team members",
                    available: true
                },
                {
                    features: "Unlimited issues",
                    available: true
                },
                {
                    features: "Basic issue tracking",
                    available: true
                },
                {
                    features: "Email support",
                    available: true
                },
                {
                    features: "API access",
                    available: false
                },
                {
                    features: "Custom fields",
                    available: false
                },
                {
                    features: "Advanced integrations",
                    available: false
                },
            ]
        },
        {
            title: "Pro",
            cost: "10",
            info: "For growing teams that need more features and flexibility.",
            details: [
                {
                    features: "Unlimited team members",
                    available: true
                },
                {
                    features: "Unlimited issues",
                    available: true
                },
                {
                    features: "Advanced issue tracking",
                    available: true
                },
                {
                    features: "Priority support",
                    available: true
                },
                {
                    features: "API access",
                    available: true
                },
                {
                    features: "Custom fields",
                    available: true
                },
                {
                    features: "Advanced integrations",
                    available: false
                },
            ]
        },
        {
            title: "Enterprise",
            cost: "Custom",
            info: "For organizations that need advanced security and support.",
            details: [
                {
                    features: "Unlimited team members",
                    available: true
                },
                {
                    features: "Unlimited issues",
                    available: true
                },
                {
                    features: "Advanced issue tracking",
                    available: true
                },
                {
                    features: "Dedicated support",
                    available: true
                },
                {
                    features: "API access",
                    available: true
                },
                {
                    features: "Custom fields",
                    available: true
                },
                {
                    features: "Advanced integrations",
                    available: true
                },
            ]
        }
    ]


    return (
        <div className="flex flex-col w-full md:w-[1128px] py-20 px-4 md:px-0 gap-y-8">
            <div className="flex flex-col text-center gap-y-4">
                <p className="font-bold text-4xl">Simple, Transparent Pricing</p>
                <p className="text-xl text-gray-300">Choose the plan that&apos;s right for you and your team</p>
            </div>

            <div className="flex flex-col md:flex-row gap-y-8 justify-between">
                {
                    plans.map((v, i) =>
                        <div
                            key={i}
                            className={`flex flex-col gap-y-4 md:max-w-30/100 ${v.title.toLowerCase() !== "pro" ? "bg-[#1F2937]" : "bg-[#1E3A8A]"} p-4 rounded-xl relative`}
                        >
                            {v.title.toLowerCase() === "pro" ? <p className="absolute -right-1 -top-3 bg-blue-700 rounded-2xl px-2 py-1">Popular</p> : <></>}
                            <p className="text-xl font-bold">{v.title}</p>
                            <p><span className="text-3xl font-bold">{v.title.toLowerCase() !== "enterprise" ? "$" : ""}{v.cost}</span><span>{v.title.toLowerCase() === "free" ? " per month" : ""}{v.title.toLowerCase() === "pro" ? " per user / month" : ""}</span></p>
                            <p>{v.info}</p>
                            <div className="flex flex-col gap-y-4">
                                {
                                    v.details.map((v, i) =>
                                        <div key={i} className={`${v.available ? "" : "text-gray-500"} flex gap-y-4 gap-x-2`}>
                                            <div>{v.available ? <CheckIcon className="text-green-500" /> : <XIcon />}</div>
                                            <p>{v.features}</p>
                                        </div>
                                    )
                                }
                            </div>
                            <div className="w-full">
                                {v.title.toLowerCase() === "free" ?
                                    <Link href="/sign-up">
                                        <Button
                                            size="md"
                                            className="w-full border border-gray-500 bg-[#1F2937] hover:bg-[#293545]"
                                        >Sign up Free</Button>
                                    </Link>
                                    : <></>
                                }
                                {v.title.toLowerCase() === "pro" ?
                                    <Button
                                        size="md"
                                        className="w-full border border-gray-500 bg-[#1d4ed8] hover:bg-[#3262e5]"
                                    >Coming Soon</Button>
                                    : <></>
                                }
                                {v.title.toLowerCase() === "enterprise" ?
                                    <Link href="/contact-us">
                                        <Button
                                            size="md"
                                            className="w-full border border-gray-500 bg-[#1F2937] hover:bg-[#293545]"
                                        >Contact Us</Button>
                                    </Link>
                                    : <></>
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Pricing