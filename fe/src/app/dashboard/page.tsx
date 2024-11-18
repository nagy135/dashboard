import { cookies } from "next/headers";
import Grid from "../_components/grid";

export default async function Home() {
  const cookiesStore = await cookies();
  return <Grid accessToken={cookiesStore.get("access_token")?.value ?? ""} />;
}
