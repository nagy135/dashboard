export const getAllDashboards = async (
  accessToken: string,
): Promise<
  {
    _id: string;
    items: {
      _id: string;
      color: string;
      positions: [number, number][];
    };
  }[]
> => {
  const res = await fetch("http://localhost:8080/dashboard", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch dashboards");
  }
  return await res.json();
};

export const updateDashboardItem = async ({
  dashboardId,
  itemId,
  positions,
  accessToken,
}: {
  dashboardId: string;
  itemId: string;
  positions: [number, number][];
  accessToken: string;
}) => {
  const res = await fetch(
    `http://localhost:8080/dashboard/${dashboardId}/item/${itemId}/positions`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ positions }),
    },
  );
  if (!res.ok) {
    throw new Error("Failed to update dashboard item");
  }
};
