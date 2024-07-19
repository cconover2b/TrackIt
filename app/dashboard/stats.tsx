'use client'
// app/dashboard/stats.tsx

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buildUrl } from '@/lib/utils';
import React, { useEffect, useState } from 'react';
import {
    MdFiberNew,
    MdOutlineDoneOutline, MdOutlineAssignmentTurnedIn, MdPersonAddDisabled
} from 'react-icons/md';

interface Stats {
    _id: { status: string };
    count: number;
}

const Stats = () => {
    const [stats, setStats] = useState<Stats[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await fetch(buildUrl('stats'), {
                    cache: 'no-cache'
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data: Stats[] = await response.json();
                setStats(data);
                setLoading(false);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('Unexpected error');
                }
                setLoading(false);
            }
        };

        fetchStats();
    }, []);

    const statsFor = (token: string) => {
        const filteredStats = stats.filter(stat => stat._id.status === token);
        return filteredStats.length > 0
            ? filteredStats.map(stat => stat.count).reduce((a, b) => a + b, 0)
            : 0;
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card className='bg-orange-300'>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        New Tickets
                    </CardTitle>
                    <div className="stat-figure text-white">
                        <MdFiberNew size="2em" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statsFor('new')}</div>
                </CardContent>
            </Card>

            <Card className="bg-green-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Completed
                    </CardTitle>
                    <div className="stat-figure text-white">
                        <MdOutlineDoneOutline size="2em" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statsFor('completed')}</div>
                </CardContent>
            </Card>

            <Card className="bg-purple-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Assigned
                    </CardTitle>
                    <div className="stat-figure text-white">
                        <MdOutlineAssignmentTurnedIn size="2em" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statsFor('assigned')}</div>
                </CardContent>
            </Card>

            <Card className="bg-red-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-lg font-medium">
                        Unassigned
                    </CardTitle>
                    <div className="stat-figure text-white">
                        <MdPersonAddDisabled size="2em" />
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="text-2xl font-bold">{statsFor('unassigned')}</div>
                </CardContent>
            </Card>
        </div>
    );
}

export default Stats;
