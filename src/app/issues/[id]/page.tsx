import { getIssue } from "@/lib/dal";
import DeleteIssueButton from "@/src/components/DeleteIssueButton";
import Badge from "@/src/components/ui/Badge";
import Button from "@/src/components/ui/Button";
import { ArrowLeftIcon, Edit2Icon } from "lucide-react";
import Link from "next/link";
import { ISSUE_STATUS, ISSUE_PRIORITY } from "@/db/schema";
import { dateConverter } from "@/lib/utils";

export default async function IssuePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const issue = await getIssue(Number(id))
    return (
        <div className="flex flex-col items-center w-full px-4 md:px-0">
            <div className="flex flex-col gap-y-8 w-full md:w-50/100 mt-8">
                <div className="flex flex-col gap-y-4">
                    <Link
                        href="/dashboard"
                        className="flex items-center text-gray-500 hover:text-gray-300 gap-x-2"
                    >
                        <ArrowLeftIcon size={16} />
                        <p className="text-sm">Back To Dashboard</p>
                    </Link>
                    <div className="flex justify-between relative">
                        <p className="text-2xl font-bold">{issue?.title}</p>
                        <div className="flex gap-x-2 ">
                            <Link
                                href={`/issues/${issue?.id}/edit`}
                            >
                                <Button
                                    size="sm"
                                    varient="outline"
                                    className="flex items-center gap-x-2 cursor-pointer"
                                >
                                    <Edit2Icon size={12} />
                                    <p>Edit</p>
                                </Button>

                            </Link>
                            <DeleteIssueButton id={Number(id)} />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-y-8 w-full border border-neutral-700 rounded-2xl p-4 bg-neutral-800">
                    <div className="flex items-center gap-x-4">
                        <Badge
                            size="sm"
                            status={issue?.status}
                        >
                            <p>{issue && ISSUE_STATUS[issue?.status]?.label}</p>
                        </Badge>
                        <Badge
                            size="sm"
                            priority={issue?.priority}
                        >
                            <p>{issue && ISSUE_PRIORITY[issue?.priority]?.label}</p>
                        </Badge>
                        <p className="hidden md:block text-sm text-neutral-400">
                            {
                                issue?.createdAt
                                    ? `Created about ${dateConverter(issue.createdAt)}`
                                    : "Created date unknown"
                            }
                        </p>
                        <p className=" text-sm text-neutral-400">
                            {issue?.createdAt
                                ? `Updated about ${dateConverter(issue.updatedAt)}`
                                : "Updated date unknown"}
                        </p>

                    </div>
                    <p>{issue?.description}</p>
                </div>
                <div className="flex flex-col gap-y-4 w-full border border-neutral-700 rounded-2xl p-4 bg-neutral-800">
                    <p className="text-lg font-medium">Details</p>
                    <div className="flex flex-col md:grid grid-cols-2 gap-y-4">
                        <div className="md:col-span-1">
                            <p className="text-neutral-400">Assigned to:</p>
                            <p>{issue?.user.email}</p>
                        </div>
                        <div className="md:col-span-1">
                            <p className="text-neutral-400">Status</p>
                            <Badge
                                size="sm"
                                status={issue?.status}
                            >
                                <p>{issue && ISSUE_STATUS[issue?.status]?.label}</p>
                            </Badge>
                        </div>
                        <div className="md:col-span-1">
                            <p className="text-neutral-400">Priority</p>
                            <Badge
                                size="sm"
                                priority={issue?.priority}
                            >
                                <p>{issue && ISSUE_PRIORITY[issue?.priority]?.label}</p>
                            </Badge>
                        </div>
                        <div className="md:col-span-1">
                            <p className="text-neutral-400">Created</p>
                            <p>{
                                issue?.createdAt
                                    ? `Created about ${dateConverter(issue.createdAt)}`
                                    : "Created date unknown"
                            }</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}