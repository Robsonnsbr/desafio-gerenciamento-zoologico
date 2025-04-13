import type { Metadata } from "next";
import { raleway, poppins, openSans } from "@font/index";
import "./styles/globals.css";
import NavBar from "@components/NavBar";
import { Providers } from "./providers";

export const metadata: Metadata = {
  title: "Zoo Management",
  description: "Gerenciamento de Zoológico",

  keywords: ["words paragraphs for the research CEO"],
  icons: {
    icon: { url: "/favicon.png", sizes: "192x192", type: "image/png" },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children?: React.ReactNode;
}>) {
  ("");
  return (
    <html lang="pt-BR">
      <head>
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href={process.env.NEXT_PUBLIC_SITE_URL || "my_website.com.br"}
        />
      </head>
      <body
        suppressHydrationWarning={true}
        className={`${raleway.variable} ${poppins.variable} ${openSans.variable} font-sans`}
      >
        <NavBar />
        <Providers>
          <main className="container mx-auto p-4">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
