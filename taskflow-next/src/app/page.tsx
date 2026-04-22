// Client Component: contiene 'use client' porque utiliza hooks y navegación del lado del cliente.
'use client'
import { Layout } from "@/shared/components/Layout";
import { Tabs, Loading } from "@/shared/components";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { AppProviders } from "@/contexts/AppProviders";

export default function Home() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = (path: string) => (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      router.push(path);
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
                  onClick={onClick("/tasks")}
                >
                  Ver tareas →
                </Link>)}
            </Tabs.Panel>
            <Tabs.Panel id="projects">
              {loading ? (<Loading />) : (
                <Link href="/projects"
                  className="rounded-md bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
                  onClick={onClick("/projects")}
                >
                  Ver proyectos →
                </Link>)}
            </Tabs.Panel>
          </Tabs.Panels>
        </Tabs>
      </Layout>
    </AppProviders>
  );
}
