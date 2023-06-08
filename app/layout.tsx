import "@/styles/globals.css";

import { type ReactNode } from "react";
import { Header } from "@/components";
import { getUserSettings } from "@/lib/server";

import { Providers } from "./providers";

export const metadata = {
  title: "Guardians",
  description: "Welcome Guardian.",
};

interface IProps extends React.PropsWithChildren {
  modal: ReactNode;
}

export default async function RootLayout({ children, modal }: IProps) {
  const { theme } = await getUserSettings();

  return (
    <html lang="en" className={theme === "dark" ? "dark" : ""}>
      <body className="bg-line">
        <Providers>
          <Header theme={theme} />
          <div className="min-h-[100vh] pt-[8vh]">{children}</div>
          {modal}
        </Providers>
      </body>
    </html>
  );
}
