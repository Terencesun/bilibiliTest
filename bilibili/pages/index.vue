<template>
  <div class="container">
    <div class="content">
      <div class="line">
        <div class="birthday">
          <div class="title">B站用户生日分布</div>
          <div class="chart">
            <div id="birthday"></div>
          </div>
        </div>
        <div class="sex">
          <div class="title">B站用户性别分布</div>
          <div class="chart">
            <div id="sex"></div>
          </div>
        </div>
      </div>
      <div class="level">
        <div class="title">B站用户等级分布</div>
        <div class="level-chart">
          <div class="circle-wrap" v-for="(item, key) of levelData">
            <div class="level-title">Level {{ key }}</div>
            <div class="level-score" :id="`level_${key}`">{{ item.score }}</div>
            <span>%</span>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>有效样本数据：{{ info.sample }}，截止日期：{{ info.date | date_filter }}</div>
      <div>Author: Terence.Sun 禁止商业使用</div>
    </div>
  </div>
</template>

<script>
    import {brithdayUrl, sexUrl, levelUrl, apiUrl} from "./../api";
    import G2 from '@antv/g2';
    import {CountUp} from 'countup.js';

    export default {
        data() {
            return {
                levelData: [
                    {score: 0},
                    {score: 0},
                    {score: 0},
                    {score: 0},
                    {score: 0},
                    {score: 0},
                    {score: 0},
                ],
                counter: [],
                render: [],
                info: {
                    sample: 0,
                    date: null,
                },
            }
        },
        filters: {
            date_filter(val) {
                const date = new Date(val);
                return `${date}`
            }
        },
        methods: {
            init_count() {
                for (let count = 0; count < this.levelData.length; count++) {
                    this.counter.push(new CountUp(`level_${count+1}`, this.levelData[count].score, {
                        useGrouping: false,
                    }));
                }
            },
            init_info() {
                return new Promise((resolve, reject) => {
                    this.$axios.get(apiUrl).then(res => {
                        this.info = res.data.msg;
                        resolve('ok');
                    }).catch(e => {
                        console.log(e);
                        reject();
                    });
                });
            },
            birthday_chart() {
                return new Promise((resolve, reject) => {
                    this.$axios.get(brithdayUrl).then(res => {
                        const chart = new G2.Chart({
                            container: 'birthday',
                            forceFit: true,
                            height: 400,
                        });
                        const data = res.data.msg;
                        chart.source(data);
                        chart.axis('quarter', {
                            label: {
                                textStyle: {
                                    fill: "#fff",
                                }
                            }
                        });
                        chart.axis('count', {
                            label: {
                                textStyle: {
                                    fill: "#fff",
                                }
                            }
                        });
                        chart.legend(false);
                        chart.interval().position('quarter*count').color('quarter');
                        this.render.push(chart);
                        resolve('ok');
                    }).catch(e => {
                        console.log(e);
                        reject();
                    });
                });
            },
            sex_chart() {
                return new Promise((resolve, reject) => {
                    this.$axios.get(sexUrl).then(res => {
                        const chart = new G2.Chart({
                            container: 'sex',
                            forceFit: true,
                            height: 400
                        });
                        var data = res.data.msg;
                        chart.source(data, {
                            percent: {
                                formatter: function formatter(val) {
                                    val = val * 100 + '%';
                                    return val;
                                }
                            }
                        });
                        chart.legend(false);
                        chart.coord('theta', {
                            radius: 0.75
                        });
                        chart.tooltip({
                            showTitle: false,
                            itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                        });
                        chart.axis('percent', {
                            label: {
                                textStyle: {
                                    fill: "#fff",
                                }
                            }
                        });
                        chart.intervalStack().position('percent').color('title').label('percent', {
                            formatter: function formatter(val, item) {
                                return item.point.title + ': ' + val;
                            },
                            textStyle: {
                                fill: "#fff",
                            },
                        }).tooltip('title*percent', function (title, percent) {
                            percent = percent * 100 + '%';
                            return {
                                name: title,
                                value: percent
                            };
                        }).style({
                            lineWidth: 1,
                            stroke: '#fff'
                        });
                        this.render.push(chart);
                        resolve('ok');
                    }).catch(e => {
                        console.log(e);
                        reject();
                    });
                });
            },
            level_chart() {
                return new Promise((resolve, reject) => {
                    this.$axios.get(levelUrl).then(res => {
                        const data = res.data.msg;
                        this.levelData = data;
                        resolve('ok');
                    }).catch(e => {
                        console.log(e);
                        reject();
                    });
                });
            },
            render_view() {
                for (let item of this.render) {
                    item.render();
                }
            }
        },
        mounted() {
            this.$Spin.show();
            this.init_count();
            Promise.all([
                this.init_info(),
                this.birthday_chart(),
                this.sex_chart(),
                this.level_chart()
            ]).then(v => {
                this.$Spin.hide();
                this.render_view();
            }).catch(e => {
                console.log(e);
                this.$Spin.hide();
            });
        }
    }
</script>

<style lang="less" scoped>
  .container {
    position: absolute;
    margin: 0 auto;
    width: 100%;
    height: 100%;
    padding: 100px;
    display: flex;
    align-items: center;
    text-align: center;
    z-index: 2;
    flex-direction: column;

    .content {
      flex: 0 0 auto;
      display: flex;
      position: relative;
      min-width: 800px;
      max-width: 1500px;
      width: 100%;
      height: 750px;
      flex-direction: column;

      .line {
        display: flex;
        position: relative;
        justify-content: center;
        align-items: center;
      }

      .title {
        font-family: "meow";
        font-size: 22px;
        letter-spacing: 2px;
        margin-bottom: 10px;
        color: #fff;
      }

      .chart {
        width: 90%;
        height: 400px;
      }

      .birthday {
        flex: 1 1 auto;
        display: flex;
        position: relative;
        height: 450px;
        flex-direction: column;
        align-items: center;
      }

      .sex {
        flex: 1 1 auto;
        display: flex;
        position: relative;
        height: 450px;
        flex-direction: column;
        align-items: center;
      }

      .level {
        flex: 1 1 auto;
        display: flex;
        flex-direction: column;
        margin-top: 10px;
        user-select: none;

        .level-chart {
          flex: 0 0 auto;
          display: flex;
          padding-left: 20px;
          padding-right: 20px;
          height: 200px;
          width: 100%;
          margin-top: 10px;
          align-items: center;
          justify-content: space-between;

          .circle-wrap {
            flex: 0 0 auto;
            display: flex;
            position: relative;
            width: 120px;
            height: 120px;
            flex-direction: column;
            align-items: center;
            border-radius: 50%;
            box-shadow: 3px 0px 5px 0px rgba(120, 120, 120, 0.4);
            background-color: rgba(255, 255, 255, .8);

            .level-title {
              margin-top: 20px;
              font-size: 15px;
              width: 70px;
              padding-bottom: 4px;
              border-bottom: #7F828B solid 1px;
            }

            .level-score {
              font-size: 22px;
              margin-top: 10px;
            }
          }
        }
      }
    }

    .footer {
      flex: 0 0 auto;
      display: flex;
      position: absolute;
      bottom: 5vh;
      min-width: 400px;
      max-height: 700px;
      height: 100px;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      font-family: "meow";
      font-size: 20px;
      color: #ffffff;
      font-weight: 600;
    }
  }
</style>
