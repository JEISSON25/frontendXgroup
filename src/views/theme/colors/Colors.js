import PropTypes from 'prop-types'
import React, { useState, useEffect, createRef } from 'react'
import classNames from 'classnames'
import { CRow, CCol, CCard, CCardHeader, CCardBody } from '@coreui/react'
import { rgbToHex } from '@coreui/utils'
import { DocsLink } from 'src/components'
import Switch from 'react-switch'

const ThemeView = () => {
  const [color, setColor] = useState('rgb(255, 255, 255)')
  const ref = createRef()

  useEffect(() => {
    const el = ref.current.parentNode.firstChild
    const varColor = window.getComputedStyle(el).getPropertyValue('background-color')
    setColor(varColor)
  }, [ref])

  return (
    <table className="table w-100" ref={ref}>
      <tbody>
        <tr>
          <td className="text-medium-emphasis">HEX:</td>
          <td className="font-weight-bold">{rgbToHex(color)}</td>
        </tr>
        <tr>
          <td className="text-medium-emphasis">RGB:</td>
          <td className="font-weight-bold">{color}</td>
        </tr>
      </tbody>
    </table>
  )
}

const ThemeColor = ({ className, children }) => {
  const classes = classNames(className, 'theme-color w-75 rounded mb-3')
  return (
    <CCol xs={12} sm={6} md={4} xl={2} className="mb-4">
      <div className={classes} style={{ paddingTop: '75%' }}></div>
      {children}
      <ThemeView />
    </CCol>
  )
}

ThemeColor.propTypes = {
  children: PropTypes.node,
  className: PropTypes.string,
}

const Colors = () => {
  const [data, setData] = useState([
    {
      nombre: 'John',
      apellido: 'Doe',
      licencia: '12345',
      ciudad: 'New York',
      marcaDron: 'DJI',
      modelo: 'Phantom 4',
      ciudadDrone: 'Cali',
      tipoRol: 'Operador',
    },
    {
      nombre: 'Jane',
      apellido: 'Smith',
      licencia: '67890',
      ciudad: 'Los Angeles',
      marcaDron: 'Parrot',
      modelo: 'Anafi',
      ciudadDrone: 'Medellin',
      tipoRol: 'Supervisor',
    },
  ])

  const cambiarRol = (index) => {
    const newData = [...data]
    newData[index].tipoRol = newData[index].tipoRol === 'Operador' ? 'Supervisor' : 'Operador'
    setData(newData)
  }

  return (
    <CCard className="mb-4">
      <CCardHeader>
        <strong>Usuario</strong>
      </CCardHeader>
      <CCardBody>
        <div className="table-responsive">
          <table className="table">
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Licencia</th>
                <th>Ciudad de Operación</th>
                <th>Marca de Dron</th>
                <th>Modelo</th>
                <th>Ciudad del drone</th>
                <th>Tipo de Rol</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{item.nombre}</td>
                  <td>{item.apellido}</td>
                  <td>{item.licencia}</td>
                  <td>{item.ciudad}</td>
                  <td>{item.marcaDron}</td>
                  <td>{item.modelo}</td>
                  <td>{item.ciudadDrone}</td>
                  <td>
                    <Switch
                      onChange={() => cambiarRol(index)}
                      checked={item.tipoRol === 'Supervisor'}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CCardBody>
    </CCard>
  )
}

export default Colors
