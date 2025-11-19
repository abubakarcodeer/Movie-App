import { fallbackPersonImage, image185 } from '@/api/moviebd'
import { Image, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

const Cast = ({ cast, navigation }) => {

    return (
        <View style={{ marginVertical: 20 }}>
            <Text className='text-white text-lg mx-4 mb-5'>Top Cast</Text>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
            >

                {
                    cast && cast.map((person, index) => (
                        <TouchableOpacity onPress={() => navigation.navigate('PersonScreen', { person })} key={index} className='mr-4 items-center'>
                            <View className='items-center justify-center' style={{ width: 65, height: 65, borderWidth: 2, borderColor: 'gray', borderRadius: 30 }}>
                                <Image
                                    source={{ uri: image185(person?.profile_path) || fallbackPersonImage }}
                                    style={{ width: '100%', height: "100%", borderRadius: 25 }}
                                    resizeMode='cover' />
                            </View>
                            <Text className='text-white text-xs mt-1'>
                                {
                                    person?.character?.length > 10 ? person?.character.slice(0, 10) + '...' : person?.character
                                }
                            </Text>
                            <Text className='text-neutral-400 text-xs mt-1'>
                                {
                                    person?.original_name?.length > 10 ? person?.original_name.slice(0, 10) + '...' : person?.original_name
                                }
                            </Text>

                        </TouchableOpacity>
                    ))
                }

            </ScrollView>
        </View>
    )
}

export default Cast