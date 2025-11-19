import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image342 } from '@/api/moviebd'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import Loading from '../components/Loading'
import MovieList from '../components/MovieList'

const { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios'
const verticalMargin = ios ? '' : 'my-3'

const PersonScreen = () => {
    const router = useRoute()
    const { person }: any = router.params

    const navigation = useNavigation()
    const [isFavourite, setIsFavourite] = useState(false)
    const [personMovies, setPersonMovies] = useState([])
    const [isPerson, setIsPerson]: any = useState({})
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getPersonDetails(person.id)
        getPersonMovies(person.id)
    }, [person])

    const getPersonDetails = async (id: any) => {
        const data = await fetchPersonDetails(id)
        // console.log("got person details: ", data)
        if (data) setIsPerson(data)
        setIsLoading(false)
    }
    const getPersonMovies = async (id: any) => {
        const data = await fetchPersonMovies(id)
        // console.log("got person Movies: ", data)
        if (data && data.cast) setPersonMovies(data.cast)
        setIsLoading(false)
    }
    return (
        <ScrollView className='bg-neutral-800'
            contentContainerStyle={{ paddingBottom: 20 }}>
            <SafeAreaView className={'w-full flex-row justify-between items-center px-4 ' + verticalMargin}>
                <TouchableOpacity onPress={() => navigation.goBack()} style={{ borderRadius: 10, backgroundColor: '#eab308', padding: 1 }}>
                    <ChevronLeftIcon size={28} strokeWidth={2.5} color={'white'} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setIsFavourite(!isFavourite)}>
                    <HeartIcon size={35} color={`${isFavourite ? '#eab308' : 'white'}`} />
                </TouchableOpacity>
            </SafeAreaView>

            {
                isLoading ? <Loading /> : (
                    <View>
                        <View className='flex-row justify-center'>
                            <View className='items-center rounded-full overflow-hidden h-72 w-72 border border-neutral-500' style={ios ? { shadowColor: 'gray', shadowRadius: 40, shadowOffset: { width: 0, height: 5 }, shadowOpacity: 1 } : { elevation: 50, shadowColor: '#fff' }}
                            >
                                <Image
                                    source={{ uri: image342(isPerson?.profile_path) || fallbackPersonImage }}
                                    style={{ width: width * 0.74, height: height * 0.43 }}
                                    resizeMode='cover'
                                />
                            </View>

                        </View>

                        <View className='mt-6'>
                            <Text className="text-3xl text-white font-bold text-center">
                                {isPerson?.name}
                            </Text>
                            <Text className="text-base text-neutral-500 text-center">
                                {isPerson?.place_of_birth || 'UnKonwn'}
                            </Text>
                        </View>
                        <View className='mx-3 p-4 mt-6 flex-row justify-between items-center bg-neutral-700 rounded-full'>
                            <View className=' border-r-2 border-r-neutral-300 px-2 items-center'>
                                <Text className='text-white font-semibold'>Gender</Text>
                                <Text className='text-neutral-300 text-sm'>{isPerson?.gender === 1 ? "Female" : 'Male'}</Text>
                            </View>
                            <View className=' border-r-2 border-r-neutral-300 px-2 items-center'>
                                <Text className='text-white font-semibold'>Birthday</Text>
                                <Text className='text-neutral-300 text-sm'>{isPerson?.birthday || 'UnKnown'}</Text>
                            </View>
                            <View className=' border-r-2 border-r-neutral-300 px-2 items-center'>
                                <Text className='text-white font-semibold'>Known for</Text>
                                <Text className='text-neutral-300 text-sm'>{isPerson?.known_for_department || 'Unknown'}</Text>
                            </View>
                            <View className='px-2 items-center'>
                                <Text className='text-white font-semibold'>Popularity</Text>
                                <Text className='text-neutral-300 text-sm'>{isPerson?.popularity?.toFixed(2) + '%' || 'Unknown'}</Text>
                            </View>
                        </View>
                        <View className='my-6 mx-4 space-y-2'>
                            <Text className='text-white text-lg'>Biography</Text>
                            <Text className='text-neutral-400 tracking-wide'>
                                {
                                    isPerson?.biography || 'N/A'
                                }
                            </Text>
                        </View>

                        <MovieList data={personMovies} title={'Movies'} hideSeeAll={false} />
                    </View>
                )
            }
        </ScrollView>
    )
}

export default PersonScreen