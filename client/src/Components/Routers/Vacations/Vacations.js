import React, { useEffect, useState } from "react";
import { getAllVacations, getUserVacationsFollower, setFollowVacation, unFollowVacation, removeVacation } from "../../../Api";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Alert from 'react-bootstrap/Alert';
import { FiEdit3, FiXCircle } from "react-icons/fi";
import { IoHeartCircleOutline } from "react-icons/io5";
import { FcLike } from "react-icons/fc";
import { store } from "../../../store/store";
import { Navigate } from "react-router-dom";
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';

const Vacations = () => {
    const [vacationsArray, setVacationsArray] = useState([]);
    const [follow, setFollow] = useState([])
    const [edit, setEdit] = useState(false);
    const [vacObjForUpdate, setVacObjForUpdate] = useState({});
    const [vid, setVid] = useState(-1);
    const isAdmin = store.getState().userSettings.isAdmin === "yes";
    const userId = store.getState().userSettings.id;

    useEffect(() => {
        if (!isAdmin) {

            getUserVacationsFollower()
                .then(res => {
                    setVacationsArray(res);
                    const tempArr = res.map(p => p.u_id === null ? false : true);
                    setFollow(tempArr);
                })

        }
        else {
            getAllVacations()
                .then(res => {
                    setVacationsArray(res);
                })
        }

    }, []);

    function onClickFollow(e) {
        e.preventDefault();
        const idx = Number(e.target.dataset.id);
        const vid = e.target.dataset.vid;
        if (Number.isNaN(idx)) return;
        if (!follow[idx]) {
            e.target.setAttribute('class', 'heart active');
            const tempArr = [...follow];
            tempArr[idx] = !tempArr[idx];
            setFollow(tempArr);

            const tempVacationsArr = [...vacationsArray];
            const vacationId = tempVacationsArr.findIndex(v => v.id == vid)
            tempVacationsArr[vacationId].u_id = userId

            setVacationsArray(tempVacationsArr);

            return setFollowVacation(vid)
        }
        else {
            e.target.setAttribute('class', 'heart');
            const tempArr = [...follow];
            tempArr[idx] = !tempArr[idx];
            setFollow(tempArr);
            const tempVacationsArr = [...vacationsArray];
            const vacationId = tempVacationsArr.findIndex(v => v.id == vid)
            tempVacationsArr[vacationId].u_id = null;
            setVacationsArray(tempVacationsArr);
            return unFollowVacation(vid)

        }

    }

    function onClickX(e) {
        e.preventDefault();
        const idx = Number(e.target.dataset.id);
        const vid = e.target.dataset.vid;
        if (Number.isNaN(idx)) return;

        return removeVacation(vid)
            .then(res => {
                const tempVacationsArr = [...vacationsArray];

                const vacationId = tempVacationsArr.findIndex(v => v.id == vid)
                const vacationObj = tempVacationsArr.find(v => v.id == vid);
                tempVacationsArr.splice(vacationId, 1)
                setVacationsArray([...tempVacationsArr])
            })


    }

    function onClickEdit(e) {
        e.preventDefault();
        const idx = Number(e.target.dataset.id);
        const v_id = e.target.dataset.vid;
        setVid(v_id);
        if (Number.isNaN(idx)) return;
        const tempVacationsArr = [...vacationsArray];
        const vacationId = tempVacationsArr.findIndex(v => v.id == v_id)
        const vacationObj = tempVacationsArr.find(v => v.id == v_id);
        const body = {
            id: v_id,
            description: vacationObj.description,
            destination: vacationObj.destination,
            picture: vacationObj.picture,
            dateFrom: vacationObj.dateFrom,
            dateTo: vacationObj.dateTo,
            price: vacationObj.price
        }
        setVacObjForUpdate(body)

        setEdit(true)
    }
    function CustomToggle({ children, eventKey }) {
        const decoratedOnClick = useAccordionButton(eventKey);

        return (
            <button
                type="button"
                onClick={decoratedOnClick}
                className="btn btn-link"
            >
                {children}
            </button>
        );
    }
    return <div >
        <Container >
            <Alert style={{ color: "#00496d" }} className="w-bold mt-3 mb-5" key="primary" variant="primary">
                Plan your next trip to one of the best places to vacation, including New York City, Paris, Orlando and Las Vegas.
            </Alert>
            <Row>
                {vacationsArray.map((v, i) => <Col xs key={i} > <Card className="mt-3" data-vid={v.id} style={{
                    width: '20rem', color: "#00496d"
                }}>
                    <Card.Img variant="top" src={`images/${v.picture}`} />
                    <Card.Body>
                        <Card.Title>
                            {!isAdmin ? <IoHeartCircleOutline data-vid={v.id} data-id={i} className={v.u_id ? "heart active" : "heart"}
                                onClick={onClickFollow} />
                                : <></>}
                            {v.destination}
                            {isAdmin ? <><FiXCircle data-vid={v.id} data-id={i} onClick={onClickX} className="xCircle" style={{ cursor: "pointer", float: "right" }} />
                                <pre />
                                < FiEdit3 className="edit" data-vid={v.id} data-id={i} style={{ cursor: "pointer", float: "right" }} onClick={onClickEdit} /></> : <></>}
                        </Card.Title>
                        <Accordion>
                            {v.description.substring(0, 85)}
                            <CustomToggle eventKey="0" className="btn btn-link">.....</CustomToggle>
                            <Accordion.Collapse eventKey="0">
                                <Card.Text> {v.description.substring(86)} </Card.Text>
                            </Accordion.Collapse>


                        </Accordion>
                        <Accordion >
                            <Accordion.Item eventKey="0">
                                <Accordion.Header style={{ color: "#00496d" }}>More details</Accordion.Header>
                                <Accordion.Body>
                                    <ListGroup >
                                        <ListGroup.Item style={{ color: "#00496d" }}>From date: {v.dateFrom.substring(0, 10)}</ListGroup.Item>
                                        <ListGroup.Item style={{ color: "#00496d" }}>To date: {v.dateTo.substring(0, 10)}</ListGroup.Item>
                                        <ListGroup.Item style={{ color: "#00496d" }}>Price: {v.price}$</ListGroup.Item>
                                        <ListGroup.Item style={{ color: "#00496d" }}>Followers: {v.followers} <FcLike /></ListGroup.Item>
                                    </ListGroup>
                                </Accordion.Body>
                            </Accordion.Item>
                        </Accordion>


                    </Card.Body>
                </Card></Col>)}
                {edit ? <Navigate to={`/edit-vacation/${vid}`} state={{ ...vacObjForUpdate }} replace={true} /> : <></>}
            </Row>
        </Container>
    </div >


}

export default Vacations;
