import React from 'react'
import DocViewer from '../../../libs/doc-viewer'
import Button from '../../../components/button'
import Modal from '../../../components/modal'
import Select from '../../../components/select'
const prefix = 'modal-base'
const code = `import React from 'react'
import Button from '@hi-ui/hiui/es/button'
import Modal from '@hi-ui/hiui/es/modal'\n
class Demo extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      visible: false
    }
  }
  cancelEvent () {
    this.setState({
      visible: false
    })
    console.log("自定义关闭事件")
  }
  render(){
    return(
      <div>
        <Button type="primary" onClick={() => this.setState({visible: true})}>打开</Button>
        <Modal
          title="提示消息"
          visible={this.state.visible}
          onConfirm={this.cancelEvent.bind(this)}
          onCancel={this.cancelEvent.bind(this)}
        >
          <span>一些消息....</span><br/>
          <span>一些消息...</span><br/>
          <span>一些消息...</span>
          <Select
            type='single'
            clearable={false}
            style={{ width: 200 }}
            data={[
              { title:'电视', id:'3', disabled: true },
              { title:'手机', id:'2' },
              { title:'笔记本', id:'4', disabled: true },
              { title:'生活周边', id:'5' },
              { title:'办公', id:'6' },
            ]}
          />
        </Modal>
      </div>
    )
  }
}`

const DemoBase = () => <DocViewer code={code} scope={{ Button, Modal, Select }} prefix={prefix} />
export default DemoBase
