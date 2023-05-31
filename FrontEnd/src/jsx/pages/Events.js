import React from "react";

import PageTitle from "../layouts/PageTitle";
import EventCalendar from "../components/AppsMenu/Calendar/EventCalendar";

const Calendar = () => {
  return (
    <div className="h-80">
      <PageTitle activeMenu="Calendrier" motherMenu="Evénements Zonal 2023" />
      <EventCalendar />
    </div>
  );
};

export default Calendar;
