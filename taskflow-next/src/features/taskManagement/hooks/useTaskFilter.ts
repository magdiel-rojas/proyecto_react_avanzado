// Custom hook de tipo CLIENT: requiere 'use client' porque utiliza hooks de React (useState, useMemo).
'use client'
import { useState, useMemo } from "react";
import { Task } from "@/features/taskManagement/utils/mockData";

type FilterValue = "all" | Task["status"];

export function useTaskFilter(tasks: Task[]) {
  const [filter, setFilter] = useState<FilterValue>("all");
  const filteredTasks = useMemo(
    () => filter === "all" ? tasks : tasks.filter(t => t.status === filter),
    [tasks, filter]
  );
  return { filter, setFilter, filteredTasks };
}
