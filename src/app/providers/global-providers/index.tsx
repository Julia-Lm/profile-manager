import { ContextProvider } from "app/providers/global-providers/context-provider.tsx";
import { ReactNode } from "react";
import { ErrorBoundaryComponent } from "app/providers/global-providers/error-boundary.tsx";
import { GlobalQueryClientProvider } from "app/providers/global-providers/query-client-provider.tsx";

export const WrapperProviders = ({ children }: { children?: ReactNode }) => {
  return (
    <ContextProvider>
      <GlobalQueryClientProvider>
        <ErrorBoundaryComponent>{children}</ErrorBoundaryComponent>
      </GlobalQueryClientProvider>
    </ContextProvider>
  );
};
