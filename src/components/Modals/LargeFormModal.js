import React, { useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'

function LargeFormModal({ title, children, show, handleClose }) {
  return (
    <div>
      <Modal show={show} onHide={handleClose} className="modal-large-form">
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  )
}

LargeFormModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array,
  event: PropTypes.func,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
}

export default LargeFormModal
