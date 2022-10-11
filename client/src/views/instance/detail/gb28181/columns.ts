import { h } from 'vue'
import { NTime, NButton } from 'naive-ui'
import { BasicTable } from '@/components/Table'
import { gb28181Invite } from '@/api/instance'
const channelsColumns = (m7sid) => [
  {
    title: '通道编号',
    key: 'DeviceID',
    width: 100
  },
  {
    title: '拉流状态',
    render(row) {
      return row.LivePublisher
        ? h('text', '🟢')
        : h(
            NButton,
            {
              tertiary: true,
              circle: true,
              type: 'primary',
              onClick: () => {
                gb28181Invite(m7sid, row.ParentID, row.DeviceID)
              }
            },
            '▶️'
          )
    },
    width: 50
  },
  {
    title: 'Name',
    key: 'Name',
    width: 50
  },
  {
    title: 'Status',
    key: 'Status',
    width: 50
  },
  {
    title: 'Manufacturer',
    key: 'Manufacturer',
    width: 50
  },
  {
    title: 'Model',
    key: 'Model',
    width: 50
  },
  {
    title: 'Owner',
    key: 'Owner',
    width: 50
  },
  {
    title: 'Address',
    key: 'Address',
    width: 120
  },
  {
    title: '经度',
    key: 'Longitude',
    width: 50
  },
  {
    title: '纬度',
    key: 'Latitude',
    width: 50
  }
]
export const columns = (m7sid) => [
  {
    type: 'expand',
    expandable: (rowData) => rowData.Channels.length > 0,
    renderExpand: (rowData) => {
      return h(BasicTable, {
        pagination: false,
        dataSource: rowData.Channels,
        columns: channelsColumns(m7sid),
        title: '通道',
        titleTooltip: rowData.ID
      })
    }
  },
  {
    title: '设备编号',
    key: 'ID',
    width: 150
  },
  {
    title: 'Name',
    key: 'Name',
    width: 70
  },
  {
    title: 'Status',
    key: 'Status',
    width: 70
  },
  {
    title: 'Manufacturer',
    key: 'Manufacturer',
    width: 100
  },
  {
    title: 'Model',
    key: 'Model',
    width: 50
  },
  {
    title: 'Owner',
    key: 'Owner',
    width: 70
  },
  {
    title: 'RegisterTime',
    key: 'RegisterTime',
    width: 130,
    render(row) {
      return h(NTime, { time: new Date(row.RegisterTime), type: 'relative' })
    }
  },
  {
    title: 'UpdateTIme',
    key: 'UpdateTIme',
    width: 130,
    render(row) {
      return h(NTime, { time: new Date(row.UpdateTIme), type: 'relative' })
    }
  },

  {
    title: 'NetAddr',
    key: 'NetAddr',
    width: 120
  },

  {
    title: 'Channels',
    key: 'Channels',
    width: 70,
    render(row) {
      return h('text', row.Channels.length)
    }
  }
]
