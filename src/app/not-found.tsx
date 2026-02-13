import Link from "next/link";

export default function NotFound() {
    return (
        <main className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                {/* 404 Number */}
                <h1 className="text-8xl sm:text-9xl font-bold bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
                    404
                </h1>

                {/* Message */}
                <p className="mt-4 text-xl text-white/60 font-medium">
                    Product not found
                </p>
                <p className="mt-2 text-sm text-white/30 max-w-sm mx-auto">
                    The product you&apos;re looking for doesn&apos;t exist or may have been
                    removed from our catalog.
                </p>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mt-8">
                    <Link
                        href="/"
                        className="px-6 py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 transition-all"
                    >
                        Back to Home
                    </Link>
                    <Link
                        href="/#products"
                        className="px-6 py-3 bg-white/5 border border-white/10 text-white/70 hover:text-white font-semibold rounded-xl hover:bg-white/10 transition-all"
                    >
                        Browse Products
                    </Link>
                </div>
            </div>
        </main>
    );
}
