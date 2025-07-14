import Container from '@/components/layout/Container/Container'
import PageTitle from '@/components/ui/PageTitle/PageTitle'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'

export default function ServicesPage() {
  return (
    <Container>
      <PageTitle title="Services" />
      <Grid container spacing={2}>
        <Grid size={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">All That Node</Typography>
              <Typography variant="body1">
                https://www.allthatnode.com/
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">Dune</Typography>
              <Typography variant="body1">https://dune.com/home</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
