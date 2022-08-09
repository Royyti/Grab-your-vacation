import Login from "./Routers/Auth/Login";
import { getToken } from "../Api";
import { store } from "../store/store";

function Home() {
    const token = getToken();

    return (
        <div className="">

            {!token ? <Login /> :
                <h2 style={{ color: "#00496d" }} className="text-center w-bold fs-1 m-5">Welcome {token ? store.getState().userSettings.firstName : ""}! <br></br>Lets grab your vacation!</h2>}
        </div>
    );
}

export default Home;