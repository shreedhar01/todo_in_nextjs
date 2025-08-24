const Faq = ()=>{
    const faq = [
        {
            question:"What is Linear Clone?",
            answer:"Linear Clone is a project management tool inspired by Linear. It helps teams organize, track, and manage their projects and issues in a simple and efficient way."
        },
        {
            question:"How do I create an account?",
            answer:"You can create an account by clicking the 'Sign Up' button in the top navigation bar. You'll need to provide an email address and create a password."
        },
        {
            question:"Is it free to use?",
            answer:"Yes, Linear Clone is completely free to use as it's an open-source project. You can even download the source code and host it yourself."
        },
        {
            question:"Can I contribute to the project?",
            answer:"Absolutely! Linear Clone is open-source and contributions are welcome. Check out our GitHub repository to get started."
        },
        {
            question:"How do I report bugs or request features?",
            answer:"You can report bugs or request features by opening an issue on our GitHub repository. We appreciate your feedback and contributions!"
        },
        {
            question:"What technologies does Linear Clone use?",
            answer:"Linear Clone is built with Next.js, TypeScript, Tailwind CSS, and uses a PostgreSQL database. It leverages the latest features of Next.js App Router for optimal performance."
        },
    ]

    return (
        <div className="flex flex-col gap-y-8 w-full md:w-[1128px] py-20 px-4 md:px-0">
            {
                faq.map((v,i)=>
                <div key={i} className="flex flex-col gap-y-2">
                    <p className="font-medium">{v.question}</p>
                    <p className="text-gray-400">{v.answer}</p>
                </div>
                )
            }
        </div>
    )
}

export default Faq