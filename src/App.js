import React, {Fragment, useState, useEffect} from 'react';
import Form from './Components/Form/index'
import Appointment from './Components/Appointment/index'
import propTypes from 'prop-types'

function App() {
  
//Appointments in Local Storage
  
  let startingAppointments = JSON.parse(localStorage.getItem('appointments'))
  if (!startingAppointments) {
    startingAppointments = []
  }

// making appointments
  
  const [appointments, saveAppointments] = useState(startingAppointments)

  //Use Effecto to do certain operations when the state changes

  useEffect(() => {

    let startingAppointments = JSON.parse(localStorage.getItem('appointments'))

    if (startingAppointments) {
      localStorage.setItem('appointments', JSON.stringify(appointments))
    } else {
      localStorage.setItem('appointments', JSON.stringify([]))
    }

  }, [appointments] )

  //register and add appointments

  const createAppointment = appointment => {
    saveAppointments([
      ...appointments,
      appointment
    ])
  }

  //Delete appointment by ID

  const deleteAppointment = id => {
    const newAppointments = appointments.filter(elm => elm.id !== id)
    saveAppointments(newAppointments)
  }

  //Conditional message

  const title = appointments.length ===0 ? 'No hay citas' : 'Administra tus citas'

  return (
    <Fragment>
      <h1>Administrador de pacientes</h1>
      <div className="container">
        <div className="row">
          <div className="one-half column"><Form
            createAppointment={createAppointment}
          /></div>
          <div className="one-half column">
            
            <h2>{title}</h2>

            {appointments.map(elm => (

              <Appointment
                
                key={elm.id}
                appointment={elm}
                deleteAppointment={deleteAppointment}
                
              />
            ))}
          </div>
        </div>
      </div>
    </Fragment>
  )
}

Form.propTypes = {
  createAppointment: propTypes.func.isRequired
}

export default App;
