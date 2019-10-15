export const info = [
    {
        $count: 'sample'
    },
];

export const birthday = [
    {
        $project: {
            mid: '$mid',
            birthday: {
                $cond: [
                    { $eq: [ '$birthday', '' ] },
                    '01-01',
                    '$birthday'
                ],
            },
        },
    },
    {
        $match: {
            $expr: {
                $ne: ['$birthday', '01-01'],
            },
        },
    },
    {
        $project: {
            birthday: {
                $concat: [ '$birthday', '-', '2000' ]
            }
        }
    },
    {
        $project: {
            birthday: {
                $dateFromString: {
                    dateString: '$birthday',
                    format: "%m-%d-%Y"
                }
            }
        }
    },
    {
        $project: {
            month: {
                $month: {
                    date: '$birthday'
                }
            },
        }
    },
    {
        $project: {
            month: '$month',
            quarter: {
                $switch: {
                    branches: [
                        { case: { $in: [ '$month', [1, 2, 3] ] }, then: 1 },
                        { case: { $in: [ '$month', [4, 5, 6] ] }, then: 2 },
                        { case: { $in: [ '$month', [7, 8, 9] ] }, then: 3 },
                        { case: { $in: [ '$month', [10, 11, 12] ] }, then: 4 },
                    ],
                },
            },
        },
    },
    {
        $group: {
            _id: '$quarter',
            count: { $sum: 1 },
        },
    },
];

export const sex = [
    {
        $facet: {
            total: [
                {$count: 'total'},
            ],
            info: [
                {
                    $group: {
                        _id: '$sex',
                        count: { $sum: 1 },
                    },
                },
            ],
        },
    },
    { $unwind: '$total' },
    { $unwind: '$info' },
    {
        $project: {
            title: '$info._id',
            percent: { $divide: ['$info.count', '$total.total'] },
        },
    },
];

export const level = [
    {
        $facet: {
            total: [
                {$count: 'total'},
            ],
            info: [
                {
                    $group: {
                        _id: '$level',
                        count: { $sum: 1 },
                    },
                },
            ],
        },
    },
    { $unwind: '$total' },
    { $unwind: '$info' },
    {
        $project: {
            title: '$info._id',
            score: { $divide: ['$info.count', '$total.total'] },
        },
    },
    {
        $project: {
            title: '$title',
            score: { $multiply: ['$score', 100] },
        },
    },
];