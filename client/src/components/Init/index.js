import { Fragment, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Mask from "../../ui/mask";
import Spinner from "../../ui/spinner";
import Navigation from "../Navigation";
import Signup from "../Signup";
import Calendar from "../Calendar";
import Footer from "../Footer";
import LandingPopup from "../Popup/Landing";
import { fetchToday } from "../../stores/actions/today";

const Init = () => {
  // const [warningPopupMessage, setWarningPopupMessage] = useState();

  const dispatch = useDispatch();
  const { showSpinner, errorMessage } = useSelector((state) => state.common);
  const { today } = useSelector((state) => state.today);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (today.year) return;
    dispatch(fetchToday());
  }, [dispatch, today.year]);

  return (
    <Fragment>
      {showSpinner && <Spinner />}
      {errorMessage && (
        <Mask>
          <h1>{errorMessage}</h1>
        </Mask>
      )}
      {user.email && <LandingPopup />}
      <Navigation />
      {!user.email && <Signup />}
      {user.email && <Calendar />}
      <Footer />
    </Fragment>
  );
};

export default Init;
