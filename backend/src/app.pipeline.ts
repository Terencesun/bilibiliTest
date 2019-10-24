export const info = [
    {
        $count: 'sample'
    },
];

export const birthday = [
    {
        $facet: {},
    },
    {
        $project: {
            items: {
                $concatArrays: []
            }
        },
    },
    {$unwind: '$items'},
    {
        $project: {
            _id: '$items._id',
            count: '$items.count',
        },
    },
    {
        $group: {
            _id: '$_id',
            count: { $sum: '$count' },
        },
    },
];

export const sex = [
    {
        $facet: {},
    },
    {
        $project: {
            items: {
                $concatArrays: []
            }
        },
    },
    {$unwind: '$items'},
    {
        $project: {
            _id: '$items._id',
            count: '$items.count',
        }
    },
    {
        $addFields: {
            total: null,
        },
    },
    {
        $group: {
            _id: '$_id',
            count: {$sum: '$count'},
            total: {$first: '$total'},
        },
    },
    {
        $project: {
            title: '$_id',
            percent: {$divide: ['$count', '$total']},
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
                        count: {$sum: 1},
                    },
                },
            ],
        },
    },
    {$unwind: '$total'},
    {$unwind: '$info'},
    {
        $project: {
            title: '$info._id',
            score: {$divide: ['$info.count', '$total.total']},
        },
    },
    {
        $project: {
            title: '$title',
            score: {$multiply: ['$score', 100]},
        },
    },
];