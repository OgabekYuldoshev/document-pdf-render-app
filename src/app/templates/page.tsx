import error from "@/components/error";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import dayjs from "dayjs";
import { File, FileText } from "lucide-react";
import Link from "next/link";
import React from "react";
import { $listTemplates } from "./actions";
import CreateTemplateDialog from "./create-template-dialog";
export default async function Page() {
	const result = await $listTemplates();
	if (!result.success) {
		console.error(result);
		return error({ title: "Internal Error", message: result.error });
	}

	const items = result.data;

	return (
		<div className="w-full p-6 h-full">
			<div className="w-full flex justify-between items-center">
				<h1 className="text-2xl font-bold">Templates</h1>
				<CreateTemplateDialog>
					<Button>Create template</Button>
				</CreateTemplateDialog>
			</div>
			<ul className="w-full grid grid-cols-5 gap-4">
				{items.map((item) => (
					<Link
						href={`/templates/${item.id}`}
						title={item.title}
						key={item.id}
						className="p-6 rounded-lg bg-secondary cursor-pointer relative"
					>
						<FileText size={32} />
						<div className="grid mt-2">
							<h2 className="line-clamp-1 font-bold">{item.title}</h2>
							<p className="text-sm text-muted-foreground">
								{dayjs(item.createdAt).format("DD.MM.YYYY HH:mm")}
							</p>
						</div>
						<Badge
							className={cn(
								item.published && "bg-green-400",
								"absolute top-6 right-6 ",
							)}
						>
							{item.published ? "published" : "draft"}
						</Badge>
					</Link>
				))}
			</ul>
		</div>
	);
}
