import "./globals.css";

import Header from "@/components/header";
import { Toaster } from "@/components/ui/sonner";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import RootProvider from "./provider";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "GenDoc",
	description: "Generate PDF document for your business.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased dark flex flex-col h-full min-h-screen`}
			>
				<RootProvider>
					<Header />
					{children}
					<Toaster richColors />
				</RootProvider>
				<NextTopLoader showSpinner={false} />
			</body>
		</html>
	);
}
