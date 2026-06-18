import { createClient } from "tinacms/dist/client";
import { queries } from "./types.js";
export const client = createClient({ cacheDir: 'C:/Users/Mayur/Desktop/demo/tina/__generated__/.cache/1781797785912', url: 'http://localhost:4001/graphql', token: '', queries,  });
export default client;
  