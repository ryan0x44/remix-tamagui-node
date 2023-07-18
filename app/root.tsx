import { cssBundleHref } from "@remix-run/css-bundle";
import type { LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";
import { TamaguiProvider } from "@tamagui/web";
import tamaguiConfig from "../tamagui.config";

export const links: LinksFunction = () => [
  ...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
];

export default function App() {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <Meta />
        <Links />
        <style
            dangerouslySetInnerHTML={{
              __html: tamaguiConfig.getCSS({
                // if you are using "outputCSS" option, you should use this "exclude"
                // if not, then you can leave the option out
                exclude: process.env.NODE_ENV === 'production' ? 'design-system' : null,
              }),
            }}
          />
      </head>
      <body>
        <TamaguiProvider config={tamaguiConfig} disableInjectCSS={true}>
          <Outlet />
        </TamaguiProvider>
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}
