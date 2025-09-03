import { getCurrentUser, getIssues } from "@/lib/dal";
import { dateConverter } from "@/lib/utils";
import Badge from "@/src/components/ui/Badge";
import Button from "@/src/components/ui/Button";
import { PlusIcon } from "lucide-react";
import Link from "next/link";
import { ISSUE_STATUS, ISSUE_PRIORITY } from "@/db/schema";
// import ThemeSwitcher from "@/src/components/ThemeSwitcher";

const Dashboard = async () => {
  await getCurrentUser();
  const issues = await getIssues();
  return (
    <div className="flex flex-col w-full  pt-8 px-4 md:px-16">
      <div className="flex items-center justify-between ">
        <p className="text-2xl font-bold">Issues</p>
        <div className="flex gap-x-2 items-center">
          {/* <ThemeSwitcher /> */}
          <Link href="/issues/new">
            <Button
              size="md"
              className="flex items-center justify-center gap-x-2"
            >
              <PlusIcon size={16} />
              New Issues
            </Button>
          </Link>
        </div>
      </div>
      {issues.length > 0 ? (
        <div className="w-full border border-gray-600 rounded-2xl mt-8 overflow-hidden">
          <div className="w-full grid grid-cols-12 border-b border-gray-600 py-2 px-4">
            <div className="col-span-5">Title</div>
            <div className="col-span-4 md:col-span-2">Status</div>
            <div className="col-span-2">Priority</div>
            <div className="hidden md:block col-span-3">Created</div>
          </div>
          <div className="w-full divide-y divide-gray-900 ">
            {issues.map((issue) => (
              <Link
                href={`/issues/${issue.id}`}
                key={issue.id}
                className="w-full grid grid-cols-12 items-center py-2 px-4 bg-neutral-700 hover:bg-neutral-900"
              >
                <div className=" text-sm md:text-lg col-span-5">
                  {issue.title}
                </div>
                <div className="col-span-4 md:col-span-2 text-sm">
                  <Badge size="md" status={issue.status}>
                    {ISSUE_STATUS[issue.status].label}
                  </Badge>
                </div>
                <div className="col-span-2 text-sm">
                  <Badge size="md" priority={issue.priority}>
                    {ISSUE_PRIORITY[issue.priority].label}
                  </Badge>
                </div>
                <div className="hidden md:block col-span-3">
                  {dateConverter(issue.createdAt)}
                </div>
              </Link>
            ))}
          </div>
        </div>
      ) : (
        <div>No issues found</div>
      )}
    </div>
  );
};

export default Dashboard;
