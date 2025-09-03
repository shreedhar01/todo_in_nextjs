
import { getCurrentUser, getIssues } from "@/lib/dal";
import DeleteIssueButton from "@/src/components/DeleteIssueButton";
import Button from "@/src/components/ui/Button";
import { PenIcon, PlusIcon, SidebarCloseIcon, SidebarOpenIcon, Trash2Icon } from "lucide-react";
import Link from "next/link";

export default async function DashboardLayout({ children }: { children: React.ReactNode }) {
    // await getCurrentUser();
    const issues = await getIssues();
    return (
        <div className="flex min-h-screen w-full  md:justify-end">
            <div className="hidden md:flex flex-col justify-between fixed top-0 left-0 max-h-screen min-h-screen w-64 border border-neutral-600 bg-neutral-900 p-4">
                <div className="flex flex-col gap-y-8">
                    <p className="text-xl font-bold">Mode</p>
                    <div className="flex flex-col gap-y-4">
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
                                <p >New Issue</p>
                            </Button>
                        </Link>
                        <p className="border-b border-dashed border-neutral-500">Issues</p>
                        <div className="flex flex-col divide-y max-h-[50%] flex-1 min-h-0 divide-neutral-500 overflow-y-scroll">
                            {
                                issues.map(v =>
                                    <div
                                        key={v.id}
                                        className="group flex items-center justify-between overflow-hidden "
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
                <div className="min-h-40">

                    <p>hy</p>
                </div>
            </div>
            <div className="flex w-full md:max-w-[83%]">
                {children}
            </div>
        </div>
    )
}