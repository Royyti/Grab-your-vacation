import { useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { AiFillEdit } from "react-icons/ai";
import { updateVacation } from "../../../Api";
import { useLocation, Navigate } from "react-router-dom";
const UpdateVacation = () => {
    let location = useLocation();
    const vid = location.state.id;
    const [vacationObj, setVacationObj] = useState({});
    const [selectedFile, setSelectedFile] = useState([]);
    const [update, setUpdate] = useState(false);
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function onClickUpdate(e) {

        e.preventDefault();
        const formData = new FormData();
        Object.entries(vacationObj).forEach((kv) =>
            formData.append(kv[0], kv[1].toString())
        );

        if (selectedFile.length > 0) {
            formData.append(selectedFile[0], selectedFile[1], selectedFile[2]);
        }
        try {
            updateVacation(vid, formData)
                .then(res => {
                    handleClose();

                })
                .then(setUpdate(true))

        } catch (err) {
            return console.log("err", err);
        }


    }
    return (
        <>
            <Button className="btn btn-dark text-center w-bold m-5" variant="primary" onClick={handleShow}>
                <AiFillEdit /> Edit
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Update Vacation </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Label>Update vacation</Form.Label>
                        <Form.Group className="mb-3">
                            <Form.Label>Destination</Form.Label>
                            <Form.Control type="text" placeholder={location.state.destination} onChange={d => setVacationObj({ ...vacationObj, destination: d.target.value })} required />
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder={location.state.description} onChange={d => setVacationObj({ ...vacationObj, description: d.target.value })} required />
                            <Form.Label>Picture</Form.Label>
                            <Form.Control type="file" name="picture" placeholder={location.state.picture} onChange={e => setSelectedFile([e.target.name, e.currentTarget.files[0], e.target.value])} required />
                            <Form.Label>Date from</Form.Label>
                            <Form.Control type="date" placeholder={Date(location.state.dateFrom)} onChange={d => setVacationObj({ ...vacationObj, dateFrom: d.target.value })} required />
                            <Form.Label>Date to</Form.Label>
                            <Form.Control type="date" placeholder={location.state.dateTo} onChange={d => setVacationObj({ ...vacationObj, dateTo: d.target.value })} required />
                            <Form.Label>price</Form.Label>
                            <Form.Control type="number" placeholder={location.state.price} onChange={p => setVacationObj({ ...vacationObj, price: p.target.value })} required />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button type="submit" variant="primary" onClick={onClickUpdate}>
                        Save changes
                    </Button>
                </Modal.Footer>
            </Modal>
            {update ? <Navigate to="/vacations" replace={true} /> : <></>}
        </>
    );
}


export default UpdateVacation;