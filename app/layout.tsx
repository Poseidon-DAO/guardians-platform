import { Header } from "@/components";
import "@/styles/globals.css";

import { Providers } from "./providers";

export const metadata = {
  title: "Guardians",
  description: "Welcome Guardian.",
};

interface IProps extends React.PropsWithChildren {}

export default function RootLayout({ children }: IProps) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <Header />

          {children}
        </Providers>
      </body>
    </html>
  );
}
