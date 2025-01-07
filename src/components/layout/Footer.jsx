import React from 'react'

const Footer = () => {
    return (
        <footer className="bg-white dark:bg-[#1C1C1C] text-gray-600 dark:text-gray-400 py-10 transition-colors">
            <div className="max-w-screen-xl mx-auto px-4 flex flex-col md:flex-row md:justify-between items-center">
                <p className="mb-4 md:mb-0 text-gray-900 dark:text-gray-300">
                    © {new Date().getFullYear()} Crypto Insights. All rights reserved.
                </p>
                <div className="flex space-x-4">
                    <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Privacy Policy
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Terms of Service
                    </a>
                    <a
                        href="#"
                        className="hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        Contact
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
