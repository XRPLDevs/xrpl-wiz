import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@/components/layout/Container/Container'
import PageTitle from '@/components/ui/PageTitle/PageTitle'
import DocsLinksPanel from '@/components/ui/DocsLinksPanel/DocsLinksPanel'
import FormTrustSet from './_components/FormTrustSet'

const links = [
  {
    title: 'XRP LEDGER DOCS - Trust Set',
    href: 'https://xrpl.org/docs/references/protocol/transactions/types/trustset'
  },
  {
    title: 'XRP LEDGER DOCS - TrustSet Flags',
    href: 'https://xrpl.org/docs/references/protocol/transactions/types/trustset#trustset-flags'
  },
  {
    title: 'XRP LEDGER DOCS - Currency Codes',
    href: 'https://xrpl.org/docs/references/protocol/data-types/currency-formats#currency-codes'
  }
]

const description = 'Create or modify a trust line linking two accounts.'

export default function TrustSetPage() {
  return (
    <Container maxWidth="sm">
      <PageTitle title="Trust Set" />
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Description
        </Typography>
        <Typography variant="body1">{description}</Typography>
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Links
        </Typography>
        <DocsLinksPanel links={links} />
      </Box>
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" sx={{ mb: 1 }}>
          Form
        </Typography>
        <FormTrustSet />
      </Box>
    </Container>
  )
}
