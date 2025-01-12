"use client";
import { BaseEditor } from "@/components/editor";
import { json, jsonParseLinter } from "@codemirror/lang-json";
import { linter } from "@codemirror/lint";
import React from "react";

export default function JsonData() {
	return (
		<>
			<BaseEditor
				style={{
					height: "100%",
				}}
				height="100%"
				extensions={[json(), linter(jsonParseLinter())]}
				value={"{}"}
				onChange={(content) => {
					try {
						JSON.parse(content);
						console.log("json");
					} catch (error) {
						console.log(error);
					}
				}}
			/>
			<span className="absolute bottom-1 right-6 text-xs text-foreground/50">
				JSON
			</span>
		</>
	);
}
