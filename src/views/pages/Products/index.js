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
import ProductsForm from 'src/components/Products/ProductsForm'
import EditProductsForm from 'src/components/Products/EditProductsForm'

const Products = () => {
  const [listProducts, setProducts] = useState([])
  const [show, setShow] = useState(false)
  const [showEdit, setShowEdit] = useState(false)
  const [objpayload, setObjpayload] = useState({})
  const [token, setToken] = useState()

  const handleShow = () => setShow(false)
  const handleShowEdit = () => setShowEdit(false)

  const getProducts = async () => {
    const response = await api.get(`${resources.products}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    setProducts(response.data)
  }

  const handleProducts = async (payload) => {
    try {
      const response = await api.post(`${resources.products}`, payload, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      alert('Producto agregado exitosamente')
      setTimeout(() => {
        setShow(false)
        getProducts()
      }, 500)
    } catch (err) {
      alert('No se pudo agregar el producto, comunícate con el administrador')
    }
  }

  const handleEdit = (id, name, amount, value, available) => {
    setShowEdit(true)
    setObjpayload({
      id: id,
      name: name,
      amount: amount,
      value: value,
      available: available,
    })
  }

  const updateProducts = async (id, payload) => {
    try {
      const response = await api.put(`${resources.products}${id}/`, payload, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      alert('Producto Actualizado exitosamente')
      setTimeout(() => {
        setShowEdit(false)
        getProducts()
      }, 500)
    } catch (err) {
      alert('No se pudo actualizar el producto, comunícate con el administrador')
    }
  }

  const deleteProducts = async (id, payload) => {
    try {
      const response = await api.delete(`${resources.products}${id}/`, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      alert('Producto Eliminado exitosamente')
      setTimeout(() => {
        setShowEdit(false)
        getProducts()
      }, 500)
    } catch (err) {
      alert('No se pudo eliminar el producto, comunícate con el administrador')
    }
  }
  const getToken = async () => {
    const token = localStorage.getItem('token')
    setToken(token)
  }

  useEffect(() => {
    getToken()
    getProducts()
  }, [])

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Registro y gestión de productos</strong>
              <div className="text-end">
                <Button
                  variant="primary"
                  onClick={() => {
                    setShow(true)
                  }}
                >
                  Registrar Producto
                </Button>
              </div>
              {show ? (
                <LargeFormModal show={show} title="Nuevo producto">
                  <ProductsForm save={handleProducts} showing={handleShow} />
                </LargeFormModal>
              ) : (
                ''
              )}

              {showEdit ? (
                <LargeFormModal show={showEdit} title="Editar producto">
                  <EditProductsForm
                    update={updateProducts}
                    delet={deleteProducts}
                    showing={handleShowEdit}
                    payload={objpayload}
                  />
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
                      <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Cantidad</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Costo</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Disponible?</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Accion</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listProducts.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableDataCell>{item.name}</CTableDataCell>
                        <CTableDataCell>{item.amount}</CTableDataCell>
                        <CTableDataCell>{item.value}</CTableDataCell>
                        <CTableDataCell>{item.available ? 'Si' : 'No'}</CTableDataCell>
                        <CTableDataCell>
                          <Button
                            onClick={() =>
                              handleEdit(
                                item.id,
                                item.name,
                                item.amount,
                                item.value,
                                item.available,
                              )
                            }
                          >
                            Editar
                          </Button>
                        </CTableDataCell>
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

export default Products
