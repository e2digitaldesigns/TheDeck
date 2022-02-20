import * as React from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Settings from "./../settings/settings";
import SettingsObs from "../settings/settingsObs/settingsObs";
import SettingsServer from "../settings/settingsServer/settingsServer";
import SettingsTwitch from "../settings/settingsTwitch/settingsTwitch";

import MacroDeck from "./../macroDeck/macroDeck";
import TemplateHeader from "../../template/header/templateHeader";
import * as TYPES from "./../../../types";
import Splash from "./../splash/splash";
import SettingsMacroDeck from "./../settings/settingsMacroDeck/settingsMacroDeck";

const ApplicationWrapper: React.FC = () => {
  return (
    <>
      <section data-testid="template-wrapper-section">
        <ToastContainer autoClose={4000} pauseOnFocusLoss={false} />

        <Router>
          <TemplateHeader />
          <Routes>
            <Route path={`/${TYPES.SectionRoutes.Home}`} element={<Splash />} />

            <Route
              path={`/${TYPES.SectionRoutes.MacroDeck}`}
              element={<MacroDeck />}
            />

            <Route
              path={`/${TYPES.SectionRoutes.Settings}`}
              element={<Settings />}
            >
              <Route
                path={`/${TYPES.SectionRoutes.SettingsMacroDeck}`}
                element={<SettingsMacroDeck />}
              />

              <Route
                path={`/${TYPES.SectionRoutes.SettingsServer}`}
                element={<SettingsServer />}
              />

              <Route
                path={`/${TYPES.SectionRoutes.SettingsObs}`}
                element={<SettingsObs />}
              />

              <Route
                path={`/${TYPES.SectionRoutes.SettingsTwitch}`}
                element={<SettingsTwitch />}
              />
            </Route>

            <Route
              path={`/${TYPES.SectionRoutes.Splash}`}
              element={<Splash />}
            />
            <Route path="*" element={<Splash />} />
          </Routes>
        </Router>
      </section>
    </>
  );
};

export default ApplicationWrapper;
