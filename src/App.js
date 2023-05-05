import "./App.css";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import NavBar from "./components/navigators/NavBar";
import Footer from "./components/navigators/Footer";
import NestedGrid from "./components/indicators/NestedGrid";
import Candidates from "./components/indicators/CandidateRegister";

import Individual from "./components/indicators/individual";
import Corporate from "./components/indicators/corporate";
import ItemsManager from "./components/managementtools/item";
import ScoreManager from "./components/managementtools/score";
import IndicatorManager from "./components/managementtools/indicator";
import Sidebar from "./components/navigators/Sidebar";
import IndProfiles from "./components/reports/indprofiles";

import { getIndicators } from "./store/actions/indicatorAction";
import { loadUser } from "./store/actions/authAction";
import { getScores } from "./store/actions/scoreAction";
import { getItems } from "./store/actions/itemAction";
import { getUsers } from "./store/actions/usersAction";
import { getIndProfiles } from "./store/actions/indProfilerAction";
import IndProfileDetails from "./components/reports/IndProfileDetails";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Container } from "@material-ui/core";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

//import BounceLoader from "react-spinners/BounceLoader";
import MoonLoader from "react-spinners/MoonLoader";

import backgroundImage from "./docs/backgd.jpg";

//import { makeStyles, ThemeProvider } from "@material-ui/styles";
import {
  createTheme,
  ThemeProvider,
  makeStyles,
} from "@material-ui/core/styles";

import "@fontsource/roboto/500.css";

const theme = createTheme();
const useStyles = makeStyles((theme) => ({
  containerStyle: {
    justifyContent: "center",
    [theme.breakpoints.down("sm")]: {
      marginTop: "56px",
      backgroundImage: `url(${backgroundImage})`,
    },
  },
  contentStyle: {
    padding: "24px",
    [theme.breakpoints.down("sm")]: {
      flexGrow: 1,
      padding: theme.spacing(3),
      maxWidth: "xl",
      margin: "0 auto",
    },
  },
}));

function App() {
  const classes = useStyles();
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  let [color, setColor] = useState("#35acce");

  const [isIndProfileDetailsOpen, setIsIndProfileDetailsOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getIndProfiles());
      setLoading(false);
    };

    loadData().catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getUsers());
      setLoading(false);
    };

    loadData().catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(loadUser());
      setLoading(false);
    };

    loadData().catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getIndicators());
      setLoading(false);
    };

    loadData().catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getScores());
      setLoading(false);
    };

    loadData().catch(() => setLoading(false));
  }, [dispatch]);

  useEffect(() => {
    const loadData = async () => {
      await dispatch(getItems());
      setLoading(false);
    };

    loadData().catch(() => setLoading(false));
  }, [dispatch]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}>
        <MoonLoader color="#0d75a8" />
      </div>
    );
  }

  return (
    <>
      {!loading && (
        <ThemeProvider theme={theme}>
          <div className="App">
            <BrowserRouter>
              <ToastContainer />
              {!isIndProfileDetailsOpen && <Sidebar />}
              <Container
                className={classes.containerStyle}
                style={{ backgroundColor: "#f2f9f8" }}
                maxWidth="xl">
                <Container className={classes.contentStyle} maxWidth="xl">
                  <Routes>
                    <Route path="/" exact element={<SignIn />} />
                    <Route path="/signin" exact element={<SignIn />} />
                    <Route path="/signup" exact element={<SignUp />} />
                    <Route path="/indprofiler" exact element={<Individual />} />
                    <Route path="/corprofiler" exact element={<Corporate />} />
                    <Route path="/nested" exact element={<NestedGrid />} />
                    <Route path="/candidates" exact element={<Candidates />} />
                    <Route path="/items" exact element={<ItemsManager />} />
                    <Route path="/scores" exact element={<ScoreManager />} />
                    <Route path="/scores" exact element={<ScoreManager />} />
                    <Route
                      path="/indicators"
                      exact
                      element={<IndicatorManager />}
                    />
                    <Route
                      path="/indprofiles"
                      exact
                      element={<IndProfiles />}
                    />
                    <Route
                      path="/indprofiledetails/:id"
                      element={
                        <IndProfileDetails
                          setIsIndProfileDetailsOpen={
                            setIsIndProfileDetailsOpen
                          }
                        />
                      }
                    />
                  </Routes>
                </Container>
                {!isIndProfileDetailsOpen && <Footer />}
              </Container>
            </BrowserRouter>
          </div>
        </ThemeProvider>
      )}
    </>
  );
}

export default App;
