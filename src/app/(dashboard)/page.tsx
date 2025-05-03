import { db } from "@/lib/db";

export default async function Chat() {
  const result = await db.execute("select 1");
  console.log(result);
  return <div>test</div>;
}
