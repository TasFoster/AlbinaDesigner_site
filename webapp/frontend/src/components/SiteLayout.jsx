import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import LeadForm from "./LeadForm";
import { ProfileProvider } from "../context/ProfileContext";
import { BookingProvider } from "../context/BookingContext";

export default function SiteLayout() {
  return (
    <ProfileProvider>
      <BookingProvider>
        <Header />
        <main>
          <Outlet />
        </main>
        <LeadForm />
        <Footer />
      </BookingProvider>
    </ProfileProvider>
  );
}
