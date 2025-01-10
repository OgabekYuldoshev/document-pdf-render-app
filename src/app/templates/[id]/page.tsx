import error from "@/components/error";
import React from "react";
import { $singleTemplate } from "./action";
import Editor from "./components/Editor";
import Rendered from "./components/Rendered";
import Providers from "./providers";

interface Props {
	params: Promise<{ id: string }>;
}
export default async function Page({ params }: Props) {
	const { id } = await params;
	const result = await $singleTemplate(id);

	if (!result.success) {
		return error({ title: "Internal Error", message: result.error });
	}

	return (
		<Providers template={result.data.template} content={result.data.content}>
			<div className="p-6">
				<div className="grid gap-2 relative grid-cols-3">
					<div className="col-span-2 overflow-hidden">
						<Editor />
					</div>
					<div className="col-span-1 sticky top-0">
						<Rendered />
					</div>
				</div>
			</div>
		</Providers>
	);
}
