import { useState } from "react";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Navigate } from "react-router-dom";
import { addNewVacation } from "../../../Api";

const AddVacation = () => {
    const [vacationObj, setVacationObj] = useState({});
    const [selectedFile, setSelectedFile] = useState([]);
    const [add, setAdd] = useState(false);


    function onClickAdd(e) {
        e.preventDefault();
        const formData = new FormData();
        Object.entries(vacationObj).forEach((kv) =>
            formData.append(kv[0], kv[1].toString())
        );

        if (selectedFile.length > 0) {
            formData.append(selectedFile[0], selectedFile[1], selectedFile[2]);
        }

        try {
            addNewVacation(formData)
                .then(res => setAdd(true))

        } catch (err) {
            return console.log("err", err);
        }

    }
    return (
        <div>
            <Container>
                <Row>
                    < Col md={{ span: 4, offset: 4 }}>
                        <h3>Add a vacation</h3>
                        <Form >
                            <Form.Group className="mb-3" controlId="formBasicDestination">
                                <Form.Label>Destination</Form.Label>
                                <Form.Control type="text" placeholder="Destination" onChange={d => setVacationObj({ ...vacationObj, destination: d.target.value })} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicdescription">
                                <Form.Label>Descriptione</Form.Label>
                                <Form.Control type="text" placeholder="Descriptione" onChange={d => setVacationObj({ ...vacationObj, description: d.target.value })} required />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPicture">
                                <Form.Label>Picture</Form.Label>
                                <Form.Control type="file" name="picture" onChange={e => setSelectedFile([e.target.name, e.currentTarget.files[0], e.target.value])} placeholder="Picture" required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDateFrom">
                                <Form.Label>Date From</Form.Label>
                                <Form.Control type="date" placeholder="Date From" onChange={d => setVacationObj({ ...vacationObj, dateFrom: d.target.value })} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicDateTo">
                                <Form.Label>Date To</Form.Label>
                                <Form.Control type="date" placeholder="Date To" onChange={d => setVacationObj({ ...vacationObj, dateTo: d.target.value })} required />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="formBasicPrice">
                                <Form.Label>Price</Form.Label>
                                <Form.Control type="number" placeholder="Price" onChange={p => setVacationObj({ ...vacationObj, price: p.target.value })} required />
                            </Form.Group>
                            <Button variant="primary" type="submit" onClick={onClickAdd}>
                                Add
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
            {add ? <Navigate to="/vacations" replace={true} /> : <></>}
        </div>
    )
}

export default AddVacation
