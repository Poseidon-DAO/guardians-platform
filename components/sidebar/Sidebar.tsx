import { Avatar, SidebarLink } from "@/components";

const links = [
  {
    id: "1",
    label: "Collection",
    icon: "Image",
    link: "/collection",
    disabled: false,
  },
  {
    id: "2",
    label: "Votes",
    icon: "Send",
    link: "/votes",
    disabled: true,
  },
  { id: "3", label: "Profile", icon: "User", link: "/profile", disabled: true },
  {
    id: "4",
    label: "Settings",
    icon: "Settings",
    link: "/settings",
    disabled: true,
  },
];

export default function Sidebar() {
  return (
    <div className="w-sidebar-width h-[92vh] fixed box-border overflow-x-hidden">
      <div className="h-full flex flex-col justify-center p-8 border-r-[0.5px] border-gray-400">
        <div className="pt-6">
          <Avatar />
        </div>
        <div className="h-[20vh]"></div>

        {links.map(({ id, ...link }) => (
          <SidebarLink key={id} link={link} />
        ))}
      </div>
    </div>
  );
}
