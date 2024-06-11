import React from "react";

export default function StatusLayout({
                                         children,
                                     }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="w-screen">
            <div className="max-w-screen-xl mx-auto">
                {children}
            </div>
        </div>
    );
}