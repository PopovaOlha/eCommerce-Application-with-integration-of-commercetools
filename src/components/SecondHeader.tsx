import { Box, Link, useMediaQuery, useTheme, Typography } from '@mui/material'
import PhoneIcon from '@mui/icons-material/Phone'
import { Link as RouterLink } from 'react-router-dom'
import AdaptiveButton from './AdaptiveButton'

const Header = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <Box sx={{ width: '100%', backgroundColor: '#fff', marginTop: '10px', borderBottom: '10px solid #333' }}>
      <Box sx={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', padding: '20px' }}>
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
          <PhoneIcon sx={{ color: '#333', mr: 1 }} />
          <Typography variant="body2">+123 456 789</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Header
