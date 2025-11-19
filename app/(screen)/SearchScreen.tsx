import { fallbackMovieImage, image185, searchMovies } from '@/api/moviebd'
import { useNavigation } from 'expo-router'
import debounce from "lodash.debounce"
import React, { useMemo, useState } from 'react'
import { Dimensions, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { XMarkIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '../components/Loading'

const { width, height } = Dimensions.get('window')

const SearchScreen = () => {

    const navigation = useNavigation()
    const [results, setResults]: any = useState([])
    const [isLoading, setIsLoading] = useState(false)

    const handleSearch = (value: any) => {
        // console.log('value: ',value)
        if (value && value.length > 2) {
            setIsLoading(true)
            searchMovies({
                query: value, include_adult: 'false', language: 'en-US', page: '1',
            }).then(data => {
                setIsLoading(false)
                // console.log('got movies: ',data)
                if (data && data.results) setResults(data.results)
            })
        } else {
            setIsLoading(false)
            setResults([])
        }
    }
    const handleTextDebounce = useMemo(() => debounce(handleSearch, 400), [])

    return (
        <SafeAreaView className='bg-neutral-800 flex-1 py-3'>
            <View
                className='mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full'>
                <TextInput
                    onChangeText={handleTextDebounce}
                    placeholder='Search Movie'
                    placeholderTextColor={'lightgray'}
                    className='pb-2 pl-6 flex-1 text-base font-semibold text-white tracking-wider' />
                <TouchableOpacity
                    onPress={() => navigation.navigate('HomeScreen')}
                    className='rounded-full p-3 m-1 bg-neutral-500'
                >
                    <XMarkIcon size={25} color={'white'} />

                </TouchableOpacity>
            </View>
            {
                isLoading ? <Loading /> : (

                    results.length > 0 ? (
                        <ScrollView
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={{ paddingHorizontal: 15 }}
                        >
                            <Text className='text-white font-semibold ml-1 mb-2'>Results ({results.length})</Text>
                            <View className='flex-row justify-between flex-wrap'
                            >
                                {
                                    results.map((item: any, index: any) => (
                                        <TouchableOpacity
                                            key={index}
                                            onPress={() => navigation.push('screen/MovieScreen', { item })}>
                                            <View className='mb-4' style={{ rowGap: 3 }}>
                                                <Image
                                                    source={{ uri: image185(item?.poster_path) || fallbackMovieImage }}
                                                    style={{ width: width * 0.44, height: height * 0.3, borderRadius: 24 }} />
                                                <Text className='text-neutral-400 ml-1 text-center'>
                                                    {
                                                        item?.title?.length > 27 ? item?.title.slice(0, 27) + '...' : item?.title
                                                    }
                                                </Text>
                                            </View>
                                        </TouchableOpacity>
                                    ))
                                }
                            </View>

                        </ScrollView>
                    ) :
                        <View className='flex-row justify-center '>
                            <Image
                                source={require('../../assets/images/image.png')}
                                resizeMode='cover'
                                style={{ height: 250, width: 250 }} />
                        </View>

                )
            }

        </SafeAreaView>
    )
}

export default SearchScreen

