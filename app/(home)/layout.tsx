interface IProps extends React.PropsWithChildren {}

export default function HomeLayout({ children }: IProps) {
  return <div>{children}</div>;
}
