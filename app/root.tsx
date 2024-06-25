import {Links, Meta, Outlet, Scripts, ScrollRestoration,} from "@remix-run/react";
import {LinksFunction} from "@remix-run/node";
import styles from "./tailwind.css?url";

export const links: LinksFunction = () => [
    {rel: "stylesheet", href: styles},
];

export default function App() {
    return (
        <html lang="en">
        <head>
            <title>AMPEL-CDSS</title>
            <Links/>
            <Meta/>
        </head>
        <body>
            <Outlet/>
            <ScrollRestoration/>
            <Scripts/>
        </body>
        </html>
    );
}