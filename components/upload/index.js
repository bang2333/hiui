import React, { Component } from 'react'
import UploadClick from './UploadClick'
import UploadDrag from './UploadDrag'
import UploadPhoto from './UploadPhoto'
import UploadAvatar from './UploadAvatar'
import UploadPictureCard from './UploadPictureCard'
import './style/index'

export default class Upload extends Component {
  render () {
    const { uploadType } = this.props
    if (uploadType === 'normal') {
      return <UploadClick {...this.props} />
    } else if (uploadType === 'drag') {
      return <UploadDrag {...this.props} />
    } else if (uploadType === 'photo') {
      return <UploadPhoto {...this.props} />
    } else if (uploadType === 'avatar') {
      return <UploadAvatar {...this.props} />
    } else if (uploadType === 'pictureCard') {
      return <UploadPictureCard {...this.props} />
    }
  }
}
