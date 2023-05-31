import React, { useContext } from "react";

/// React router dom
import { Switch, Route } from "react-router-dom";

/// Css
import "./index.css";
import "./chart.css";
import "./step.css";

/// Layout
import Nav from "./layouts/nav";
import Footer from "./layouts/Footer";
import ScrollToTop from "./layouts/ScrollToTop";

/// Dashboard
import Home from "./components/Dashboard/Home";

import Formations from "./components/Dashboard/Formations";
import Actions from "./components/Dashboard/Actions";
import Forum from "./components/Dashboard/Forum";
import Acceuil from "./components/Dashboard/Acceuil";
import StatistiqueLocaux from "./components/Dashboard/StatistiqueLocaux";

/// App
import AppProfile from "./components/AppsMenu/AppProfile/AppProfile";
import Compose from "./components/AppsMenu/Email/Compose/Compose";
import Inbox from "./components/AppsMenu/Email/Inbox/Inbox";
import Read from "./components/AppsMenu/Email/Read/Read";
import Calendar from "./components/AppsMenu/Calendar/Calendar";

/// Table
import SortingTable from "./components/table/SortingTable/SortingTable";
import FilteringTable from "./components/table/FilteringTable/FilteringTable";
import DataTable from "./components/table/DataTable";
import BootstrapTable from "./components/table/BootstrapTable";

/// Pages
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import ForgotPassword from "./pages/ForgotPassword";
import LockScreen from "./pages/LockScreen";
import { ThemeContext } from "../context/ThemeContext";
import MembresComponent from "./pages/Membres";
import Administrateurs from "./pages/Administrateurs";
import OlmFormations from "./pages/OlmFormations";
import OlmActions from "./pages/OlmActions";
import Events from "./pages/Events";
import OlmForums from "./pages/OlmForums";
import Error404 from "./pages/Error404";

const Markup = () => {
  const { menuToggle } = useContext(ThemeContext);

  const routes = [
    /// Dashboard
    { url: "", component: Home },
    { url: "Calendrier", component: Events },
    { url: "dashboard", component: Home },
    { url: "formations", component: Formations },
    { url: "actions", component: Actions },
    { url: "forum", component: Forum },
    { url: "acceuil", component: Acceuil },
    { url: "Statistiques", component: StatistiqueLocaux },
    { url: "FORMATIONS_OLM", component: OlmFormations },
    { url: "ACTIONS_OLM", component: OlmActions },
    { url: "FORUMS", component: OlmForums },

    /// Apps
    { url: "app-profile", component: AppProfile },
    { url: "email-compose", component: Compose },
    { url: "email-inbox", component: Inbox },
    { url: "email-read", component: Read },
    { url: "app-calender", component: Calendar },

    ///Redux
    { url: "administrateurs", component: Administrateurs },
    { url: "membres", component: MembresComponent },

    /// table
    { url: "table-filtering", component: FilteringTable },
    { url: "table-sorting", component: SortingTable },
    { url: "table-datatable-basic", component: DataTable },
    { url: "table-bootstrap-basic", component: BootstrapTable },

    /// pages
    { url: "page-register", component: Registration },
    { url: "page-login", component: Login },
    { url: "page-forgot-password", component: ForgotPassword },
  ];
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];

  let pagePath = path.split("-").includes("page");
  return (
    <>
      <div
        id={`${!pagePath ? "main-wrapper" : ""}`}
        className={`${!pagePath ? "show" : "mh100vh"}  ${
          menuToggle ? "menu-toggle" : ""
        }`}
      >
        {!pagePath && <Nav />}

        <div className={`${!pagePath ? "content-body" : ""}`}>
          <div
            className={`${!pagePath ? "container-fluid" : ""}`}
            style={{ minHeight: window.screen.height - 60 }}
          >
            <Switch>
              {routes.map((data, i) => (
                <Route
                  key={i}
                  exact
                  path={`/${data.url}`}
                  component={data.component}
                />
              ))}
              <Route component={Error404} />
            </Switch>
          </div>
        </div>
        {!pagePath && <Footer />}
      </div>
      <ScrollToTop />
    </>
  );
};

export default Markup;
