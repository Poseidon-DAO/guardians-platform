import { Header } from "@/components";
import "@/styles/globals.css";
import { ReactNode } from "react";

import { Providers } from "./providers";

export const metadata = {
  title: "Guardians",
  description: "Welcome Guardian.",
};

interface IProps extends React.PropsWithChildren {
  modal: ReactNode;
}

export default function RootLayout({ children, modal }: IProps) {
  return (
    <html lang="en">
      <body className="bg-zinc-100">
        <Providers>
          <Header />
          <div className="min-h-[92vh] pt-[8vh]">{children}</div>
          {modal}
        </Providers>
      </body>
    </html>
  );
}
