import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { FetchContext } from '../../contexts/FetchContext';
import { useContext } from 'react';
import { GlobalContext } from '../../contexts/GlobalContext';


export default function EditInfoForm({setSuccessText, userInfo, setUserInfo, setShowSuccessModal, showEditForm, setShowEditForm}) {

    const { fetchGeneral, getFetchGeneral } = useContext(FetchContext);  // handles fetch requests
    const {login} = useContext(GlobalContext)

    const handleSubmitInfo = async (event) => {
        event.preventDefault()
        const form = event.currentTarget.elements
        const newUserInfo = {
            username: form.username.value,
            name: form.name.value,
            lastname: form.lastname.value,
            password: form.password.value
        }
        const response = await fetchGeneral(`/users/${userInfo.id}`, 'PATCH', newUserInfo)
        if (response.status === 200) {
            setShowEditForm(false)
            const updatedUser = await getFetchGeneral(`/users/${userInfo.id}`)
            setUserInfo(updatedUser)
            setSuccessText("User information updated.")
            setShowSuccessModal(true)
        }
    }

return <>
            <Modal show={showEditForm} onHide={() => setShowEditForm(false)} animation={false}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit account information</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={handleSubmitInfo} return="false">
                        <label>Username</label>
                        <input type="text" name="username" className="form-control mb-2" placeholder="Username" aria-label="username" defaultValue={login && login.username && login.username} required />
                        <label>Name</label>
                        <input type="text" name="name" className="form-control mb-2" placeholder="Name" aria-label="name" defaultValue={login && login.name && login.name} required />
                        <label>Surname</label>
                        <input type="text" name="lastname" className="form-control mb-2" placeholder="Surname" aria-label="lastname" defaultValue={login && login.lastname && login.lastname} required/>
                        <label>Password</label>
                        <input type="password" name="password" className="form-control mb-2" placeholder="Password" aria-label="password" defaultValue={login && login.password} required />
                        <Button variant="secondary" className="my-3" onClick={() => setShowEditForm(false)}>
                            Cancel
                        </Button>
                        <Button variant="primary" className="my-3 ms-2" type="submit">
                            Update your information
                        </Button>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
</>
}