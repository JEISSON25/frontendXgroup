import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { api, resources } from '../../../lib/sdk'

const Login = () => {
  const [values, setValues] = useState({})

  const navigate = useNavigate()

  const Auth = async () => {
    if (values.username && values.password) {
      const response = await api.post(`${resources.auth}`, values)
      if (response.data.access) {
        localStorage.setItem('token', response.data.access)
        localStorage.setItem('auth', parseInt('1'))
        navigate('/dashboard')
      }
    } else {
      alert('Por favor introduzca su usuario y contraseña para ingresar')
    }
  }
  return (
    <div className="bg-light min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol md={8}>
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Autenticación</h1>
                    <p className="text-medium-emphasis">Ingresa con tus credenciales</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupText>
                        <CIcon icon={cilUser} />
                      </CInputGroupText>
                      <CFormInput
                        placeholder="Nombre de usuario"
                        autoComplete="username"
                        onChange={(e) => setValues({ ...values, username: e.target.value })}
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupText>
                        <CIcon icon={cilLockLocked} />
                      </CInputGroupText>
                      <CFormInput
                        type="password"
                        placeholder="Contraseña"
                        autoComplete="current-password"
                        onChange={(e) => setValues({ ...values, password: e.target.value })}
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs={6}>
                        <CButton color="success" onClick={(e) => Auth()} className="px-4">
                          Ingresar
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard className="text-white bg-dark py-5" style={{ width: '44%' }}>
                <CCardBody className="text-center">
                  <div>
                    <h2>Crear una cuenta</h2>
                    <p>Bienvenido al portal tecnodrone</p>
                    <Link to="/register">
                      <CButton color="success" className="mt-3" active tabIndex={-1}>
                        !Crear una cuenta ahora!
                      </CButton>
                    </Link>
                  </div>
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
