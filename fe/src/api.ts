export const getAllDashboards = async (): Promise<
  {
    _id: string;
    color: string;
    positions: [number, number][];
  }[]
> => {
  const res = await fetch("http://localhost:8080/dashboard");
  return await res.json();
};