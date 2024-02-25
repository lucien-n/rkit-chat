import { toast } from 'svelte-sonner';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const onFormFailure = ({ detail }: any) => {
	toast.error(detail.data?.form.message);
};
