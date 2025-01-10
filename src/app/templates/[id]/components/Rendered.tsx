"use client";

import React from "react";
import { EditorMachineContext } from "../machine";

export default function Rendered() {
	const state = EditorMachineContext.useSelector((state) => state.context);

	return (
		<div className="border rounded-lg bg-white h-[85vh] overflow-hidden">
			<iframe
				className="w-full h-full"
				title="Template"
				srcDoc={state.content}
				frameBorder="0"
			/>
		</div>
	);
}
