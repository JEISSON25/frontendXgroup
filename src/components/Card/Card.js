import React from 'react'
import '../../style/card.css' // Puedes crear este archivo CSS para darle estilo a la tarjeta
import PropTypes from 'prop-types'
const Card = ({ title, description }) => {
  return (
    <div className="card">
      <div className="card-content">
        <h2 className="card-title">{title}</h2>
        <p className="card-description">{description}</p>
      </div>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}
export default Card
