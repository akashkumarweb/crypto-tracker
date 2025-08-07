import React from 'react'
import {
    HeartIcon,
    StarIcon,
    EnvelopeIcon,
    CodeBracketIcon
} from '@heroicons/react/24/outline'

const Footer = () => {
    const currentYear = new Date().getFullYear()

    const socialLinks = [
        { name: 'GitHub', icon: CodeBracketIcon, href: 'https://github.com/akashkumarweb/crypto-tracker' },
        { name: 'Star Us', icon: StarIcon, href: 'https://github.com/akashkumarweb/crypto-tracker' }
    ]

    return (
        <footer className="bg-apple-gray-900 dark:bg-black text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row items-center justify-between">
                    {/* Brand Section */}
                    <div className="flex items-center mb-6 md:mb-0">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center mr-3">
                            <span className="text-white font-bold text-lg">C</span>
                        </div>
                        <div>
                            <span className="text-xl font-bold">CryptoAnalysis</span>
                            <p className="text-sm text-apple-gray-400 mt-1">
                                Advanced cryptocurrency platform
                            </p>
                        </div>
                    </div>

                    {/* Social Links */}
                    <div className="flex items-center space-x-4">
                        {socialLinks.map((social) => (
                            <a
                                key={social.name}
                                href={social.href}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-10 h-10 bg-apple-gray-800 hover:bg-apple-blue rounded-2xl flex items-center justify-center transition-all duration-300 group"
                            >
                                <social.icon className="w-5 h-5 text-apple-gray-400 group-hover:text-white transition-colors" />
                            </a>
                        ))}
                        <a
                            href="https://akashbuilds.com/contact"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-2 text-apple-gray-400 hover:text-white transition-colors"
                        >
                            <EnvelopeIcon className="w-5 h-5" />
                            <span className="text-sm">Contact</span>
                        </a>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-apple-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
                        <div className="flex items-center space-x-6 text-sm text-apple-gray-400">
                            <span>&copy; {currentYear} CryptoAnalysis</span>
                            <span>•</span>
                            <span>Made with ❤️ by <a href="https://akashbuilds.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300 transition-colors">Akash Kumar</a></span>
                        </div>

                        <div className="flex items-center space-x-6">
                            <div className="flex items-center space-x-2">
                                <div className="w-2 h-2 bg-apple-green rounded-full animate-pulse"></div>
                                <span className="text-sm text-apple-gray-400">System Operational</span>
                            </div>
                            <a
                                href="https://github.com/akashkumarweb/crypto-tracker"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-sm text-apple-gray-400 hover:text-white transition-colors flex items-center space-x-1"
                            >
                                <CodeBracketIcon className="w-4 h-4" />
                                <span>View on GitHub</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}

export default Footer
