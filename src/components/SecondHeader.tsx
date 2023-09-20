import { Box, Link, useMediaQuery, useTheme, Typography } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import { Link as RouterLink } from 'react-router-dom'
import AdaptiveButton from './AdaptiveButton'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', backgroundColor: '#fff', marginTop: '70px', borderBottom: '10px solid #333' }}>
      <Box sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', p: 2 }}>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > :not(:last-child)': {
              mr: 2,
            },
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          ></Link>
          {isMobile ? null : (
            <>
              <Link component={RouterLink} to="/delivery" sx={{ color: '#333', textDecoration: 'none' }}>
                Shipping and payment
              </Link>
              <Link component={RouterLink} to="/return" sx={{ color: '#333', textDecoration: 'none' }}>
                Return
              </Link>
              <Link component={RouterLink} to="/contacts" sx={{ color: '#333', textDecoration: 'none' }}>
                Contacts
              </Link>
              <Link component={RouterLink} to="/catalog" sx={{ color: '#333', textDecoration: 'none' }}>
                Catalog
              </Link>
            </>
          )}
        </Box>
        <AdaptiveButton />
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <RouterLink to="/about" style={{ textDecoration: 'none', color: 'inherit', marginRight: '20px' }}>
            about us
          </RouterLink>
          <PhoneIcon sx={{ color: '#333', mr: 1 }} />
          <Typography variant="body2">+123 456 789</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
