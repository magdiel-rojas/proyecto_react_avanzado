// Client Component: contiene 'use client' porque usa hooks y contexto de React.
'use client'
import { createContext, useContext, useState, type ReactNode } from "react";

interface TabsContextType {
    activeTab: string;
    setActiveTab: (tab: string) => void;
}

const TabsContext = createContext<TabsContextType | null>(null);

function useTabsContext(): TabsContextType {
    const context = useContext(TabsContext);
    if (!context) throw new Error("Tabs compound components must be used inside <Tabs>");
    return context;
}

interface TabsProps {
    defaultTab: string;
    children: ReactNode;
}

function Tabs({ defaultTab, children }: TabsProps) {
    const [activeTab, setActiveTab] = useState(defaultTab);
    return (
        <TabsContext.Provider value={{ activeTab, setActiveTab }}>
            {children}
        </TabsContext.Provider>
    );
}

function TabList({ children }: { children: ReactNode }) {
    return <div style={{ display: "flex", borderBottom: '2px solid #e2e8f0', marginBottom: "16px" }}>{children}</div>;
}

interface TabProps {
    id: string;
    children: ReactNode;
    disabled?: boolean;
}

function Tab({ id, children }: TabProps) {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === id;
    return (
        <button
            onClick={() => setActiveTab(id)}
            style={{
                padding: '12px 24px',
                border: 'none',
                borderBottom: isActive ? '2px solid #3b82f6' : '2px solid transparent',
                backgroundColor: 'transparent',
                color: isActive ? '#3b82f6' : '#64748b',
                fontWeight: isActive ? '600' : '400',
                cursor: 'pointer',
                fontSize: '14px',
                marginBottom: '-2px'
            }}
        >
            {children}
        </button>
    );
}

function TabPanels({ children }: { children: ReactNode }) {
    return <div>{children}</div>;
}

interface TabPanelProps {
    id: string;
    children: ReactNode;
}

function TabPanel({ id, children }: TabPanelProps) {
    const { activeTab } = useTabsContext();
    return activeTab === id ? <div>{children}</div> : null;
}


Tabs.List = TabList;
Tabs.Tab = Tab;
Tabs.Panels = TabPanels;
Tabs.Panel = TabPanel;

export default Tabs;