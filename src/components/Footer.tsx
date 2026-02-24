import Link from "next/link";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        Shop: ["All Products", "New Arrivals", "Best Sellers", "Deals"],
        Support: ["Help Center", "Shipping", "Returns", "Contact Us"],
        Company: ["About Us", "Careers", "Blog", "Press"],
        Legal: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
    };

    return (
        <footer id="main-footer" className="border-t border-white/5 bg-[#060606]">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Newsletter */}
                <div className="py-12 sm:py-16 border-b border-white/5">
                    <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                        <div>
                            <h3 className="text-xl font-bold text-white">Stay in the loop</h3>
                            <p className="text-sm text-white/40 mt-1">
                                Get exclusive deals and new product alerts straight to your inbox.
                            </p>
                        </div>
                        <form className="flex gap-3 w-full lg:w-auto">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="flex-1 lg:w-80 px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-sm text-white placeholder-white/30 focus:outline-none focus:ring-2 focus:ring-violet-500/50"
                            />
                            <button
                                type="submit"
                                className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-sm rounded-xl hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-500/25 transition-all whitespace-nowrap"
                            >
                                Subscribe
                            </button>
                        </form>
                    </div>
                </div>

                {/* Links Grid */}
                <div className="py-12 sm:py-16 grid grid-cols-2 sm:grid-cols-4 gap-8">
                    {Object.entries(footerLinks).map(([title, links]) => (
                        <div key={title}>
                            <h4 className="text-sm font-semibold text-white/80 mb-4">
                                {title}
                            </h4>
                            <ul className="space-y-2.5">
                                {links.map((link) => (
                                    <li key={link}>
                                        <Link
                                            href="#"
                                            className="text-sm text-white/30 hover:text-violet-400 transition-colors"
                                        >
                                            {link}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom Bar */}
                <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                            <svg
                                className="w-4 h-4 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={2}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
                                />
                            </svg>
                        </div>
                        <span className="text-sm font-bold text-white uppercase ">
                            Toytown<span className="text-blue-500">cafe</span>
                        </span>
                    </div>
                    <p className="text-[10px] text-white/20 font-black uppercase ">
                        © {currentYear} Toytowncafe. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
