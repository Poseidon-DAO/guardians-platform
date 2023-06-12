import "@/styles/globals.css";

import { type ReactNode } from "react";
import { Header } from "@/components";
import { getUserSettings } from "@/lib/server";

import { Providers } from "./providers";
import { cookies } from "next/headers";

export const metadata = {
  title: "Guardians",
  description: "Welcome Guardian.",
};

interface IProps extends React.PropsWithChildren {
  modal: ReactNode;
}

export default async function RootLayout({ children, modal }: IProps) {
  const userSettings = await getUserSettings();
  const isConnected = !!cookies().get("userId")?.value;

  return (
    <html lang="en" className={userSettings?.theme === "dark" ? "dark" : ""}>
      <body className="bg-line dark:bg-background">
        <Providers>
          <Header theme={userSettings?.theme} isConnected={isConnected} />
          <div className="min-h-[100vh] pt-[8vh]">{children}</div>
          {/* {modal} */}
        </Providers>
      </body>
    </html>
  );
}
