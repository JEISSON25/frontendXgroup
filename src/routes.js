import React from 'react'

const Dashboard = React.lazy(() => import('./views/pages/Dashboard'))
const TypeAccount = React.lazy(() => import('./views/pages/globals/TypeAccount'))
const Products = React.lazy(() => import('./views/pages/Products'))
const Sales = React.lazy(() => import('./views/pages/Sales'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/typeaccount', name: 'Type Account', element: TypeAccount },
  { path: '/products', name: 'Type Account', element: Products },
  { path: '/sales', name: 'Type Account', element: Sales },
]

export default routes
