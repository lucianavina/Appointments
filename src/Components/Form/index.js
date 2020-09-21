import React, {useState} from 'react';
import uuid from 'uuid/dist/v4'

const Form = ({createAppointment}) => {


    //Create appointment state

    const [appointment, updateAppointment] = useState({

        pet: '',
        owner: '',
        date: '',
        time: '',
        symptoms:''
    })

    const [error, updateError] = useState(false)

    const handleChange = e => {
        updateAppointment({
            ...appointment,
            [e.target.name]: e.target.value
        })
    }

    //Get values

    const { pet, owner, date, time, symptoms } = appointment

    const submitAppointment = e => {
        
        e.preventDefault()
        
        //check

        if (pet.trim() === '' || owner.trim() === '' || date.trim() === '' || time.trim() === '' || symptoms.trim() === '') {
            updateError(true)
            return
        }

        //Delete previos message

        updateError(false)



        //assing ID
        appointment.id = uuid(  )

        //create the appointment

        createAppointment(appointment)

        //Erase form
        updateAppointment({
            pet: '',
            owner: '',
            date: '',
            time: '',
            symptoms: ''
        })

    }
    
    return (  
        <>
            <h2>Crear Cita </h2>

            {error?<p className="alerta-error">Todos los campos son obligatorios</p>:null}
            <form
                onSubmit={submitAppointment}
            
            >
                <label>Nombre Mascota</label> 
                <input
                    type="text"
                    name="pet"
                    className="u-full-width"
                    placeholder="Nombre Mascota"
                    onChange={handleChange}
                    value={pet}
                />
                <label>Nombre Dueño</label> 
                <input
                    type="text"
                    name="owner"
                    className="u-full-width"
                    placeholder="Nombre Dueño de la Mascota"
                    onChange={handleChange}
                    value={owner}
                />
                <label>Fecha</label> 
                 <input
                    type="date"
                    name="date"
                    className="u-full-width"
                    onChange={handleChange}
                    value={date}
                 
                />
                 <label>Hora</label> 
                 <input
                    type="time"
                    name="time"
                    className="u-full-width"
                    onChange={handleChange}
                    value={time}
                 
                />
                <label>Síntomas</label> 
                <textarea
                    className="u-full-width"
                    name="symptoms"
                    onChange={handleChange}
                    value={symptoms}
                >                    
                </textarea>
                <button
                    type="submit"
                    className="u-full-width button-primary"
                >Agregar Cita</button>
            </form>
        </>
    );
}
 
export default Form;