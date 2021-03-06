import Tabs from '../../../components/tabs'
import React from 'react'
import DocViewer from '../../../libs/doc-viewer'

const prefix = 'tabs-draggable'
const desc = 'Tabs 排序功能'
const rightOptions = ['水平方向', '垂直方向']

const code = [
  {
    code: `import Tabs from '@hi-ui/hiui/es/tabs'
import React from 'react'\n
class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      panes: [{
        tabTitle: '我的订单',
        tabId: 'tabId-1'
      },
      {
        tabTitle: '团购订单',
        tabId: 'tabId-2',
        closeable: false
      },
      {
        tabTitle: '以旧换新订单',
        tabId: 'tabId-3'
      },{
        tabTitle: '购买资格',
        tabId: 'tabId-5'
      },]
    }
  }
  dragHandle(dragNode,dropNode) {
    console.log(dragNode,dropNode)
  }
  render () {
    return (
        <Tabs 
          type="line"
          defaultActiveId='tabId-2' 
          draggable={true} 
          onTabClick={(tab,e) => console.log(tab)} 
          onDragStart={(tab)=>console.log(tab)}   
          onDropEnd = {this.dragHandle.bind(this)} 
          onDrop={this.dragHandle.bind(this)} 
        >
          {
            this.state.panes.map((pane, index) => {
              return (
                <Tabs.Pane
                  tabTitle={pane.tabTitle}
                  tabId={pane.tabId}
                  closeable={pane.closeable}
                  key={index}
                >
                  <div style={{padding: '16px'}}>{pane.tabTitle}</div>
                </Tabs.Pane>
              )
            })
          }
      </Tabs>
     
    )
  }
}`,
    opt: ['水平方向']
  },
  {
    code: `import Tabs from '@hi-ui/hiui/es/tabs'
import React from 'react'\n
class Demo extends React.Component {
  constructor() {
    super()
    this.state = {
      panes: [{
        tabTitle: '我的订单',
        tabId: 'tabId-1'
      },
      {
        tabTitle: '团购订单',
        tabId: 'tabId-2',
        closeable: false
      },
      {
        tabTitle: '以旧换新订单',
        tabId: 'tabId-3'
      },{
        tabTitle: '购买资格',
        tabId: 'tabId-5'
      },]
    }
  }
  
  dragHandle(dragNode,dropNode) {
    console.log(dragNode,dropNode)
  }
  render () {
    return (
      <Tabs 
        type="line"
        draggable={true} 
        placement='vertical' 
        defaultActiveId='tabId-2' 
        onTabClick={(tab,e) => console.log(tab)} 
        onDragStart={(tab)=>console.log(tab)}   
        onDropEnd = {this.dragHandle.bind(this)} 
        onDrop={this.dragHandle.bind(this)} 
      >
      {
        this.state.panes.map((pane, index) => {
          return (
            <Tabs.Pane
              tabTitle={pane.tabTitle}
              tabId={pane.tabId}
              closeable={pane.closeable}
              key={index}
            >
              <div style={{padding: '16px'}}>{pane.tabTitle}</div>
            </Tabs.Pane>
          )
        })
      }
    </Tabs>
    )
  }
}`,
    opt: ['垂直方向']
  }
]

const Demo = () => (
  <DocViewer
    code={code}
    scope={{ Tabs }}
    desc={desc}
    prefix={prefix}
    rightOptions={rightOptions}
  />
)
export default Demo
