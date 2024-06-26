import { useNavigate } from "react-router-dom"
import { FetchContext } from "../../contexts/FetchContext";
import { useContext, useState } from "react";
import { Modal, Form, Button } from "react-bootstrap";

export default function ProfilePageItem({ title, bidText, bidAmount, handleDelete, description, image, itemId, deleteButton, editButton, setSavedAuctions }) {
    const redirect = useNavigate();
    const { fetchGeneral } = useContext(FetchContext)
    const [showEditAuction, setShowEditAuction] = useState(false)



    const handleEdit = async (e) => {
        e.preventDefault()
        const newDescription = { 'description': e.currentTarget.elements.description.value }
        fetchGeneral(`/api/item/${itemId}`, 'PATCH', newDescription)
        setShowEditAuction(false)
    }

    return <>
        {editButton && <button className="btn btn-sm btn-outline-secondary float-end" onClick={() => setShowEditAuction(true)}>Edit</button>}
        {deleteButton && <button className="btn btn-sm btn-outline-danger float-end" onClick={() => handleDelete(itemId)}>x</button>}
        <div className="row mb-4" key={itemId} onClick={() => redirect(`/info/${itemId}`)}>
            <div className="col"><img src={image} className='w-100 h-auto rounded-5' /></div>
            <div className="col-8">
                <h4>{title}</h4>
                <div>{bidText}{bidAmount ? bidAmount : description}</div>
            </div>
        </div>
        <Modal show={showEditAuction} onHide={() => setShowEditAuction(false)} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Edit auction description</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleEdit} return="false">
                    <label>Describe your artwork:</label>
                    <input type="text-area" name="description" className="form-control mb-2" aria-label="description" defaultValue={description} required />
                    <Button variant="secondary" className="my-3" onClick={() => setShowEditAuction(false)}>
                        Cancel
                    </Button>
                    <Button variant="primary" className="my-3 ms-2" type="submit">
                        Update your description
                    </Button>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
        </Modal>

    </>
}