import React from "react";

export default function error({
	title,
	message,
}: { title: string; message: string }) {
	return (
		<div className="w-full h-80 flex items-center justify-center flex-col">
			<h1 className="text-xl font-bold">{title}</h1>
			<pre className="text-red-500">{message}</pre>
		</div>
	);
}
