import { Dropdown, Nav } from "react-bootstrap";
import { forwardRef } from "react";
import { BsPersonFill } from "react-icons/bs";
import { RiArrowDropDownLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { getToken } from "../Api";
import { store } from "../store/store";
import { removeUserAction } from "../store/user.actions";
import { useState } from "react";

const token = getToken()

const CustomToggle = forwardRef(({ onClick }, ref) => {
    const [userFirstName, setUserFirstName] = useState("");
    const unsubscribeUser = store.subscribe(() => setUserFirstName(store.getState().userSettings.firstName[0].toUpperCase() + store.getState().userSettings.firstName.slice(1) + " "));
    return (
        <Nav.Link
            ref={ref}
            style={{ color: "whitesmoke" }}
            title="Menu"
            className="me-auto"
            onClick={(e) => {
                e.preventDefault();
                onClick(e);
            }}
        >
            {userFirstName}

            <BsPersonFill className="mx-auto " /><RiArrowDropDownLine className="mx-auto " />
        </Nav.Link>

    )
})

function MenuDropdown() {
    const token = getToken()
    const [isAdmin, setIsAdmin] = useState(null);
    const unsubscribe = store.subscribe(() => setIsAdmin(store.getState().userSettings.isAdmin === "yes" ? true : false));
    const handleLogOut = () => {
        /* store.dispatch({
             type: removeUserAction,
             payload: null
         })*/
        sessionStorage.removeItem('token', token);
        window.location.replace('http://localhost:3000/');

    };
    return (
        <Dropdown className="d-inline" >
            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components" />

            <Dropdown.Menu align="end">
                {!isAdmin ? <Dropdown.Item to={`/myVacations`} as={Link} eventKey="1">My Vacations</Dropdown.Item> :
                    <>
                        <Dropdown.Item to={"/reports"} as={Link} eventKey="2">
                            Reports
                        </Dropdown.Item>
                        <Dropdown.Item to={`/add-vacation`} as={Link} eventKey="3">
                            Add Vacation
                        </Dropdown.Item>
                    </>}
                <Dropdown.Item eventKey="4" title="Log out" onClick={handleLogOut}>
                    Log out
                </Dropdown.Item>

            </Dropdown.Menu>
        </Dropdown>
    );
}

export default MenuDropdown;