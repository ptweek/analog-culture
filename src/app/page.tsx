import { api, HydrateClient } from "~/trpc/server";
import ClientHomePage from "./client-page";

export default async function HomePage() {
  return (
    <HydrateClient>
      <main className="flex min-h-screen flex-col items-center justify-center gap-12">
        <ClientHomePage />
      </main>
    </HydrateClient>
  );
}
