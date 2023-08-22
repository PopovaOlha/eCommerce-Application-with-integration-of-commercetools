import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import RSSchoolLogo from '../images/rs_school_js.svg'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      sx={{
        width: '100%',
        position: 'absolute',
        left: '0',
        bottom: '0',
        backgroundColor: '#fff',
        color: '#333',
        textAlign: 'center',
        padding: '10px 0',
        boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        '@media (max-width: 600px)': {
          flexDirection: 'column',
          padding: '10px',
        },
      }}
    >
      <Link href="https://rs.school/react/" target="_blank" rel="noopener noreferrer">
        <img src={RSSchoolLogo} alt="RSSchool Logo" style={{ width: '100px' }} />
      </Link>
      <Box>
        <Typography variant="body2" component="p" sx={{ marginBottom: '7px' }}>
          © {currentYear} Your Website. All Rights Reserved.
        </Typography>
        <Typography variant="body2" component="p">
          Built with ❤️ by eCommerce-Application team
        </Typography>
      </Box>
    </Box>
  )
}

export default Footer
