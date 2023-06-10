/// Menu
import Metismenu from "metismenujs";
import React, { Component, useContext, useEffect } from "react";
/// Scroll
import PerfectScrollbar from "react-perfect-scrollbar";
/// Link
import { Link } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
import { ThemeContext } from "../../../context/ThemeContext";
import LogoutPage from "./Logout";

/// Image
import profile from "../../../images/ProfilePicture.jpg";
import { useSelector } from "react-redux";

class MM extends Component {
  componentDidMount() {
    this.$el = this.el;
    this.mm = new Metismenu(this.$el);
  }
  componentWillUnmount() {}
  render() {
    return (
      <div className="mm-wrapper">
        <ul className="metismenu" ref={(el) => (this.el = el)}>
          {this.props.children}
        </ul>
      </div>
    );
  }
}

const SideBar = () => {
  const user = useSelector((state) => state.auth.auth.user);

  const { iconHover, sidebarposition, headerposition, sidebarLayout } =
    useContext(ThemeContext);

  useEffect(() => {
    var btn = document.querySelector(".nav-control");
    var aaa = document.querySelector("#main-wrapper");
    function toggleFunc() {
      return aaa.classList.toggle("menu-toggle");
    }
    btn.addEventListener("click", toggleFunc);
  }, []);
  /// Path
  let path = window.location.pathname;
  path = path.split("/");
  path = path[path.length - 1];
  /// Active menu
  let deshBoard = [
      "",
      "dashboard-dark",
      "wallet",
      "invoices-list",
      "create-invoices",
      "card-center",
      "transaction-details",
      "task",
    ],
    app = [
      "app-profile",
      "post-details",
      "app-calender",
      "email-compose",
      "email-inbox",
      "email-read",
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "post-details",
      "ecom-product-detail",
    ],
    email = ["email-compose", "email-inbox", "email-read"],
    shop = [
      "ecom-product-grid",
      "ecom-product-list",
      "ecom-product-list",
      "ecom-product-order",
      "ecom-checkout",
      "ecom-invoice",
      "ecom-customers",
      "ecom-product-detail",
    ],
    charts = [
      "chart-rechart",
      "chart-flot",
      "chart-chartjs",
      "chart-chartist",
      "chart-sparkline",
      "chart-apexchart",
    ],
    bootstrap = [
      "ui-accordion",
      "ui-badge",
      "ui-alert",
      "ui-button",
      "ui-modal",
      "ui-button-group",
      "ui-list-group",
      "ui-card",
      "ui-carousel",
      "ui-dropdown",
      "ui-popover",
      "ui-progressbar",
      "ui-tab",
      "ui-typography",
      "ui-pagination",
      "ui-grid",
    ],
    plugins = [
      "uc-select2",

      "uc-sweetalert",
      "uc-toastr",
      "uc-noui-slider",
      "map-jqvmap",
      "uc-lightgallery",
    ],
    redux = ["redux-form", "redux-wizard", "todo"],
    widget = ["widget-basic"],
    forms = [
      "form-element",
      "form-wizard",
      "form-editor-summernote",
      // "form-pickers",
      "form-validation-jquery",
    ],
    table = ["table-bootstrap-basic", "table-datatable-basic"],
    pages = [
      "page-register",
      "page-login",
      "page-lock-screen",
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ],
    error = [
      "page-error-400",
      "page-error-403",
      "page-error-404",
      "page-error-500",
      "page-error-503",
    ];
  return (
    <div
      className={`dlabnav ${iconHover} ${
        sidebarposition.value === "fixed" &&
        sidebarLayout.value === "horizontal" &&
        headerposition.value === "static"
      }`}
    >
      <PerfectScrollbar className="dlabnav-scroll">
        <Dropdown className="dropdown header-profile2">
          <Dropdown.Toggle
            variant=""
            as="a"
            className="nav-link i-false c-pointer"
          >
            <div className="header-info2 d-flex align-items-center border">
              <img
                src={user.image &&
                  "http://localhost:5001/" +
                  user?.image.replace("public/", "")}
                style={{ objectFit: "cover" }}
                width={20}
                alt=""
              />
              <div className="d-flex align-items-center sidebar-info">
                <div>
                  <h6 className="font-w700 d-block mb-2">
                    {(user?.name).toUpperCase()}
                  </h6>
                  <small className="text-end font-w400">
                    {user?.role === "Super Admin"
                      ? "Comité de la zone C"
                      : user?.role === "Admin"
                      ? (user?.OLM).toUpperCase()
                      : "Membre"}
                  </small>
                </div>
                <i className="fas fa-sort-down ms-4"></i>
              </div>
            </div>
          </Dropdown.Toggle>
          <Dropdown.Menu
            align="right"
            className=" dropdown-menu dropdown-menu-end"
          >
            <Link to="/app-profile" className="dropdown-item ai-icon">
              <svg
                id="icon-user1"
                xmlns="http://www.w3.org/2000/svg"
                className="text-primary me-1"
                width={18}
                height={18}
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx={12} cy={7} r={4} />
              </svg>
              <span className="ms-2">Profile </span>
            </Link>
            <LogoutPage />
          </Dropdown.Menu>
        </Dropdown>
        <MM className="metismenu" id="menu">
          <li>
            <Link
              className={`${path === "dashboard" ? "mm-active" : ""}`}
              to="/acceuil"
            >
              <i className="fas fa-list-alt"></i>
              Acceuil
            </Link>
          </li>
        </MM>
        <MM className="metismenu" id="menu">
          <li className={`${deshBoard.includes(path) ? "mm-active" : ""}`}>
            <Link className="has-arrow" to="#">
              <i className="fas fa-home"></i>
              <span className="nav-text">Dashboard</span>
            </Link>
            <ul>
              {user?.role === "Super Admin" || user?.role === "Admin" ? (
                <li>
                  <Link
                    className={`${path === "dashboard" ? "mm-active" : ""}`}
                    to={`${
                      user.role === "Super Admin"
                        ? "/dashboard"
                        : user.role === "Admin"
                        ? "/statistiques"
                        : "/acceuil"
                    }`}
                  >
                    {" "}
                    Statistique
                  </Link>
                </li>
              ) : null}
              {user?.role === "Admin" ? (
                <>
                  <li>
                    <Link
                      className={`${path === "task" ? "mm-active" : ""}`}
                      to="/formations"
                    >
                      Gestion des Formations
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "app-calender" ? "mm-active" : ""
                      }`}
                      to="/actions"
                    >
                      Gestion des Actions
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "app-calender" ? "mm-active" : ""
                      }`}
                      to="/app-calender"
                    >
                      Gestion des Evénements
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "app-calender" ? "mm-active" : ""
                      }`}
                      to="/forum"
                    >
                      Planification des Forums Zonal
                    </Link>
                  </li>
                </>
              ) : null}
              {user?.role === "Member" ? (
                <>
                  <li>
                    <Link
                      className={`${
                        path === "app-calender" ? "mm-active" : ""
                      }`}
                      to="/FORMATIONS_OLM"
                    >
                      FORMATIONS
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "app-calender" ? "mm-active" : ""
                      }`}
                      to="/ACTIONS_OLM"
                    >
                      ACTIONS
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "app-calender" ? "mm-active" : ""
                      }`}
                      to="/FORUMS"
                    >
                      FORUMS
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "app-calender" ? "mm-active" : ""
                      }`}
                      to="/Calendrier"
                    >
                      Evénements
                    </Link>
                  </li>
                </>
              ) : null}
              {user?.role === "Super Admin" && (
                <li>
                  <Link
                    className={`${path === "app-calender" ? "mm-active" : ""}`}
                    to="/app-calender"
                  >
                    Gestion des Evénements
                  </Link>
                </li>
              )}
            </ul>
          </li>
          <li className={`${table.includes(path) ? "mm-active" : ""}`}>
            {user.role === "Super Admin" || user.role === "Admin" ? (
              <Link className="has-arrow ai-icon" to="#">
                <i className="fas fa-table"></i>
                <span className="nav-text">Gestion des utilisateurs </span>
              </Link>
            ) : null}
            <ul>
              {user?.role === "Super Admin" ? (
                <>
                  <li>
                    <Link
                      className={`${
                        path === "administrateurs" ? "mm-active" : ""
                      }`}
                      to="/administrateurs"
                    >
                      Gestion des administrateurs Local
                    </Link>
                  </li>
                  <li>
                    <Link
                      className={`${
                        path === "table-filtering" ? "mm-active" : ""
                      }`}
                      to="/table-filtering"
                    >
                      Filtrage des administrateurs Local
                    </Link>
                  </li>
                </>
              ) : null}
              {user?.role === "Admin" && (
                <li>
                  <Link
                    className={`${path === "membres" ? "mm-active" : ""}`}
                    to="/membres"
                  >
                    Gestion des membres
                  </Link>
                </li>
              )}
            </ul>
          </li>
        </MM>
      </PerfectScrollbar>
    </div>
  );
};

export default SideBar;
