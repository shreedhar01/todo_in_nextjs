import NewIssue from "@/src/components/NewIssue"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { Suspense } from "react"

const NewIssuesPage = () => {
    return (
        <div className="flex justify-center w-full  ">
            <div className="flex flex-col gap-y-4 w-full md:w-50/100  px-4 md:px-0 mt-8">
                <Link
                    href="/dashboard"
                    className="flex items-center gap-x-2 text-gray-400 hover:text-white cursor-pointer"
                >
                    <ArrowLeftIcon size={16} />
                    <p className="text-sm">Back to Dashboard</p>
                </Link>
                <p className="text-2xl font-bold">Create New Issue</p>
                <div className="border border-gray-600 rounded-xl">
                    <Suspense fallback={<div>Loading ... </div>}>
                        <NewIssue />
                    </Suspense>
                </div>
            </div>
        </div>
    )
}

export default NewIssuesPage