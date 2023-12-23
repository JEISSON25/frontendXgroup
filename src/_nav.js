import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilCursor, cilPuzzle, cilSpeedometer } from '@coreui/icons'
import { CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/dashboard',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Productos',
  },
  {
    component: CNavItem,
    name: 'Registro',
    to: '/products',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Ventas',
    to: '/sales',
    icon: <CIcon icon={cilPuzzle} customClassName="nav-icon" />,
  },
  {
    component: CNavTitle,
    name: 'Globales',
  },
  {
    component: CNavItem,
    name: 'Tipo de cuenta',
    to: 'typeaccount',
    icon: <CIcon icon={cilCursor} customClassName="nav-icon" />,
  },
]

export default _nav
