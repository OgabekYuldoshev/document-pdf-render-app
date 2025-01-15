"use client";

import React from "react";
import { $fetchTemplate } from "./action";
import HTMLEditor from "./components/HTMLEditor";
import JSONEditor from "./components/JSONEditor";
import Visualizer from "./components/Visualizer";

import ShowError from "@/components/error";
import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";
import { state } from "./state";

export default function Page() {
	const { id } = useParams<{ id: string }>();
	const { data, isError, error, isFetched } = useQuery({
		queryKey: ["template", { id }],
		queryFn: async () => {
			const result = await $fetchTemplate(id);
			if (!result.success) {
				throw result.error;
			}
			state.setContents(result.data);
			return result.data;
		},
		enabled: !!id,
		retry: false,
		refetchOnWindowFocus: false,
	});

	if (!isFetched) {
		return (
			<div className="p-6 flex-1 flex flex-col justify-center items-center">
				<Loader2 className="animate-spin" />
			</div>
		);
	}

	if (isError || !data) {
		return (
			<ShowError
				title="Internal Error"
				message={error?.message || "Template Not found"}
			/>
		);
	}

	return (
		<div className="p-6 flex-1 flex flex-col">
			<div className="w-full mb-4">
				<div className="flex flex-col">
					<h2 className="text-lg font-bold">{data.template.title}</h2>
				</div>
			</div>
			<ResizablePanelGroup
				direction="horizontal"
				className="border rounded flex-1"
			>
				<ResizablePanel>
					<ResizablePanelGroup direction="vertical">
						<ResizablePanel minSize={30} className="relative">
							<HTMLEditor />
						</ResizablePanel>
						<ResizableHandle withHandle />
						<ResizablePanel minSize={30} defaultSize={30} className="relative">
							<JSONEditor />
						</ResizablePanel>
					</ResizablePanelGroup>
				</ResizablePanel>
				<ResizableHandle withHandle />
				<ResizablePanel maxSize={45} minSize={35} defaultSize={45}>
					<Visualizer />
				</ResizablePanel>
			</ResizablePanelGroup>
		</div>
	);
}
