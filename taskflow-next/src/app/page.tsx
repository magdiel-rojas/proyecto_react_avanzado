'use client'
import { Layout } from "@/shared/components/Layout";
import Tabs from "@/shared/components/Tabs";
import Link from "next/link";
import { useState } from "react";
import Loading from "./tasks/loading";
import { useRouter } from "next/navigation";
import { AppProviders } from "@/contexts/AppProviders";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push("/tasks");
    }, 1000);
  };

  return (
    <AppProviders>
      <Layout>
        <Tabs defaultTab=''>
          <Tabs.List>
            <Tabs.Tab id="tasks">Panel de Tareas</Tabs.Tab>
            <Tabs.Tab id="projects">Panel de Proyectos</Tabs.Tab>
          </Tabs.List>
          <Tabs.Panels>
            <Tabs.Panel id='tasks'>
              {loading ? (<Loading />) : (
                <Link href="/tasks"
                  className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                  onClick={onClick}
                >
                  Ver tareas →
                </Link>)}
            </Tabs.Panel>
            <Tabs.Panel id="projects">
              {loading ? (<Loading />) : (
              <p style={{ color: "#94a3b8", padding: "32px", textAlign: "center" }}>
                Próximamente: Módulo de Proyectos
              </p>)}
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </Layout>
    </AppProviders>
  );
}
