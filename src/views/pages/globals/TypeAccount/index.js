import React, { useState, useEffect } from 'react'
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
import { DocsExample, SmallFormModal } from 'src/components'
import { resources, api } from 'src/lib/sdk'
import { auth } from 'src/lib/constants'
import Button from 'react-bootstrap/Button'
import Alert from 'react-bootstrap/Alert'

const TypeAccount = () => {
  const [payload, setPayload] = useState({})
  const [listTypeAccoount, setTypeAccount] = useState([])
  const [show, setShow] = useState(false)
  const [showAlert, setShowAlert] = useState(0)

  const handleShow = () => setShow(true)

  const getAccoount = async () => {
    const response = await api.get(`${resources.typeaccount}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
    setTypeAccount(response.data)
  }

  const handleTypeAccount = async () => {
    try {
      const response = await api.post(`${resources.typeaccount}`, payload, {
        headers: {
          Authorization: `Bearer ${auth.token}`,
        },
      })
      setShowAlert({ style: 'success', message: 'Tipo de cuenta agregado exitosamente' })
      setTimeout(() => {
        setShow(false)
        getAccoount()
        setShowAlert(0)
      }, 3000)
    } catch {
      setShowAlert({
        style: 'error',
        message: 'No se pudo agregar el tipo de cuenta, comunicarte con el administrador',
      })
    }
  }

  useEffect(() => {
    getAccoount()
  }, [])

  return (
    <div>
      <CRow>
        <CCol xs={12}>
          <CCard className="mb-4">
            <CCardHeader>
              <strong>Tipo de cuenta</strong>
              <div className="text-end">
                <Button
                  variant="primary"
                  onClick={() => {
                    handleShow()
                  }}
                >
                  Agregar tipo de cuenta
                </Button>
              </div>
              {show ? (
                <SmallFormModal show={show} title="Agregar tipo">
                  <label>Nombre</label>
                  <input
                    onChange={(e) => setPayload({ name: e.target.value })}
                    className="form-control"
                  ></input>
                  {showAlert !== 0 ? (
                    <Alert variant={showAlert.style}>{showAlert.message}</Alert>
                  ) : (
                    ''
                  )}
                  <div className="row text-end">
                    <div className="col-10">
                      <button onClick={() => handleTypeAccount()} className="btn btn-primary">
                        Agregar
                      </button>
                    </div>
                    <div className="col-2">
                      <button onClick={() => setShow(false)} className="btn btn-primary">
                        Cerrar
                      </button>
                    </div>
                  </div>
                </SmallFormModal>
              ) : (
                ''
              )}
            </CCardHeader>
            <CCardBody>
              <DocsExample href="components/table">
                <CTable>
                  <CTableHead>
                    <CTableRow>
                      <CTableHeaderCell scope="col">#</CTableHeaderCell>
                      <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
                    </CTableRow>
                  </CTableHead>
                  <CTableBody>
                    {listTypeAccoount.map((item, index) => (
                      <CTableRow key={index}>
                        <CTableHeaderCell scope="row">{item.id}</CTableHeaderCell>
                        <CTableDataCell>{item.name}</CTableDataCell>
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

export default TypeAccount
