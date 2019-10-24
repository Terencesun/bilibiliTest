// @ts-ignore
import {Injectable} from '@nestjs/common';
import {InjectModel, InjectConnection} from '@nestjs/mongoose';
import {Model, Connection} from 'mongoose';
import {info, birthday, level, sex} from './app.pipeline';

@Injectable()
export class AppService {

    constructor(
        @InjectConnection() private readonly mainConnection: Connection,
    ) {
    }

    async info() {
        const code = {
            OK: 10,
        };
        const res = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').aggregate(info).toArray();
        return {
            code: code.OK,
            msg: {
                sample: res[0].sample,
                date: new Date().getTime(),
            }
        }
    }

    async birthday() {
        const code = {
            OK: 10,
        };
        const dict = {
            1: '第一季度',
            2: '第二季度',
            3: '第三季度',
            4: '第四季度',
        };
        const countRes = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').countDocuments();
        // 生成pipeline
        let prefix = 'ph';
        let size = 130000;
        let facetObj: any = {};
        let concatArrays: any = [];
        let ceilNum = Math.ceil(countRes / size);
        for (let i = 1; i <= ceilNum; i++) {
            concatArrays.push(`$${prefix}${i}`);
            if (i !== ceilNum) {
                facetObj[`${prefix}${i}`] = [
                    {
                        $match: {
                            $expr: {
                                $ne: ['$birthday', '01-01'],
                            },
                        },
                    },
                    {$skip: (i - 1) * size},
                    {$limit: size},
                    {
                        $project: {
                            mid: '$mid',
                            birthday: {
                                $cond: [
                                    {$eq: ['$birthday', '']},
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
                                $concat: ['$birthday', '-', '2000']
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
                                        {case: {$in: ['$month', [1, 2, 3]]}, then: 1},
                                        {case: {$in: ['$month', [4, 5, 6]]}, then: 2},
                                        {case: {$in: ['$month', [7, 8, 9]]}, then: 3},
                                        {case: {$in: ['$month', [10, 11, 12]]}, then: 4},
                                    ],
                                },
                            },
                        },
                    },
                    {
                        $group: {
                            _id: `$quarter`,
                            count: { $sum: 1 },
                        },
                    },
                ];
            } else {
                facetObj[`${prefix}${i}`] = [
                    {
                        $match: {
                            $expr: {
                                $ne: ['$birthday', '01-01'],
                            },
                        },
                    },
                    {$skip: (i - 1) * size},
                    {
                        $project: {
                            mid: '$mid',
                            birthday: {
                                $cond: [
                                    {$eq: ['$birthday', '']},
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
                                $concat: ['$birthday', '-', '2000']
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
                                        {case: {$in: ['$month', [1, 2, 3]]}, then: 1},
                                        {case: {$in: ['$month', [4, 5, 6]]}, then: 2},
                                        {case: {$in: ['$month', [7, 8, 9]]}, then: 3},
                                        {case: {$in: ['$month', [10, 11, 12]]}, then: 4},
                                    ],
                                },
                            },
                        },
                    },
                    {
                        $group: {
                            _id: `$quarter`,
                            count: { $sum: 1 },
                        },
                    },
                ];
            }
        }
        birthday[0].$facet = facetObj;
        birthday[1].$project.items.$concatArrays = concatArrays;
        const res = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').aggregate(birthday).toArray();
        let data = [];
        for (let key = 1; key <= 4; key++) {
          for (let item of res) {
            if (item._id === key) {
              item.quarter = dict[key];
              data.push(item);
            }
          }
        }
        return {
          code: code.OK,
          msg: data,
        };
    }

    async sex() {
        const code = {
            OK: 10,
        };
        const countRes = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').countDocuments();
        // 生成pipeline
        let prefix = 'ph';
        let size = 1000000;
        let facetObj: any = {};
        let concatArrays: any = [];
        let ceilNum = Math.ceil(countRes / size)
        for (let i = 1; i <= ceilNum; i++) {
            concatArrays.push(`$${prefix}${i}`);
            if (i !== ceilNum) {
                facetObj[`${prefix}${i}`] = [
                    {$skip: (i - 1) * size},
                    {$limit: size},
                    {
                        $group: {
                            _id: '$sex',
                            count: {$sum: 1},
                        },
                    }
                ];
            } else {
                facetObj[`${prefix}${i}`] = [
                    {$skip: (i - 1) * size},
                    {
                        $group: {
                            _id: '$sex',
                            count: {$sum: 1},
                        },
                    }
                ];
            }
        }
        sex[0].$facet = facetObj;
        sex[1].$project.items.$concatArrays = concatArrays;
        sex[4].$addFields.total = countRes;
        const res = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').aggregate(sex).toArray();
        for (let item of res) {
            item.percent = parseFloat(item.percent.toFixed(2));
            delete item._id;
        }
        return {
            code: code.OK,
            msg: res
        };
    }

    async level() {
        const code = {
            OK: 10,
        };
        const res = await this.mainConnection.useDb('bilibili').collection('SpaceInfo').aggregate(level).toArray();
        let data = [];
        for (let key = 0; key <= 6; key++) {
            for (let item of res) {
                if (item.title === key) {
                    item.score = parseFloat(item.score.toFixed(2));
                    data.push(item);
                }
            }
        }
        return {
            code: code.OK,
            msg: data
        };
    }
}
