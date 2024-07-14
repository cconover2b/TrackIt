// app/dashboard/page.tsx

import React from 'react'
import Stats from './stats'
import TicketTable from './ticket-table'
import NewTicketButton from './new-ticket-button.tsx'

function DashboardPage() {
  return (
    <div>
        <div className="flex justify-between items-center mb-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <NewTicketButton />
        </div>
        <Stats />
        <TicketTable />
    </div>
  )
}

export default DashboardPage