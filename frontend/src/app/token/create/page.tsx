'use client'

import { useState } from 'react'
import Tab from '@mui/material/Tab'
import Tabs from '@mui/material/Tabs'
import Typography from '@mui/material/Typography'
import Container from '@/components/layout/Container/Container'
import PageTitle from '@/components/ui/PageTitle/PageTitle'
import TabSetTrustline from '@/app/token/create/_components/TabSetTrustline'
import TabTransferToken from '@/app/token/create/_components/TabTransferToken'

const tabs = {
  setTrustline: {
    label: 'Set Trustline',
    value: 0
  },
  transferToken: {
    label: 'Transfer Token',
    value: 1
  }
}

export default function CreateToken() {
  const [tab, setTab] = useState(0)

  return (
    <Container maxWidth="xs">
      <PageTitle title="Token creation" />
      <Typography variant="body1" component="div" sx={{ mb: 2 }}>
        Create a new token on the XRP Ledger.
      </Typography>
      <Tabs value={tab} onChange={(_, value) => setTab(value)}>
        <Tab label={tabs.setTrustline.label} />
        <Tab label={tabs.transferToken.label} />
      </Tabs>
      {tab === tabs.setTrustline.value && <TabSetTrustline />}
      {tab === tabs.transferToken.value && <TabTransferToken />}
    </Container>
  )
}
