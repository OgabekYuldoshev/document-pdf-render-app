import { $session } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";

export const useSession = () => {
	return useQuery({
		queryKey: ["session"],
		async queryFn() {
			const result = await $session();
			if (!result.success) {
				throw result.error;
			}
			return result.data;
		},
	});
};
