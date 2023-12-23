import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'

const ProductsForm = ({ save, showing }) => {
  const [payload, setPayload] = useState({})

  const handleSave = () => {
    save(payload)
  }
  const handleShowing = () => {
    showing(false)
  }

  return (
    <>
      <div className="row">
        <div className="col-6">
          <label>Nombre</label>
          <input
            onChange={(e) => setPayload({ ...payload, name: e.target.value })}
            className="form-control "
          ></input>
        </div>
        <div className="col-6">
          <label>Costo</label>
          <input
            onChange={(e) => setPayload({ ...payload, value: e.target.value })}
            className="form-control "
          ></input>
        </div>
        <div className="col-6">
          <label>Cantidad</label>
          <input
            onChange={(e) => setPayload({ ...payload, amount: e.target.value })}
            className="form-control "
          ></input>
        </div>
        <div className="col-6">
          <label>Disponible</label>
          <select
            onChange={(e) => setPayload({ ...payload, available: e.target.value })}
            className="form-control "
          >
            <option value="true">Si</option>
            <option value="false">No</option>
          </select>
        </div>
      </div>
      <div className="row text-end">
        <div className="col-8">
          <button onClick={() => handleSave()} className="btn btn-primary">
            Agregar
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

ProductsForm.propTypes = {
  save: PropTypes.func.isRequired,
  showing: PropTypes.func.isRequired,
}
export default ProductsForm
