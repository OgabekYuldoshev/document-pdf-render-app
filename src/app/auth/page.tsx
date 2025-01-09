import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import React from "react";
import SignIn from "./sign-in";

export default async function Page() {
	return (
		<main className="flex w-full min-h-screen flex-col justify-center items-center">
			<Card className="max-w-[380px] w-full">
				<CardHeader>
					<CardTitle>Sign in</CardTitle>
					<CardDescription>Sign in to your account</CardDescription>
				</CardHeader>
				<CardContent>
					<SignIn />
				</CardContent>
			</Card>
		</main>
	);
}
