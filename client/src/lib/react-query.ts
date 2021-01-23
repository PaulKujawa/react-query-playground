import { QueryClient } from "react-query";

const onError = (error: any) => {
  // TODO something
};

export const ReactQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      onError,
    },
    mutations: {
      onError,
    },
  },
});
