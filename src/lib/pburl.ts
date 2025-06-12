const PBURL = import.meta.env.VITE_PB_URL;
if (!PBURL) {
  throw new Error("PB_URL environment variable is not set");
}

export default PBURL;
