export const createQueryString = (
  searchParams:
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
    | undefined,
  newParam: {
    name: string;
    value: string;
  }
) => {
  const { name, value } = newParam;
  const params = new URLSearchParams(searchParams);

  params.set(name, value);

  return params.toString();
};
