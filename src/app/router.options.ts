import type { RouterOptions } from "@nuxt/schema";
import { useSubdomain } from "@/composables/subdomain";

// https://router.vuejs.org/api/interfaces/routeroptions.html
export default <RouterOptions>{
  routes: (_routes) => {
    const { ssrContext } = useNuxtApp();
    const subdomain = useSubdomain();
    if (ssrContext?.event.context.subdomain)
      subdomain.value = ssrContext?.event.context.subdomain;

    if (subdomain.value) {
      const userRoute = _routes.filter((i) =>
        i.path.includes("/_site/:siteId")
      );
      const userRouteMapped = userRoute.map((i) => ({
        ...i,
        path:
          i.path === "/_site/:siteId"
            ? i.path.replace("/_site/:siteId", "/")
            : i.path.replace("/_site/:siteId/", "/"),
      }));

      return userRouteMapped;
    }
  },
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition;
    if (to.hash) {
      const el = document.querySelector(to.hash) as HTMLElement;
      return { left: 0, top: (el?.offsetTop ?? 0) - 30, behavior: "smooth" };
    }

    if (to.fullPath === from.fullPath) return;
    return { left: 0, top: 0, behavior: "smooth" };
  },
};
