const PBURL = import.meta.env.PB_URL;
if (!PBURL) {
  throw new Error("PB_URL environment variable is not set");
}

export default PBURL;
