import { useNavigation } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Platform, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import { SafeAreaView } from 'react-native-safe-area-context'
import { fetchTopRatedMovies, fetchTrendingMovies, fetchUpcomingMovies } from '../../api/moviebd'
import Loading from '../components/Loading'
import MovieList from '../components/MovieList'
import TrendingMovies from '../components/TrendingMovies'


const ios = Platform.OS === 'ios'
const HomeScreen = () => {

  const [trending, setTrending] = useState([])
  const [Upcoming, setUpcoming] = useState([])
  const [topRated, setTopRated] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    getTrendingMovies();
    getUpcomingMovies();
    getTopRatedMovies();
  }, [])

  const getTrendingMovies = async () => {
    const data = await fetchTrendingMovies()
    // console.log('got trending movies: ', data)
    if (data && data.results) setTrending(data.results)
    setIsLoading(false)
  }
  const getUpcomingMovies = async () => {
    const data = await fetchUpcomingMovies()
    // console.log('got upcoming movies: ', data)
    if (data && data.results) setUpcoming(data.results)

  }
  const getTopRatedMovies = async () => {
    const data = await fetchTopRatedMovies()
    // console.log('got topRated movies: ', data)
    if (data && data.results) setTopRated(data.results)
  }

  return (
    <View className='flex-1 bg-neutral-800'>

      <SafeAreaView className={`${ios ? '-pb-2' : 'py-3'}`}>
        <View className='flex-row justify-between items-center mx-4'>
          <Bars3CenterLeftIcon size={30} strokeWidth={2} color={'white'} />
          <Text
            className='text-white text-3xl font-bold'>
            <Text className='text-[#eab308]'>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('SearchScreen')}>
            <MagnifyingGlassIcon size={30} strokeWidth={2} color={'white'} />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {
        isLoading ? <Loading /> : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}>

            {trending.length > 0 && <TrendingMovies data={trending} />}

            <MovieList title={'Upcoming'} hideSeeAll={false} data={Upcoming} />

            <MovieList title={'Top Rated'} hideSeeAll={false} data={topRated} />

          </ScrollView>
        )
      }
    </View>
  )
}

export default HomeScreen