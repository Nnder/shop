import { QueryClient } from "@tanstack/react-query";
import { cache } from "react";

// One QueryClient per request on the server (via React cache),
// so prefetched data is isolated between requests and can be dehydrated.
const getQueryClient = cache(() => new QueryClient());

export default getQueryClient;
