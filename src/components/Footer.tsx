import React from 'react'
import { Box, Typography, Link } from '@mui/material'
import RSSchoolLogo from '../images/rs_school_js.svg'
import FacebookIcon from '@mui/icons-material/Facebook'
import InstagramIcon from '@mui/icons-material/Instagram'
import GitHubIcon from '@mui/icons-material/GitHub'
import MailOutlineIcon from '@mui/icons-material/MailOutline'

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        color: '#333',
        textAlign: 'center',
        padding: '30px 0',
        boxShadow: '0px -4px 6px rgba(0, 0, 0, 0.1)',
        flexDirection: 'row',
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center',
        height: '30px',
        width: '100%',
        '@media (max-width: 600px)': {
          // Медиа-запрос для мобильных устройств
          flexDirection: 'column',
          padding: '10px',
          height: 'auto', // Высота адаптирована для мобильных устройств
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
      <div style={{ display: 'flex', gap: '10px' }}>
        <FacebookIcon />
        <InstagramIcon />
        <GitHubIcon />
        <MailOutlineIcon />
      </div>
    </Box>
  )
}

export default Footer
