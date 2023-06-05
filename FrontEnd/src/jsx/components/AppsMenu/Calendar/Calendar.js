import React from "react";

import EventCalendar from "./EventCalendar";

import PageTitle from "../../../layouts/PageTitle";

const Calendar = () => {
  return (
    <div className="h-80">
      <PageTitle activeMenu="Calendrier" motherMenu="Evénements Zonal 2023" />
      <EventCalendar />
    </div>
  );
};

export default Calendar;
