"use client";

import { createContext, useContext, useState } from "react";

interface Toast {
    id: number;
    message: string;
    type: "success" | "error" | "info";
}

const ToastContext = createContext<any>(null);

export const ToastProvider = ({ children }: { children: React.ReactNode }) => {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = (message: string, type: Toast["type"] = "info") => {
        const id = Date.now();
        setToasts([...toasts, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-4 right-4 z-50 space-y-3">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`px-4 py-3 rounded-lg shadow-lg text-white text-sm font-medium animate-slide-in
              ${toast.type === "success" && "bg-green-600"}
              ${toast.type === "error" && "bg-red-600"}
              ${toast.type === "info" && "bg-blue-600"}
            `}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export const useToast = () => useContext(ToastContext);
