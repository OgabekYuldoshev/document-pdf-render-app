"use client";

import React from "react";
import { useSnapshot } from "valtio";
import { state } from "../state";

export default function Visualizer() {
	const snap = useSnapshot(state);

	return (
		<iframe
			className="w-full h-full bg-white"
			title="Template"
			srcDoc={snap.renderedContent}
			frameBorder="0"
		/>
	);
}
