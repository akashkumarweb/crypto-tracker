import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-primary-bg text-secondary-text py-10">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center">
                <p className="mb-4 md:mb-0">© {new Date().getFullYear()} Crypto Insights. All rights reserved.</p>
                <div className="flex space-x-4">
                    <a href="#" className="hover:text-primary-text transition-colors">Privacy Policy</a>
                    <a href="#" className="hover:text-primary-text transition-colors">Terms of Service</a>
                    <a href="#" className="hover:text-primary-text transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    )
}

export default Footer