import {usePathname} from 'next/navigation';

const PAGES_WITH_DESKTOP_LAYOUT_RE = /^[/](offers[/]search|categories[/]\d+)?$/;

export const useIsDesktopLayoutEnabled = () => {
    const pathname = usePathname();

    return PAGES_WITH_DESKTOP_LAYOUT_RE.test(pathname);
};
