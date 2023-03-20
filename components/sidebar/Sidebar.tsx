import { Avatar, Card, SidebarLink } from "@/components";

const links = [
  { id: "1", label: "Collection", icon: "Image", link: "/collection" },
  {
    id: "2",
    label: "Votes",
    icon: "Send",
    link: "/votes",
  },
  { id: "3", label: "Profile", icon: "User", link: "/profile" },
  {
    id: "4",
    label: "Settings",
    icon: "Settings",
    link: "/settings",
  },
];

export function Sidebar() {
  return (
    <div className="w-sidebar-width h-[90vh] fixed t-0 l-0 pb-[2vh] pr-8 box-border overflow-x-hidden ">
      <Card className="h-full box-border">
        <div className="h-full flex flex-col justify-center p-2 pt-0">
          <div className="pt-6">
            <Avatar />
          </div>
          <div className="h-[20vh]"></div>

          {links.map(({ id, ...link }) => (
            <SidebarLink key={id} link={link} />
          ))}
        </div>
      </Card>
    </div>
  );
}
