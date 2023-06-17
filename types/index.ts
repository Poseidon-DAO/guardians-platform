export interface CustomNextPage<
  T extends Record<string, string> = Record<string, string>,
  U extends Record<string, string | string[] | undefined> = Record<
    string,
    string | string[] | undefined
  >
> {
  params?: T;
  searchParams?: U;
}
