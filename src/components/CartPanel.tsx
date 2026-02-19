"use client";

import { useCart } from "@/context/CartContext";

interface CartPanelProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function CartPanel({ isOpen, onClose }: CartPanelProps) {
    const { items, totalItems, totalPrice, removeFromCart, updateQuantity, clearCart } =
        useCart();

    return (
        <>
            {/* Backdrop */}
            <div
                className={`fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                    }`}
                onClick={onClose}
            />

            {/* Panel */}
            <div
                id="cart-panel"
                className={`fixed top-0 right-0 z-[70] h-full w-full max-w-md bg-[#111111] border-l border-white/5 shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? "translate-x-0" : "translate-x-full"
                    }`}
            >
                {/* Header */}
                <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
                    <div className="flex items-center gap-3">
                        <h2 className="text-lg font-semibold text-white">Shopping Cart</h2>
                        {totalItems > 0 && (
                            <span className="px-2.5 py-0.5 bg-violet-500/20 text-violet-400 text-xs font-medium rounded-full">
                                {totalItems} {totalItems === 1 ? "item" : "items"}
                            </span>
                        )}
                    </div>
                    <button
                        id="close-cart-button"
                        onClick={onClose}
                        className="p-2 rounded-lg text-white/40 hover:text-white hover:bg-white/5 transition-all"
                        aria-label="Close cart"
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18 18 6M6 6l12 12"
                            />
                        </svg>
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto px-6 py-4" style={{ maxHeight: "calc(100vh - 200px)" }}>
                    {items.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-64 text-center">
                            <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center mb-4">
                                <svg
                                    className="w-8 h-8 text-white/20"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                    />
                                </svg>
                            </div>
                            <p className="text-white/40 text-sm">Your cart is empty</p>
                            <p className="text-white/20 text-xs mt-1">
                                Add some products to get started
                            </p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {items.map((item) => (
                                <div
                                    key={item.product.id}
                                    className="flex gap-4 p-3 rounded-xl bg-white/[0.03] border border-white/5 hover:border-white/10 transition-colors"
                                >
                                    {/* Product Image */}
                                    <div className="w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-white/5">
                                        <img
                                            src={item.product.image}
                                            alt={item.product.name}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>

                                    {/* Details */}
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-sm font-medium text-white/90 truncate">
                                            {item.product.name}
                                        </h3>
                                        <p className="text-sm text-violet-400 font-semibold mt-0.5">
                                            ฿{(item.product.price * 35).toLocaleString()}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.quantity - 1)
                                                }
                                                className="w-6 h-6 rounded-md bg-white/5 text-white/60 hover:bg-white/10 hover:text-white flex items-center justify-center text-xs transition-all"
                                            >
                                                −
                                            </button>
                                            <span className="text-xs text-white/80 w-6 text-center font-medium">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQuantity(item.product.id, item.quantity + 1)
                                                }
                                                className="w-6 h-6 rounded-md bg-white/5 text-white/60 hover:bg-white/10 hover:text-white flex items-center justify-center text-xs transition-all"
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>

                                    {/* Remove Button */}
                                    <button
                                        onClick={() => removeFromCart(item.product.id)}
                                        className="self-start p-1.5 rounded-lg text-white/20 hover:text-red-400 hover:bg-red-400/10 transition-all"
                                        aria-label={`Remove ${item.product.name} from cart`}
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                            />
                                        </svg>
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Footer */}
                {items.length > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5 bg-[#111111]">
                        <div className="flex items-center justify-between mb-4">
                            <span className="text-sm text-white/50">Total</span>
                            <span className="text-xl font-bold text-white">
                                ฿{(totalPrice * 35).toLocaleString()}
                            </span>
                        </div>
                        <button
                            id="checkout-button"
                            className="w-full py-3 bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-semibold rounded-xl shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200"
                        >
                            Checkout
                        </button>
                        <button
                            onClick={clearCart}
                            className="w-full mt-2 py-2.5 text-sm text-white/40 hover:text-white/70 transition-colors"
                        >
                            Clear Cart
                        </button>
                    </div>
                )}
            </div>
        </>
    );
}
