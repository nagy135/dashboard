export const getAllDashboards = async (): Promise<
  {
    _id: string;
    items: {
      _id: string;
      color: string;
      positions: [number, number][];
    };
  }[]
> => {
  const res = await fetch("http://localhost:8080/dashboard");
  return await res.json();
};

export const updateDashboardItem = async ({
  dashboardId,
  itemId,
  positions,
}: {
  dashboardId: string;
  itemId: string;
  positions: [number, number][];
}) => {
  const res = await fetch(
    `http://localhost:8080/dashboard/${dashboardId}/item/${itemId}/positions`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ positions }),
    },
  );
  if (!res.ok) {
    throw new Error("Failed to update dashboard item");
  }
};
