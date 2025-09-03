import { getIssue } from "@/lib/dal"
import IssueForm from "@/src/components/IssueForm"
import { ArrowLeftIcon } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Suspense } from "react"

const Edit = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params
  const issue = await getIssue(Number(id))

  if(!issue){
    notFound()
  }

  return (
    <div className="flex justify-center w-full">
      <div className="flex flex-col gap-y-4 md:min-w-50/100 mt-8 mx-4 md:mx-0">
        <Link
          href={`/issues/${id}`}
          className="flex items-center gap-x-1 text-neutral-500 hover:text-neutral-300 cursor-pointer"
        >
          <ArrowLeftIcon size={16} />
          <p className="text-sm">Back to Issue</p>
        </Link>
        <p className="text-2xl font-bold">Edit Issue</p>
        <Suspense fallback={<div>Loading...</div>}>
          <IssueForm userId={issue?.userId} issue={issue} isEditing/>
        </Suspense>
      </div>
    </div>
  )
}

export default Edit