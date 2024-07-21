"use client";
// app/dashboard/ticket-table.tsx

import { buildUrl } from '@/lib/utils';
import { Ticket } from '@/types';
import React, { useEffect, useState } from 'react';
import { DataTable } from './data-table';
import { columns } from './columns';

const TicketTable = () => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await fetch(buildUrl('ticket'), {
                    cache: 'no-cache'
                });

                const ticketsJson: Ticket[] = await response.json();
                console.log('Fetched tickets:', ticketsJson); // Log fetched data
                setTickets(ticketsJson);
            } catch (error) {
                setError('Failed to fetch tickets');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <div className="overflow-auto h-[calc(100vh-200px)] border rounded">
            <DataTable 
                columns={columns}
                data={tickets}
            />
        </div>
    );
}

export default TicketTable;