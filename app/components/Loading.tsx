import React from 'react'
import { Dimensions, View } from 'react-native'
import * as Progress from 'react-native-progress'

const {width,height} = Dimensions.get('window')
const Loading = () => {
  return (
    <View style={{height,width}} className='absolute flex-row justify-center items-center'>
        <Progress.CircleSnail thickness={10} size={120} color={"#eab308"} />
    </View>
  )
}

export default Loading