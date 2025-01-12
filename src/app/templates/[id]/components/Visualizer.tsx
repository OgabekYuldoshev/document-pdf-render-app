"use client";

import React from "react";
import { EditorMachineContext } from "../machine";

export default function Visualizer() {
	const state = EditorMachineContext.useSelector((state) => state.context);

	return (
		<iframe
			className="w-full h-full bg-white"
			title="Template"
			srcDoc={state.content}
			frameBorder="0"
		/>
	);
}
