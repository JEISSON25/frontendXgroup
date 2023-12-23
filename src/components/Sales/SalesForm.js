import React, { useEffect, useState } from 'react'
import { resources, api } from 'src/lib/sdk'
import { auth } from 'src/lib/constants'
import PropTypes from 'prop-types'

const SalesForm = ({ save, showing }) => {
  const [payload, setPayload] = useState({})
  const [products, setProducts] = useState([])
  const [search, setSearch] = useState(true)

  const handleSave = () => {
    save(payload)
  }
  const handleShowing = () => {
    showing(false)
  }

  const getProducts = async () => {
    const response = await api.get(`${resources.products}?available=true`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    if (response.data.length > 0) {
      setProducts(response.data)
      setSearch(false)
    }
  }
  const handleValueProducto = async (cant) => {
    const response = await api.get(`${resources.products}${payload.products_id}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })

    setPayload({ ...payload, amount: cant, value: parseInt(cant * response.data.value) })
  }

  useEffect(() => {
    if (search) getProducts()
  })
  return (
    <>
      <div className="row">
        <div className="col-6">
          <label>Producto</label>

          <select
            onChange={(e) => setPayload({ ...payload, products_id: e.target.value })}
            className="form-control "
          >
            <option value=""> Seleccione</option>
            {products.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-6">
          <label>Cantidad</label>

          <input
            onChange={(e) => handleValueProducto(e.target.value)}
            className="form-control "
          ></input>
        </div>
        <div className="col-6">
          <label>Valor total</label>
          <input
            readOnly="readOnly"
            value={payload.value}
            onChange={(e) => setPayload({ ...payload, value: e.target.value })}
            className="form-control "
          ></input>
        </div>

        <div className="col-6">
          <label>Fecha de venta</label>
          <input
            type="date"
            onChange={(e) => setPayload({ ...payload, date: e.target.value })}
            className="form-control "
          ></input>
        </div>
      </div>
      <div className="row text-end">
        <div className="col-8">
          <button onClick={() => handleSave()} className="btn btn-primary">
            Registrar
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

SalesForm.propTypes = {
  save: PropTypes.func.isRequired,
  showing: PropTypes.func.isRequired,
}
export default SalesForm
