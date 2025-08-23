import Button from "@/src/components/ui/Button"

const LandingPage = () => {
    return (
        <div className="flex justify-center items-center min-h-screen w-full">
            <main className="flex justify-center">
                <div className="flex flex-col items-center justify-center text-center gap-y-8">
                    <p className="font-bold md:font-extrabold text-4xl md:text-5xl md:w-50/100">Issue tracking <span className="text-brand-color-primary">simplified.</span></p>
                    <p className="text-xl text-neutral-400 md:w-75/100">A minimal and elegant issue tracking tool for modern teams. Manage your projects with ease.</p>
                    <Button className="bg-brand-color-primary" children="Get Started"/>
                </div>
            </main>
        </div>
    )
}

export default LandingPage