import { ReactNode } from 'react';

declare function Card({ title, children, href, }: {
    title: string;
    children: ReactNode;
    href: string;
}): JSX.Element;

export { Card };
