import { QueryClient } from "@tanstack/react-query";
import { createSyncStoragePersister } from "@tanstack/query-sync-storage-persister";

export const apiQueryClient = new QueryClient({
  defaultOptions: {
    queries: {
      gcTime: 1000 * 60 * 60 * 24, // 24 hours
    },
  },
});

export const apiPersister = createSyncStoragePersister({
  storage: window.localStorage,
});

export const apiPersisterOptions = {
  persister: apiPersister,
};

// type Post = {
//   id: number
//   title: string
//   body: string
// }

// function usePosts() {
//   return useQuery({
//     queryKey: ['posts'],
//     queryFn: async (): Promise<Array<Post>> => {
//       const response = await fetch('https://jsonplaceholder.typicode.com/posts')
//       return await response.json()
//     },
//   })
// }
