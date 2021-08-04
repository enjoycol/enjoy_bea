import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";

import "./App.css";
import HomePage from "./components/HomePage";
import SalonsListPage from "./components/SalonsListPage";
import SalonPage from "./components/SalonPage";
import UserProfilePage from "./components/UserProfilePage";
import PrivacyPolicyPage from "./components/PrivacyPolicyPage";
import RecoverPassword from "./components/RecoverPassword";
import NewPassword from "./components/NewPassword";
import DashboardPage from "./components/DashboardPage";
import ConfirmationPage from "./components/ConfirmationPage";
import ConfirmService from "./components/ConfirmService";
import QualifyService from "./components/QualifyService";
import BrandSalonsListPage from "./components/BrandSalonsListPage";
import BrandsListPage from "./components/BrandsListPage";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={HomePage} />
          <Route path="/brands" exact component={BrandsListPage} />
          <Route path="/salons/" exact component={SalonsListPage} />
          <Route path="/brands/:id" exact component={BrandSalonsListPage} />
          <Route path="/salon/:id" exact component={SalonPage} />
          <Route path="/auth/user" exact component={UserProfilePage} />
          <Route path="/privacy_policy" exact component={PrivacyPolicyPage} />
          <Route path="/password_recovery" exact component={RecoverPassword} />
          <Route path="/new_password/:id" exact component={NewPassword} />
          <Route path="/auth/dashboard" exact component={DashboardPage} />
          <Route path="/confirmation_page" exact component={ConfirmationPage} />
          <Route
            path="/confirm_service/:id/:token"
            exact
            component={ConfirmService}
          />
          <Route
            path="/rate_service/:id/:token"
            exact
            component={QualifyService}
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
