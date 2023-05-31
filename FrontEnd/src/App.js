import { lazy, Suspense, useEffect } from "react";

/// Components
import Index from "./jsx";
import { connect, useDispatch, useSelector } from "react-redux";
import { Redirect, Route, Switch, withRouter } from "react-router-dom";
import Error404 from "./jsx/pages/Error404";
// action
import { isAuthenticated } from "./store/selectors/AuthSelectors";
/// Style
import "./vendor/bootstrap-select/dist/css/bootstrap-select.min.css";
import "./css/style.css";

const SignUp = lazy(() => import("./jsx/pages/Registration"));
const ForgotPassword = lazy(() => import("./jsx/pages/ForgotPassword"));
const Login = lazy(() =>
  import("./jsx/pages/Login").then((module) => {
    module.loaded = true;
    return module;
  })
);

function App(props) {
  const { isAuthenticated } = props;

  useEffect(() => {
    if (
      !isAuthenticated &&
      props.location.pathname !== "/login" &&
      props.location.pathname !== "/page-register"
    ) {
      props.history.push("/login");
    }
  }, [isAuthenticated, props.location.pathname, props.history]);

  let routes = (
    <Switch>
      <Route path="/login" exact component={Login} />
      <Route path="/page-register" component={SignUp} />
      <Route path="/page-forgot-password" component={ForgotPassword} />
      <Redirect to="/login" />
    </Switch>
  );
  if (props.isAuthenticated) {
    return (
      <>
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          <Index />
        </Suspense>
      </>
    );
  } else {
    return (
      <div className="vh-100">
        <Suspense
          fallback={
            <div id="preloader">
              <div className="sk-three-bounce">
                <div className="sk-child sk-bounce1"></div>
                <div className="sk-child sk-bounce2"></div>
                <div className="sk-child sk-bounce3"></div>
              </div>
            </div>
          }
        >
          {routes}
        </Suspense>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isAuthenticated: isAuthenticated(state),
  };
};

export default withRouter(connect(mapStateToProps)(App));
