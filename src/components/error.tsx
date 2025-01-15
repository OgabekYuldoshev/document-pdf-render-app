import React from "react";

export default function ShowError({
	title,
	message,
}: { title: string; message: string }) {
	return (
		<div className="w-full h-80 flex items-center justify-center flex-col flex-1">
			<h1 className="font-bold">{title}</h1>
			<pre className="text-red-500 text-sm">{message}</pre>
		</div>
	);
}
