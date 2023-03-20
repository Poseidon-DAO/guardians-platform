import { Sidebar } from "@/components";

interface IProps extends React.PropsWithChildren {}

export default function HomeLayout({ children }: IProps) {
  return (
    <div className="bg-gray-300">
      <div className="min-h-screen container mx-auto pt-[10vh] pb-[2vh]">
        <div>
          <Sidebar />
        </div>

        <div className="ml-[length:var(--sidebar-width)]">{children}</div>
      </div>
    </div>
  );
}
