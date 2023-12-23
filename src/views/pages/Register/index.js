import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CRow,
} from '@coreui/react'
import { api, resources } from '../../../lib/sdk'

const Register = () => {
  const [values, setValues] = useState({})

  const navigate = useNavigate()

  const Register = async () => {
    console.log(values)
    const payload = {
      ...values,
      type_account: 2,
    }
    if (values.username && values.first_name && values.password) {
      const response = await api.post(`${resources.register}`, payload)

      if (response.data.username !== '') {
        navigate('/login')
      }
    } else {
      navigate('/login')
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={9} lg={7} xl={6}>
            <CCard className="mx-4">
              <CCardBody className="p-4">
                <CForm>
                  <h1>Registrase</h1>
                  <CInputGroup className="mb-3">
                    <CInputGroup className="mb-2">
                      <CFormInput
                        type="text"
                        placeholder="Nombre de usuario"
                        onChange={(e) => setValues({ ...values, username: e.target.value })}
                      />
                    </CInputGroup>

                    <CFormInput
                      placeholder="Nombre"
                      onChange={(e) => setValues({ ...values, first_name: e.target.value })}
                    />
                  </CInputGroup>

                  <CInputGroup className="mb-2">
                    <CFormInput
                      placeholder="Apellidos"
                      onChange={(e) => setValues({ ...values, last_name: e.target.value })}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-3">
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      onChange={(e) => setValues({ ...values, password: e.target.value })}
                    />
                  </CInputGroup>

                  <div className="d-grid">
                    <CButton color="success" onClick={(e) => Register()}>
                      Crear cuenta
                    </CButton>
                  </div>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Register
