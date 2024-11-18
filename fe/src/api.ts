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
  const res = await fetch("http://localhost:8080/dashboard", {
    method: "GET",
    headers: {
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImFkbWluIiwic3ViIjoiNjczYjFkNDgwY2FkYWIyMWRjZTIxOGZjIiwiaWF0IjoxNzMxOTMxMTczLCJleHAiOjE3MzE5MzcxNzN9.43FG13zSQgeRvXRORKuq0CMZ1wK54hIjqmbM9BYLAt4",
    },
  });
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
