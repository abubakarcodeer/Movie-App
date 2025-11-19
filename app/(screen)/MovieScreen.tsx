import { fallbackMovieImage, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '@/api/moviebd'
import { useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Dimensions, Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context'
import Cast from '../components/Cast'
import Loading from '../components/Loading'
import MovieList from '../components/MovieList'

const { width, height } = Dimensions.get('window')
const ios = Platform.OS === 'ios'
const topMargin = ios ? '' : 'mt-3'


const MovieScreen = () => {

    const route = useRoute()
    const { item }: any = route.params
    const navigation = useNavigation()
    const [isFavourite, setIsFavourite] = useState(false)
    const [cast, setCast] = useState([])
    const [movie, setMovie]: any = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [similarMovies, setSimilarMovies] = useState([])

    useEffect(() => {
        // console.log('itemid :', item.id)
        setIsLoading(true)
        getMovieDetails(item.id)
        getMovieCredits(item.id)
        getSimilarMovies(item.id)
    }, [item])

    const getMovieDetails = async (id: any) => {
        const data = await fetchMovieDetails(id)
        // console.log('got movie details: ',data)
        if (data) setMovie(data)
        setIsLoading(false)
    }
    const getMovieCredits = async (id: any) => {
        const data = await fetchMovieCredits(id)
        // console.log('got movie Credits: ',data)
        if (data && data.cast) setCast(data.cast)
    }
    const getSimilarMovies = async (id: any) => {
        const data = await fetchSimilarMovies(id)
        // console.log('got similar movies: ',data)
        if (data && data.results) setSimilarMovies(data.results)
    }
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            className='flex-1 bg-neutral-900'>

            <View className='w-full'>
                <SafeAreaView className={'absolute z-20 w-full flex-row justify-between items-center px-4 ' + topMargin}>
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
                            <Image
                                source={{ uri: image500(movie?.poster_path) || fallbackMovieImage }}
                                style={{ width: width, height: height * 0.55 }}
                                resizeMode='cover' />
                            <LinearGradient
                                colors={['transparent', 'rgba(23,23,23,0.8)', 'rgba(23,23,23,1)']}
                                style={{ width, height: height * 0.40 }}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                                className='absolute bottom-0'
                            />
                        </View>
                    )
                }

            </View>

            <View style={{ marginTop: -(height * 0.09), rowGap: 5 }}>
                <Text className="text-white text-center text-3xl font-bold tracking-wider">
                    {
                        movie?.title
                    }
                </Text>
                <Text className='text-neutral-400 font-semibold text-center'>
                    {`${movie?.status} ∘ ${movie?.release_date?.split('-')[0]} ∘ ${movie?.runtime} min`}
                </Text>
                <View style={{ columnGap: 8 }} className='flex-row justify-center mx-4'>
                    {
                        movie?.genres?.map((genre: any, index: any) => {
                            let showDot = index + 1 !== movie?.genres?.length
                            return (
                                <Text key={index} className='text-neutral-400 font-semibold text-center'>
                                    {genre?.name} {showDot ? '∘' : null}
                                </Text>
                            )
                        })
                    }
                </View>
                <Text className='text-neutral-400 mx-4 '>
                    {
                        movie?.overview
                    }
                </Text>
            </View>

            {cast.length > 0 && <Cast navigation={navigation} cast={cast} />}
            {similarMovies.length > 0 && <MovieList hideSeeAll={true} title={'Similar Movies'} data={similarMovies} />}
        </ScrollView>
    )
}

export default MovieScreen