import { createContext, useContext, useState } from "react";

const BookingContext = createContext(null);

export function BookingProvider({ children }) {
  const [selectedService, setSelectedService] = useState("");

  function requestBooking(slug = "") {
    setSelectedService(slug);
    document.getElementById("lead-form")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <BookingContext.Provider value={{ selectedService, requestBooking }}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
