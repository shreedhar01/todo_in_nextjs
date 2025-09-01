import { getCurrentUser } from "@/lib/dal"
import IssueForm from "./IssueForm"
import { redirect } from "next/navigation"

const NewIssue = async()=>{
    const user = await getCurrentUser()
    if(!user){
        redirect("/sign-in")
    }

    return <IssueForm userId={user.id} />
}

export default NewIssue