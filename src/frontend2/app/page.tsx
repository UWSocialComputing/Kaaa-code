import { createClient } from "@/utils/supabase/server";
import Header from "@/components/Header";
import { redirect } from "next/navigation";

/**
 * Default app homescreen. Displayed when user is not logged in
 */
export default async function Index() {
    // This function is just for the interactive tutorial.
    // Feel free to remove it once you have Supabase connected.
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/dashboard");
  }

  return (
    <div className="flex-1 w-full flex flex-col gap-20 items-center">

      <div className="animate-in hero flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3 h-screen justify-center">
        <Header/>
      </div>

      <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs flex-row space-x-4">
          <a href="#">Blog</a>
          <a href="#">Github</a>
      </footer>
    </div>
  );
}
