
import { getCurrentUser, getIssues } from "@/lib/dal";
import DeleteIssueButton from "@/src/components/DeleteIssueButton";
import LogOut from "@/src/components/LogOut";
import Button from "@/src/components/ui/Button";
import { PenIcon, PlusIcon, Trash2Icon, User2Icon } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    await getCurrentUser();
    const issues = await getIssues();
    return (
        <div className="flex min-h-screen w-full md:justify-end">
            <div className="hidden md:flex flex-col fixed top-0 left-0 h-screen w-64 border border-neutral-600 bg-neutral-900">
                {/* Top section with issues */}
                <div className="flex flex-col gap-y-8 p-4 flex-1 min-h-0">
                    <p className="text-xl font-bold">Mode</p>
                    <div className="flex flex-col gap-y-4 flex-1 min-h-0">
                        <Link
                            href="/issues/new"
                            className="w-full"
                        >
                            <Button
                                size="md"
                                varient="secondary"
                                className="flex w-full gap-x-2 items-center"
                            >
                                <PlusIcon size={16} />
                                <p>New Issue</p>
                            </Button>
                        </Link>
                        <p className="border-b border-dashed border-neutral-500">Issues</p>
                        {/* Issues list with proper scrolling */}
                        <div className="flex flex-col divide-y divide-neutral-500 overflow-y-auto flex-1 min-h-0">
                            {
                                issues.map(v =>
                                    <div
                                        key={v.id}
                                        className="group flex items-center justify-between overflow-hidden min-h-10"
                                    >
                                        <p className="min-w-0 flex-1 truncate py-1">{v.title}</p>
                                        <div className="hidden shrink-0 group-hover:flex gap-x-1">
                                            <Link
                                                href={`/issues/${v.id}/edit`}
                                            >
                                                <Button
                                                    size="smm"
                                                    varient="secondary"
                                                >
                                                    <PenIcon size={16} />
                                                </Button>
                                            </Link>
                                            <DeleteIssueButton id={v.id} custome>
                                                <Button
                                                    size="smm"
                                                    varient="secondary"
                                                >
                                                    <Trash2Icon size={16} />
                                                </Button>
                                            </DeleteIssueButton>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>

                {/* Bottom section with user info - always visible */}
                <div className="flex flex-col gap-y-2 bg-neutral-800 p-4 border-t border-neutral-600">
                    <div className="flex items-center bg-gray-600 gap-x-2 rounded p-2">
                        <User2Icon size={20} className="bg-black rounded-full p-1" />
                        <p className="truncate">{issues[0].user.email}</p>
                    </div>
                    <div className="w-full">
                        <LogOut />
                    </div>
                </div>
            </div>

            <div className="flex w-full md:max-w-[calc(100%-16rem)]">
                {children}
            </div>
        </div>
    )
}