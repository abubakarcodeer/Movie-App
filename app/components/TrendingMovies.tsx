import { fallbackMovieImage, image500 } from '@/api/moviebd';
import { useNavigation } from 'expo-router';
import React from 'react';
import { Dimensions, Image, Text, TouchableWithoutFeedback, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';


const { width, height } = Dimensions.get('window')
const TrendingMovies = ({ data }:any) => {
    const navigation = useNavigation()

    const handleClick = (item:any ) => {
        navigation.navigate('MovieScreen', {item})
    }

    return (
        <View className="mb-8 flex-1">
            <Text className="text-white text-xl mx-4 mb-5">Trending</Text>
            <Carousel
            containerStyle={{width:'100%'}}
                width={width * 0.75}
                height={height * 0.42}
                data={data}
                renderItem={({ item }) => (
                    <View
                        style={{
                            alignItems: 'center',
                        }}
                    >
                        <MovieCard item={item} handleClick={handleClick} />
                    </View>
                )}
                mode="parallax"
                modeConfig={{
                    parallaxScrollingScale: 0.9,
                    parallaxScrollingOffset: 60,
                }}
                style={{ alignSelf: 'center' }}
                pagingEnabled
                />

        </View>

    )
}

const MovieCard = ({ item, handleClick }:any) => {
    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                source={{ uri: image500(item.poster_path) || fallbackMovieImage }}
                style={{
                    width: width * 0.6,
                    height: height * 0.4,
                    borderRadius: 24
                }}
                resizeMode='cover'
            />
        </TouchableWithoutFeedback>
    )
}

export default TrendingMovies