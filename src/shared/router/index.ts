import {AppRouterInstance} from 'next/dist/shared/lib/app-router-context.shared-runtime';
import {useRouter} from 'next/navigation';
import {useEffect} from 'react';

export let appRouter: AppRouterInstance;

export const useSaveAppRouter = () => {
    const router = useRouter();

    useEffect(() => {
        appRouter = router;
    }, [router]);
};
