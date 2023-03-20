import { Card } from "@/components";
import Image from "next/image";

export default function Collection() {
  return (
    <div className="w-full min-h-screen pl-0">
      <div className="grid grid-cols-3 gap-6">
        {Array.from(Array(30).keys()).map((i) => {
          return (
            <Card
              key={i}
              className="aspect-square relative cursor-pointer overflow-hidden hover:bottom-1 hover:transition-all"
            >
              <Image
                src="https://thumbor.forbes.com/thumbor/fit-in/900x510/https://www.forbes.com/advisor/in/wp-content/uploads/2022/03/monkey-g412399084_1280.jpg"
                alt="nft"
                fill
                className="object-cover object-center rounded-lg hover:scale-105 hover:transition-all"
              />
            </Card>
          );
        })}
      </div>
    </div>
  );
}
