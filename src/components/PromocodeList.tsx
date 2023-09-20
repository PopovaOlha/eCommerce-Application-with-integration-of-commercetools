import { Button, Grid, Tooltip } from '@mui/material'

const PromoCodeList: React.FC = () => {
  const promo = ['SAVE5', 'SAVE10', 'SAVE20']

  // Function to handle copying a promo code to the clipboard
  const copyToClipboard = (promoCode: string) => {
    navigator.clipboard.writeText(promoCode).then(() => {
      // Provide some feedback that the code was copied (you can customize this)
      alert(`Promo code "${promoCode}" copied to clipboard!`)
    })
  }

  return (
    <div style={{ width: '100%', borderTop: '6px solid #333' }}>
      <h3>Active promocodes:</h3>
      <Grid container spacing={2}>
        {promo.map((promoCode: string) => (
          <Grid item xs={12} sm={3} md={4} lg={4} key={promoCode}>
            <div
              style={{
                color: '#333',
                display: 'flex',
                margin: ' 10px auto',
                gap: '10px',
                justifyContent: 'center',

                alignItems: 'center',
              }}
            >
              <div
                style={{
                  fontWeight: 'bold',
                  fontSize: '15px',
                }}
              >
                {promoCode}
              </div>
              <Tooltip title="Copy Promo Code" arrow>
                <Button variant="outlined" size="small" onClick={() => copyToClipboard(promoCode)}>
                  Copy
                </Button>
              </Tooltip>
            </div>
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

export default PromoCodeList
