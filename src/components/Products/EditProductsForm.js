import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const EditProductsForm = ({ update, showing, payload, delet }) => {
  const [payloadS, setPayloadS] = useState({})

  const handleUpdate = () => {
    update(payload.id, payloadS)
  }
  const handleDelete = () => {
    delet(payload.id)
  }
  const handleShowing = () => {
    showing(false)
  }
  useEffect(() => {
    setPayloadS(payload)
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-6">
          <label>Nombre</label>
          <input
            value={payloadS.name}
            onChange={(e) => setPayloadS({ ...payloadS, name: e.target.value })}
            className="form-control "
          ></input>
        </div>
        <div className="col-6">
          <label>Costo</label>
          <input
            value={payloadS.value}
            onChange={(e) => setPayloadS({ ...payloadS, value: e.target.value })}
            className="form-control "
          ></input>
        </div>
        <div className="col-6">
          <label>Cantidad</label>
          <input
            value={payloadS.amount}
            onChange={(e) => setPayloadS({ ...payloadS, amount: e.target.value })}
            className="form-control "
          ></input>
        </div>
        <div className="col-6">
          <label>Disponible</label>
          <select
            value={payloadS.available}
            onChange={(e) => setPayloadS({ ...payloadS, available: e.target.value })}
            className="form-control "
          >
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div className="row text-end">
        <div className="col-6">
          <button onClick={() => handleUpdate()} className="btn btn-primary">
            Actualizar
          </button>
        </div>
        <div className="col-2">
          <button onClick={() => handleDelete()} className="btn btn-danger">
            Eliminar
          </button>
        </div>
        <div className="col-2">
          <button onClick={() => handleShowing()} className="btn btn-primary">
            Cerrar
          </button>
        </div>
      </div>
    </>
  )
}

EditProductsForm.propTypes = {
  update: PropTypes.func.isRequired,
  showing: PropTypes.func.isRequired,
  delet: PropTypes.func.isRequired,
  payload: PropTypes.object.isRequired,
}
export default EditProductsForm
