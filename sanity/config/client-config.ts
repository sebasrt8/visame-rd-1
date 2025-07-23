const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "",
  dataset: "production",
  apiVersion: "2023-03-09",
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_API_TOKEN || "",
};

export default config;
