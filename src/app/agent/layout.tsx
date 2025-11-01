/**
 * Layout para las páginas de agentes
 * Sin el Sidebar principal para maximizar el espacio del editor
 */
export default function AgentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}

