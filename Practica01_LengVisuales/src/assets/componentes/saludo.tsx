// Este componente muestra un saludo

//Demuestra el uso de variables, constantes, etc.


import React, {useState} from "react";
import { Button,Form,Card, Container } from "react-bootstrap";


const Saludo = () =>{
  // Variables usando useState (concepto de estado en React)
  const [nombre, setNombre] = useState('');
  const [saludo, setSaludo] = useState('');

  // Constante (no cambia)
  const MENSAJE_BASE = '¡Hola!';

  // Función para manejar el cambio en el input
const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
  setNombre(event.target.value);
};

  // Función para generar el saludo
  const generarSaludo = () => {
    if (nombre.trim() === '') {
      setSaludo(`${MENSAJE_BASE} Por favor, escribe tu nombre.`);
    } else {
      setSaludo(`${MENSAJE_BASE} ${nombre}, bienvenido/a a React.`);
    }
  };


    return (
    <Container className="mt-5">
      <Card className="shadow">
        <Card.Header className="bg-primary text-white">
          <h3>Práctica 1: Saludo Personalizado</h3>
          <small>Variables, Estado y Componentes</small>
        </Card.Header>
        <Card.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Ingresa tu nombre:</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ej: Ana"
                value={nombre}
                onChange={handleChange}
              />
              <Form.Text className="text-muted">
                Esto demuestra el manejo de entrada de datos.
              </Form.Text>
            </Form.Group>

            <Button 
              variant="success" 
              onClick={generarSaludo}
              className="me-2"
            >
              Generar Saludo
            </Button>

            <Button 
              variant="secondary" 
              onClick={() => {
                setNombre('');
                setSaludo('');
              }}
            >
              Limpiar
            </Button>
          </Form>

          {/* Mostrar el saludo */}
          {saludo && (
            <div className="mt-4 p-3 bg-light border rounded">
              <h5>Saludo generado:</h5>
              <p className="lead">{saludo}</p>
              <small className="text-muted">
                Esto demuestra la salida de datos en la interfaz.
              </small>
            </div>
          )}
        </Card.Body>
        <Card.Footer className="text-muted">
          <small>
            Conceptos aplicados: variables, constantes, estado, entrada/salida, componentes.
          </small>
        </Card.Footer>
      </Card>
    </Container>
  );

};
export default Saludo;