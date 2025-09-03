'use client'

import React, { useState, useTransition } from "react"
import Button from "./ui/Button"
import { Check, Trash2Icon, XIcon } from "lucide-react"
import { useRouter } from "next/navigation"
import { deleteIssues } from "../app/actions/issues"
import toast from "react-hot-toast"

interface DeleteIssueButtonProps {
    id: number,
    custome?: boolean,
    children?: React.ReactNode
}

const DeleteIssueButton: React.FC<DeleteIssueButtonProps> = ({ id, custome, children }) => {
    const router = useRouter()
    const [isPending, startTransition] = useTransition()
    const [isDelete, setIsDelete] = useState(false)

    const handleDelete = async () => {
        startTransition(async () => {
            try {
                const result = await deleteIssues(id)
                if (!result.success) {
                    toast.error("Failed to delete issue.")
                    throw new Error(result.error || "Failed to delete issue.")
                }

                toast.success("Issue delete successfully")
                router.push("/dashboard")
                router.refresh()
            } catch (error) {
                toast.error("Failed to delete issue.")
                console.log("Error while deleting issue :: ", error)
            }
        })
    }

    return (
        <>
            {
                custome ?
                    <div onClick={handleDelete}>
                        {
                            children
                        }
                    </div>
                    :
                    <div>
                        <Button
                            varient="danger"
                            size="sm"
                            onClick={() => setIsDelete(true)}
                            className="flex items-center gap-x-2"
                        >
                            <Trash2Icon size={14} />
                            Delete
                        </Button>
                        {
                            isDelete && (
                                <div className="absolute flex flex-col gap-y-4 bg-red-200 border rounded-xl p-4 top-10 right-0">
                                    <p className="text-red-600">Do you really want to delete ?</p>
                                    <div className="flex justify-between">
                                        <Button
                                            size="sm"
                                            varient="danger"
                                            isLoading={isPending}
                                            onClick={handleDelete}
                                        >
                                            <Check size={16} />
                                        </Button>
                                        <Button
                                            size="sm"
                                            varient="success"
                                            disabled={isPending}
                                            onClick={() => setIsDelete(false)}
                                        >
                                            <XIcon size={16} />
                                        </Button>
                                    </div>
                                </div>
                            )
                        }
                    </div>
            }
        </>
    )
}

export default DeleteIssueButton