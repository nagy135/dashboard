import { cookies } from "next/headers";
import Grid from "../_components/grid";
import { redirect } from "next/navigation";

export default async function Home() {
  const cookiesStore = await cookies();
  const accessToken = cookiesStore.get("access_token")?.value;
  if (!accessToken) redirect("/");

  return <Grid accessToken={cookiesStore.get("access_token")?.value ?? ""} />;
}
