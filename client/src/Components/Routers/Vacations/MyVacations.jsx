import { useEffect, useState } from "react";
import { getUserVacationsFollowerOnly } from "../../../Api";
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Accordion from 'react-bootstrap/Accordion';
import { useAccordionButton } from 'react-bootstrap/AccordionButton';
import { FcLike } from "react-icons/fc";
import { store } from "../../../store/store";
import { IoHeartCircleOutline } from "react-icons/io5";

const MyVacations = () => {
    const [userVacations, setUserVacations] = useState([]);
    const isAdmin = store.getState().userSettings.isAdmin === "yes";
    useEffect(() => {
        if (!isAdmin) {

            getUserVacationsFollowerOnly()
                .then(res => {
                    setUserVacations(res);

                })
        }
    }, [])

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

        <Container>
            <Row>
                {userVacations.map((v, i) => <Col xs key={i}> <Card className="mt-5" data-vid={v.id} style={{ width: '18rem' }}>
                    <Card.Img variant="top" src={`images/${v.picture}`} />
                    <Card.Body>
                        <Card.Title>
                            <IoHeartCircleOutline data-vid={v.id} data-id={i} className="heart active" />
                            {v.destination}
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
            </Row>
        </Container>
    </div>
}
export default MyVacations