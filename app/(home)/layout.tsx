import { Sidebar } from "@/components";

interface IProps extends React.PropsWithChildren {}

export default function HomeLayout({ children }: IProps) {
  return (
    <div className="bg-zinc-100">
      <div className="min-h-screen mx-auto pt-[8vh]">
        <div>
          <Sidebar />
        </div>

        <div className="ml-[var(--sidebar-width)]">{children}</div>
      </div>
    </div>
  );
}
