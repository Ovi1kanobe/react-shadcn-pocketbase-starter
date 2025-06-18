interface PageContainerProps {
  children: React.ReactNode;
}

function PageContainer({ children }: PageContainerProps) {
  return <div className="flex flex-col h-full w-full space-y-2 max-w-2xl">{children}</div>;
}

export default PageContainer;
