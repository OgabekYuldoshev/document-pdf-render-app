import error from "@/components/error";
import React from "react";
import { $singleTemplate } from "./action";
import HTMLEditor from "./components/HTMLEditor";
import JSONEditor from "./components/JSONEditor";
import Visualizer from "./components/Visualizer";

import Providers from "./providers";

import {
	ResizableHandle,
	ResizablePanel,
	ResizablePanelGroup,
} from "@/components/ui/resizable";

interface Props {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
	const { id } = await params;
	const result = await $singleTemplate(id);

	if (!result.success) {
		return error({ title: "Internal Error", message: result.error });
	}
	const { template, content } = result.data;

	return (
		<Providers template={template} content={content}>
			<div className="p-6 flex-1 flex flex-col">
				<div className="w-full mb-4">
					<div className="flex flex-col">
						<h2 className="text-lg font-bold">{result.data.template.title}</h2>
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
							<ResizablePanel
								minSize={30}
								defaultSize={30}
								className="relative"
							>
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
		</Providers>
	);
}
