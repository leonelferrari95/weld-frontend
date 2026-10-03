import { useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap'

function Registro({ show, onHide }) {
    const [nombre, setNombre] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmarPassword, setConfirmarPassword] = useState('')
    const [mensaje, setMensaje] = useState('')
    const [esError, setEsError] = useState(false)


    const registrarUsuario = (event) => {
        event.preventDefault()

        if (!nombre || !email || !password || !confirmarPassword) {
            setMensaje('Por favor, complete todos los campos.')
            setEsError(true)
            return
        }

        if (password !== confirmarPassword) {
            setMensaje('Las contraseñas no coinciden.')
            setEsError(true)
            return
        }

        setMensaje('Registro realizado correctamente.')
        setEsError(false)

        setNombre('')
        setEmail('')
        setPassword('')
        setConfirmarPassword('')
    
    }

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Registrarse</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Form onSubmit={registrarUsuario}>
                    <Form.Group className="mb-3" controlId="registroNombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Ingrese su nombre"
                            value={nombre}
                            onChange={(event) => setNombre(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registroEmail">
                        <Form.Label>Email</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Ingrese su email"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registroPassword">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Ingrese su contraseña"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="registroConfirmarPassword">
                        <Form.Label>Confirmar contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Repita su contraseña"
                            value={confirmarPassword}
                            onChange={(event) => setConfirmarPassword(event.target.value)}
                        />
                    </Form.Group>

                    {mensaje &&
                         <p className={esError ? 'text-danger' : 'text-success'}>
                            {mensaje}</p>}
                    <Button type="submit" variant="dark" className="w-100">
                        Registrarse
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    )
}

export default Registro