import { fallbackMovieImage, image342 } from '@/api/moviebd'
import { useNavigation } from 'expo-router'
import React from 'react'
import { Dimensions, Image, ScrollView, Text, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native'

const { width, height } = Dimensions.get('window')

const MovieList = ({ data, title, hideSeeAll }:any) => {

    const navigation = useNavigation()
    return (
        <View className='mb-8' style={{ rowGap: 10 }}>
            <View className='mx-4 flex-row justify-between items-center'>
                <Text className='text-white text-xl'>{title}</Text>
                {
                    !hideSeeAll && (
                        <TouchableOpacity>
                            <Text className='text-[#eab308] text-lg'>See All</Text>
                        </TouchableOpacity>
                    )
                }
            </View>

            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >
                {
                    data.map((item:any, index:any) => (
                        <TouchableWithoutFeedback key={index} onPress={() => navigation.push('MovieScreen', {item} )}>
                            <View className='mr-4 items-center' style={{ rowGap: 5 }}>
                                <Image
                                    resizeMode='cover'
                                    source={{ uri: image342(item?.poster_path) || fallbackMovieImage }}
                                    style={{ width: width * 0.33, height: height * 0.22, borderRadius: 20 }}
                                />

                                <Text className='text-neutral-300 ml-1'>
                                    {item?.title?.length > 14 ? item?.title.slice(0, 14) + '...' : item?.title}
                                </Text>
                            </View>
                        </TouchableWithoutFeedback>
                    ))
                }
            </ScrollView>

        </View>
    )
}


export default MovieList


