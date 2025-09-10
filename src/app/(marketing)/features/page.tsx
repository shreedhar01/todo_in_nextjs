const Features = async() => {
    const features = [
        {
            title: "Issue Tracking",
            description: "Create, assign, and track issues with ease. Set priorities, due dates, and statuses to keep your team on track."
        },
        {
            title: "Intuitive UI",
            description: "A clean, modern interface that makes project management a breeze. No clutter, just what you need to get work done."
        },
        {
            title: "Collaboration",
            description: "Work together seamlessly. Comment on issues, mention team members, and keep everyone in the loop."
        },
        {
            title: "Custom Workflows",
            description: "Create workflows that match your team's process. Customize statuses, labels, and more."
        },
        {
            title: "Real-time Updates",
            description: "See changes as they happen. No need to refresh or wait for updates."
        },
        {
            title: "Powerful Search",
            description: "Find anything instantly with our powerful search. Filter by assignee, status, priority, and more."
        },
    ]
    return (
        <div className="flex flex-col items-center gap-y-16 w-full md:w-[1128px] py-20 px-4 md:px-0">
            <div className="flex flex-col text-center gap-y-4">
                <p className="font-bold text-4xl">Features</p>
                <p className="text-xl text-gray-500">Discover how Linear Clone can help you manage your projects more efficiently.</p>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-8">
                {
                    features.map((v, i) =>
                        <div key={i} className="flex flex-col w-full md:w-32/100 border border-gray-500 rounded p-4 gap-y-4 bg-[#1F2937]">
                            <p className="text-2xl font-bold">{v.title}</p>
                            <p>{v.description}</p>
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default Features