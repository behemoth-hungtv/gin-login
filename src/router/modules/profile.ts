import { $t } from "@/plugins/i18n";
import { profile } from "@/router/enums";

export default {
  path: "/profile",
  redirect: "/profile/index",
  meta: {
    icon: "ri:file-info-line",
    title: $t("menus.pureAbout"),
    rank: profile
  },
  children: [
    {
      path: "/profile/index",
      name: "Profile",
      component: () => import("@/views/profile/index.vue"),
      meta: {
        title: $t("menus.pureProfile")
      }
    }
  ]
} satisfies RouteConfigsTable;
