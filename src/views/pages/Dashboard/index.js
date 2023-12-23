import React, { useEffect, useRef, useState } from 'react'
import Card from 'src/components/Card/Card'
import { resources, api } from 'src/lib/sdk'
import { auth } from 'src/lib/constants'

const Dashboard = () => {
  const [products, setProducts] = useState([])
  const [payload, setPayload] = useState({})
  const [sales, setSales] = useState({})

  const getProduct = async () => {
    const res = await api.get(`${resources.products}`)
    if (res.data.length > 0) {
      setProducts(res.data)
    }
  }
  const getSales = async () => {
    const response = await api.get(
      `${resources.salesProducts}?products=${payload.products}&date_range_after=${payload.date_start}&date_range_before=${payload.date_end}`,
      {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      },
    )
    if (response.data.length > 0) {
      let vTotal = 0
      let canTotal = 0
      let exist = ''
      response.data.map((item, index) => {
        console.log('Entro acá')
        canTotal = parseInt(item.amount + canTotal)
        vTotal = parseInt(item.value + vTotal)
        exist = item.products.amount
      })
      setSales({ ...sales, canSales: canTotal, vSales: vTotal, exist: exist })
    } else {
      setSales({ ...sales, canSales: 0, vSales: 0, exist: 0 })
    }
  }
  useEffect(() => {
    getProduct()
  }, [])

  return (
    <>
      <div className="row">
        <div className="col-4">
          <select
            onChange={(e) => setPayload({ ...payload, products: e.target.value })}
            className="form-control "
          >
            <option value=""> Seleccione Producto</option>
            {products.map((item, index) => (
              <option key={item.id} value={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
        <div className="col-3">
          <input
            type="date"
            onChange={(e) => setPayload({ ...payload, date_start: e.target.value })}
            className="form-control "
          ></input>
        </div>
        <div className="col-3">
          <input
            type="date"
            onChange={(e) => setPayload({ ...payload, date_end: e.target.value })}
            className="form-control "
          ></input>
        </div>
        <div className="col-2">
          <button className="btn btn-primary" onClick={() => getSales()}>
            Buscar
          </button>
        </div>
      </div>
      <div className="row">
        <div className="col-4">
          <Card title="Costo en ventas" description={sales.vSales} />
        </div>
        <div className="col-4">
          <Card title="Cantidad en ventas" description={sales.canSales} />
        </div>
        <div className="col-4">
          <Card title="Existencias actual" description={sales.exist} />
        </div>
      </div>
    </>
  )
}

export default Dashboard
