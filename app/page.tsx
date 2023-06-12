import Image from "next/image";
import { cookies } from "next/headers";
import { Text, ConnectButton } from "@/components";
import { getUserSettings } from "@/lib/server";

import hero from "../public/hero.png";

export default async function Index() {
  const userSettings = await getUserSettings();
  const isConnected = !!cookies().get("userId")?.value;

  return (
    <div className="w-full h-screen relative bg-background mt-[-8vh]">
      <div className="container mx-auto h-full flex justify-between items-center">
        <div className="w-2/5 text-white">
          <div className="my-4">
            <Text intent="h2">Enter Guardians Portal</Text>
          </div>

          <div className="my-4">
            <Text intent="text" size="large">
              If you are a Guardian, connect your wallet to enter the Guardians
              Portal. The Portal is the Guardians’ hall where you will be able
              to see your Guardian stats and contribute to the Founder
              Collection management.
            </Text>
          </div>

          <div className="my-6">
            <ConnectButton
              theme={userSettings?.theme}
              hasUserSession={isConnected}
            />
          </div>
        </div>
      </div>

      <div className="absolute w-2/4 h-full top-0 right-0 z-1">
        <Image
          src={hero.src}
          fill
          alt="hero"
          priority
          quality={90}
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
