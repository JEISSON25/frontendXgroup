import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import { DocsExample, LargeFormModal } from 'src/components'
import { resources, api } from 'src/lib/sdk'
import { auth } from 'src/lib/constants'
import Button from 'react-bootstrap/Button'
import SalesForm from 'src/components/Sales/SalesForm'

const Sales = () => {
  const [listSales, setSales] = useState([])
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [objpayload, setObjpayload] = useState({})
  const [token, setToken] = useState()

  const handleShow = () => setShow(false)
  const handleShowEdit = () => setShowEdit(false)

  const getSales = async () => {
    const response = await api.get(`${resources.sales}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    setSales(response.data)
  }

  const handleSales = async (payload) => {
    try {
      const response = await api.post(`${resources.sales}`, payload, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      alert('Venta de producto agregado exitosamente')
      setTimeout(() => {
        setShow(false)
        getSales()
      }, 500)
    } catch (err) {
      alert('No se pudo registrar la venta del producto, comunícate con el administrador')
    }
  }

  const getToken = async () => {
    const token = localStorage.getItem('token')
    setToken(token)
  }

  useEffect(() => {
    getToken()
    getSales()
  }, [])

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Registro y gestión de ventas/productos</strong>
              <div className="text-end">
                <Button
                  variant="primary"
                  onClick={() => {
                    setShow(true)
                  }}
                >
                  Registrar Venta
                </Button>
              </div>
              {show ? (
                <LargeFormModal show={show} title="Nuevo venta de producto">
                  <SalesForm save={handleSales} showing={handleShow} />
                </LargeFormModal>
              ) : (
                ''
              )}
            </CCardHeader>
            <CCardBody>
              <DocsExample href="components/table">
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">Producto</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Cantidad</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Valor total</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Fecha</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listSales.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.products.name}</CTableDataCell>
                        <CTableDataCell>{item.amount}</CTableDataCell>
                        <CTableDataCell>{item.value}</CTableDataCell>
                        <CTableDataCell>{item.date}</CTableDataCell>
                      </CTableRow>
                    ))}
                  </CTableBody>
                </CTable>
              </DocsExample>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </div>
  )
}

export default Sales
