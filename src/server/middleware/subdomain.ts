export default defineEventHandler(({ req, res, context }) => {
  const hostname = req.headers.host || "spaze-mu.vercel.app";

  const mainDomain = ["localhost:3000", "spaze-mu.vercel.app"];

  if (!mainDomain.includes(hostname)) {
    const currentHost =
      process.env.NODE_ENV === "production" && process.env.VERCEL === "1"
        ? hostname.replace(`.spaze-mu.vercel.app`, "")
        : hostname.replace(`.localhost:3000`, "");

    context.subdomain = currentHost;
  }
});
