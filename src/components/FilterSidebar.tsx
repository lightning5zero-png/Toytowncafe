"use client";

import { useEffect, useState } from "react";
import { Product } from "@/types/product";

interface FilterSidebarProps {
    products: Product[];
    onFilterChange: (filters: {
        categories: string[];
        brands: string[];
        priceRange: [number, number];
    }) => void;
    className?: string; // Allow custom styling
}

export default function FilterSidebar({ products, onFilterChange, className = "" }: FilterSidebarProps) {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 100000]); // Default max high enough
    const [isMobileOpen, setIsMobileOpen] = useState(false);

    // Dynamic Data Extraction
    const categories = Array.from(new Set(products.map((p) => p.category))).sort();
    const brands = Array.from(new Set(products.map((p) => p.brand))).filter(Boolean).sort();
    const minPrice = Math.min(...products.map((p) => p.price * 35));
    const maxPrice = Math.max(...products.map((p) => p.price * 35));

    useEffect(() => {
        // Initialize price range based on actual data once
        if (products.length > 0) {
            setPriceRange([0, Math.ceil(maxPrice)]);
        }
    }, [products]); // Run only when products change (initial load)

    // Notify parent of changes
    useEffect(() => {
        onFilterChange({
            categories: selectedCategories,
            brands: selectedBrands,
            priceRange,
        });
    }, [selectedCategories, selectedBrands, priceRange.join(",")]); // Join array to detect value changes

    const toggleCategory = (category: string) => {
        setSelectedCategories((prev) =>
            prev.includes(category)
                ? prev.filter((c) => c !== category)
                : [...prev, category]
        );
    };

    const toggleBrand = (brand: string) => {
        setSelectedBrands((prev) =>
            prev.includes(brand)
                ? prev.filter((b) => b !== brand)
                : [...prev, brand]
        );
    };

    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, isMin: boolean) => {
        const val = Number(e.target.value);
        setPriceRange((prev) => isMin ? [val, prev[1]] : [prev[0], val]);
    };

    const resetFilters = () => {
        setSelectedCategories([]);
        setSelectedBrands([]);
        setPriceRange([0, Math.ceil(maxPrice)]);
    };

    return (
        <>
            {/* Mobile Filter Toggle Button */}
            <button
                className="lg:hidden fixed bottom-6 right-6 z-40 bg-slate-900 text-white p-4 rounded-full shadow-2xl flex items-center gap-2"
                onClick={() => setIsMobileOpen(true)}
            >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                <span className="font-bold text-xs uppercase tracking-widest">Filter</span>
            </button>

            {/* Backdrop for Mobile */}
            {isMobileOpen && (
                <div
                    className="fixed inset-0 bg-black/50 z-[60] lg:hidden backdrop-blur-sm transition-opacity"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar Content */}
            <aside className={`
                fixed inset-y-0 right-0 z-[70] w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:w-64 lg:shadow-none lg:block lg:z-auto
                ${isMobileOpen ? "translate-x-0" : "translate-x-full"}
                ${className}
            `}>
                <div className="h-full overflow-y-auto p-6 lg:p-0">
                    <div className="flex items-center justify-between mb-8 lg:hidden">
                        <h2 className="text-xl font-black text-slate-900">Filters</h2>
                        <button onClick={() => setIsMobileOpen(false)} className="p-2 text-slate-400 hover:text-slate-900">
                            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18 18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                    {/* Reset Button */}
                    <div className="mb-8 flex items-center justify-between">
                        <span className="text-xs font-black uppercase tracking-widest text-slate-400">Refine By</span>
                        {(selectedCategories.length > 0 || selectedBrands.length > 0 || priceRange[0] > 0 || priceRange[1] < maxPrice) && (
                            <button
                                onClick={resetFilters}
                                className="text-[10px] font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest"
                            >
                                Reset All
                            </button>
                        )}
                    </div>

                    {/* Categories */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-900 mb-4">Categories</h3>
                        <div className="space-y-2">
                            {categories.map(category => (
                                <label key={category} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedCategories.includes(category)
                                        ? "bg-slate-900 border-slate-900"
                                        : "border-slate-300 group-hover:border-slate-400"
                                        }`}>
                                        {selectedCategories.includes(category) && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedCategories.includes(category)}
                                        onChange={() => toggleCategory(category)}
                                    />
                                    <span className={`text-sm transition-colors ${selectedCategories.includes(category) ? "font-semibold text-slate-900" : "text-slate-500 group-hover:text-slate-700"
                                        }`}>
                                        {category}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Brands */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-900 mb-4">Brands</h3>
                        <div className="space-y-2 max-h-48 overflow-y-auto scrollbar-hide">
                            {brands.map(brand => (
                                <label key={brand} className="flex items-center gap-3 cursor-pointer group">
                                    <div className={`w-4 h-4 rounded border flex items-center justify-center transition-colors ${selectedBrands.includes(brand)
                                        ? "bg-slate-900 border-slate-900"
                                        : "border-slate-300 group-hover:border-slate-400"
                                        }`}>
                                        {selectedBrands.includes(brand) && (
                                            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                                            </svg>
                                        )}
                                    </div>
                                    <input
                                        type="checkbox"
                                        className="hidden"
                                        checked={selectedBrands.includes(brand)}
                                        onChange={() => toggleBrand(brand)}
                                    />
                                    <span className={`text-sm transition-colors ${selectedBrands.includes(brand) ? "font-semibold text-slate-900" : "text-slate-500 group-hover:text-slate-700"
                                        }`}>
                                        {brand}
                                    </span>
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Price Range */}
                    <div className="mb-8">
                        <h3 className="text-sm font-bold text-slate-900 mb-4">Price Range (฿)</h3>
                        <div className="flex items-center gap-2 mb-6">
                            <input
                                type="number"
                                value={priceRange[0]}
                                onChange={(e) => handlePriceChange(e, true)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-400"
                                placeholder="Min"
                                min={0}
                            />
                            <span className="text-slate-400">-</span>
                            <input
                                type="number"
                                value={priceRange[1]}
                                onChange={(e) => handlePriceChange(e, false)}
                                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-slate-400"
                                placeholder="Max"
                                min={0}
                            />
                        </div>

                        {/* Interactive Range Slider */}
                        <div className="relative h-1 bg-slate-100 rounded-full mb-4">
                            {/* Track highlight */}
                            <div
                                className="absolute h-full bg-slate-900 rounded-full z-10"
                                style={{
                                    left: `${(priceRange[0] / (maxPrice || 1)) * 100}%`,
                                    right: `${100 - (priceRange[1] / (maxPrice || 1)) * 100}%`
                                }}
                            />

                            {/* Dual Handles Inputs */}
                            <input
                                type="range"
                                min={0}
                                max={Math.ceil(maxPrice)}
                                value={priceRange[0]}
                                onChange={(e) => {
                                    const val = Math.min(Number(e.target.value), priceRange[1] - 1);
                                    setPriceRange([val, priceRange[1]]);
                                }}
                                className="absolute inset-x-0 -top-1.5 h-4 w-full bg-transparent appearance-none pointer-events-none z-20 cursor-pointer 
                                    [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-900 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:active:scale-125 [&::-webkit-slider-thumb]:transition-transform
                                    [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-slate-900 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:active:scale-125 [&::-moz-range-thumb]:transition-transform"
                            />
                            <input
                                type="range"
                                min={0}
                                max={Math.ceil(maxPrice)}
                                value={priceRange[1]}
                                onChange={(e) => {
                                    const val = Math.max(Number(e.target.value), priceRange[0] + 1);
                                    setPriceRange([priceRange[0], val]);
                                }}
                                className="absolute inset-x-0 -top-1.5 h-4 w-full bg-transparent appearance-none pointer-events-none z-30 cursor-pointer
                                    [&::-webkit-slider-thumb]:pointer-events-auto [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white [&::-webkit-slider-thumb]:border-2 [&::-webkit-slider-thumb]:border-slate-900 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:shadow-md [&::-webkit-slider-thumb]:active:scale-125 [&::-webkit-slider-thumb]:transition-transform
                                    [&::-moz-range-thumb]:pointer-events-auto [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:bg-white [&::-moz-range-thumb]:border-2 [&::-moz-range-thumb]:border-slate-900 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:shadow-md [&::-moz-range-thumb]:active:scale-125 [&::-moz-range-thumb]:transition-transform"
                            />
                        </div>

                        <div className="flex justify-between mt-2 text-[10px] text-slate-400 font-bold uppercase tracking-tighter">
                            <span>0</span>
                            <span>{Math.ceil(maxPrice).toLocaleString()}</span>
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
