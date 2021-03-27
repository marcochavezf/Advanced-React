import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);
      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      // if there are itmes and there aren't enough to satisfy how many were requested and we are on the last page then just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // we don't have any items, we must go to the network to fetch them
        return false;
      }
      // if there are items, just return from the cache, and we don't need to go the network
      if (items.length) {
        console.log(
          `There are ${items.length} items in the cache! Gonna send them to apollo`
        );
        return items;
      }

      return false; // fallback to network

      // First thing it does is asks the read function for those items
      // we can either do one of two things:
      // First think we can is return the items because they are already in the cache
      // The other think we can is to return a false from here, (network request)
    },
    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // this runs when the Apollo Client comes back from the network with out product
      console.log(`Merging items from the network ${incoming.length}`);
      console.log(incoming);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // finally we return the merged items from the cache
      return merged;
    },
  };
}
