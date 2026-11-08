import { useEffect, useState } from "react";
import { modules } from "./content";
import { Home } from "./components/Home";
import { Quiz } from "./components/Quiz";
import { ModuleView } from "./components/ModuleView";
import { Results } from "./components/Results";
import { Settings } from "./components/Settings";
import { Sidebar } from "./components/Sidebar";

function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);
  useEffect(() => {
    const on = () => {
      setHash(window.location.hash);
      window.scrollTo(0, 0);
    };
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return hash.replace(/^#\/?/, "");
}

export function App() {
  const route = useHash();
  const parts = route.split("/");

  let page;
  if (parts[0] === "quiz" && (parts[1] === "pre" || parts[1] === "post")) page = <Quiz key={parts[1]} mode={parts[1]} />;
  else if (parts[0] === "m") {
    const m = modules.find((x) => x.id === parts[1]);
    page = m ? <ModuleView key={m.id} module={m} /> : <Home />;
  } else if (parts[0] === "results") page = <Results />;
  else if (parts[0] === "settings") page = <Settings />;
  else page = <Home />;

  return (
    <div className="shell">
      <Sidebar route={route} />
      <main className="main">{page}</main>
    </div>
  );
}
