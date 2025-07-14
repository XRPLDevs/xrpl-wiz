import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Grid from '@mui/material/Grid'
import Typography from '@mui/material/Typography'
import Container from '@/components/layout/Container/Container'
import PageTitle from '@/components/ui/PageTitle/PageTitle'

export default function DevToolsPage() {
  return (
    <Container>
      <PageTitle title="Dev Tools" />
      <Grid container spacing={2}>
        <Grid size={6}>
          <Card variant="outlined">
            <CardContent>
              <Typography variant="h6">xrpl.js</Typography>
              <Typography variant="body1">https://js.xrpl.org/</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}
