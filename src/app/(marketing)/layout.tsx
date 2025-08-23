const MarketingLayout = ({ children }: { children: React.ReactNode }) => {
    const products = ["Features", "Pricing", "FAQ"]
    const resources = ["Documentation", "Github"]
    const legal = ["Terms of Service"]
    return (
        <div>
            <header>

            </header>

            <main>{children}</main>

            <footer>

            </footer>
        </div>
    )
}

export default MarketingLayout