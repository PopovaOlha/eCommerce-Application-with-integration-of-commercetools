import React from 'react'
import { Modal, Box, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'

interface ImageModalProps {
  isOpen: boolean
  onClose: () => void
  imageUrl: string
}

const ImageModal: React.FC<ImageModalProps> = ({ isOpen, onClose, imageUrl }) => {
  return (
    <Modal open={isOpen} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'white',
          boxShadow: 24,
          padding: 2,
          borderRadius: 8,
          outline: 'none',
          textAlign: 'center',
        }}
      >
        <img src={imageUrl} alt="Enlarged Product Image" style={{ maxWidth: '100%', maxHeight: '80vh' }} />
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 0,
            right: 0,
          }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    </Modal>
  )
}

export default ImageModal
