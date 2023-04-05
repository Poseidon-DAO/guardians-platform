"use client";

interface IProps extends React.PropsWithChildren {
  title?: string;
}

export function Tooltip({ children, title }: IProps) {
  return (
    <div className="group relative inline-block border-red border-2">
      {children}

      {title && (
        <span className="invisible group-hover:visible bg-background/90 text-white px-5 py-2 mt-2 rounded-lg absolute top-full left-2/4">
          {title}
        </span>
      )}
    </div>
  );
}
