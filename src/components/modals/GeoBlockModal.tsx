"use client";

import React, { useEffect } from "react";
import { X, MapPin } from "lucide-react";

interface GeoBlockModalProps {
    isVisible: boolean;
    onClose: () => void;
    onProvideAnyway: () => void;
}

const GeoBlockModal: React.FC<GeoBlockModalProps> = ({
    isVisible,
    onClose,
    onProvideAnyway,
}) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => e.key === "Escape" && onClose();
        if (isVisible) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "unset";
        };
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60"
            onClick={onClose}
        >
            <div
                className="relative bg-white max-w-md w-full mx-4 rounded-2xl shadow-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition p-1 z-10"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-6 text-center">
                    <div className="flex justify-center mb-4">
                        <div className="p-3 bg-orange-100 rounded-full">
                            <MapPin className="w-8 h-8 text-orange-600" />
                        </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        Our services are currently limited to the USA.
                    </h3>
                    <p className="text-gray-600 text-sm leading-relaxed mb-6">
                        We are working hard to expand access worldwide. Stay tuned for updates
                        on our global availability!
                    </p>

                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-3 mb-6">
                        <p className="text-orange-800 text-sm font-medium">
                            Coming soon to India!
                        </p>
                    </div>

                    {/* Footer */}
                    <p className="mt-6 text-xs text-gray-500 border-t border-gray-100 pt-4">
                        For questions about our expansion, please contact our support team.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default GeoBlockModal;
