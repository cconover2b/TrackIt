// app/dashboard/stats.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { buildUrl } from '@/lib/utils';
import React from 'react';
import {
    MdFiberNew,
    MdOutlineDoneOutline, MdOutlineAssignmentTurnedIn, MdPersonAddDisabled
} from 'react-icons/md';

interface Stats {
    _id: { status: string };
    count: number;
}

async function Stats() {
    let json: Stats[] = [];

    try {
        // data from the backend fetch request
        const stats = await fetch(buildUrl('stats'), {
            cache: 'no-cache'
        });

        if (!stats.ok) {
            throw new Error('Network response was not ok');
        }

        json = await stats.json();
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching stats:', error.message);
        } else {
            console.error('Unexpected error:', error);
        }
    }

    const statsFor = (token: string) => {
        const filteredStats = json.filter(stats => stats._id.status === token);
        return filteredStats.length > 0
            ? filteredStats.map(stats => stats.count).reduce((a, b) => a + b, 0)
            : 0;
    };

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