import React, { useState, useEffect } from 'react';
import { Column } from '@ant-design/charts';
import { GetBalanceSheet } from '../../utils/RequestService';

export default class ProcessWork extends React.Component<any, any>{

    constructor(props) {
        super(props);

        this.state = { data: [] };
    }

    getAPIData = async () => {

        const res = await GetBalanceSheet()
        if(res.Table==null)return;
        if (res.Table.length == 0) return;
        var _data = [];

        for (var i = 0; i < res.Table.length; i++) {
            var item = res.Table[i];
            var qc = item.Quantity == null ? 0 : item.qc;
            var Description = item.Description == null ? 0 : item.Description;
            if (qc > 0) {
                _data.push({ name: Description, value: qc })
            }
        }
        this.setState({ data: _data })
    }

    componentDidMount = async () => {
        await this.getAPIData()

        setInterval(
            async () => {
                await this.getAPIData()
            },
            6000);
    }



    render() {
        const that = this;
    document.onkeydown = function (e: any) {
      var ev = document.all ? window.event : e;
      if (ev.keyCode == 27) {
        that.props.history.push('/')
      }
    }
        const config: any = {
            data: this.state.data,
            xField: 'name',
            yField: 'value',
            label: {
                //position: 'top',
                position: 'middle',
                style: {
                    fill: '#ffffff',
                    opacity: 0.6,
                },
            },
            xAxis: {
                label: {
                    autoHide: false,
                    autoRotate: true,
                },
            },
            meta: {
                type: { alias: '工序' },
                sales: { alias: '返工率' },
            },
        };
        return <Column {...config} style={{ height: this.props.hh }} />;
    }
};

