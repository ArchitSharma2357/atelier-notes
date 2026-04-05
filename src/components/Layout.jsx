import { Outlet } from "react-router-dom";
import AnnouncementBar from "./AnnouncementBar";
import Header from "./Header";
import PageTracker from "./PageTracker";
import SiteFooter from "./SiteFooter";

export default function Layout() {
  return (
    <div className="min-h-screen">
      <PageTracker />
      <AnnouncementBar />
      <Header />
      <main>
        <Outlet />
      </main>
      <SiteFooter />
    </div>
  );
}

