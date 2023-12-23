import React, { useState } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import PropTypes from 'prop-types'
import { propTypes } from 'react-bootstrap/esm/Image'

function SmallFormModal({ title, children, show, handleClose }) {
  // const [show, setShow] = useState(false)

  // const handleClose = () => setShow(false)
  // const handleShow = () => setShow(true)

  return (
    <div>
      <div className="text-end">
        {/* <Button
          variant="primary"
          onClick={() => {
            handleShow()
          }}
        >
          {title}
        </Button> */}
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
      </Modal>
    </div>
  )
}

SmallFormModal.propTypes = {
  title: PropTypes.string,
  children: PropTypes.array,
  show: PropTypes.bool,
  handleClose: PropTypes.func,
}

export default SmallFormModal
