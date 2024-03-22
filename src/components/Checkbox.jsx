import { useState } from "react"
import Form from 'react-bootstrap/Form';

export default function Checkbox({ type, label, value }){

    const [checked, setChecked] = useState(false)

    return <>
    <Form.Check
        inline
        label={label}
        name={value}
        type={type}
        id={value}
        checked={checked}
        onChange={() => setChecked(!checked)}
        />
    </>
}