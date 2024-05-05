import { PropsWithChildren } from "react";
import { Link } from "expo-router";

type AppLinkButtonProps = {
    href: string;
}

export default function AppLinkButton({href, children}: PropsWithChildren<AppLinkButtonProps>) {
    return (
        <Link className="text-lg text-gray-400 p-4 border-solid border border-gray-400" href={href}>{children}</Link>
    )
}