import React, { useRef, useState } from 'react';
import { View, Text, Animated, FlatList, Dimensions, Image } from 'react-native';
const { width, height } = Dimensions.get('window');

const ITEM_WIDTH = width;
const ITEM_HEIGHT = height;

const DATA = [
    {
        title: 'Afro vibes',
        location: 'Mumbai, India',
        date: 'Nov 17th, 2020',
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
    },
    {
        title: 'Jungle Party',
        location: 'Unknown',
        date: 'Sept 3rd, 2020',
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
    },
    {
        title: '4th Of July',
        location: 'New York, USA',
        date: 'Oct 11th, 2020',
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
    },
    {
        title: 'Summer festival',
        location: 'Bucharest, Romania',
        date: 'Aug 17th, 2020',
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
    },
    {
        title: 'BBQ with friends',
        location: 'Prague, Czech Republic',
        date: 'Sept 11th, 2020',
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
    },
    {
        title: 'Festival music',
        location: 'Berlin, Germany',
        date: 'Apr 21th, 2021',
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
    },
    {
        title: 'Beach House',
        location: 'Liboa, Portugal',
        date: 'Aug 12th, 2020',
        poster:
            'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
    },
];

export default function Deck() {

    const [data, setData] = useState(DATA);
    const scrollY = useRef(new Animated.Value(0)).current;
    return (
        <Animated.FlatList
            data={data}
            onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: true }
            )}
            scrollEventThrottle={16}
            pagingEnabled
            contentContainerStyle={{
                // alignItems: 'center',
                // backgroundColor: 'green',
                // flex: 1,
            }}
            keyExtractor={(_, index) => String(index)}
            CellRendererComponent={({ item, index, children, style, ...cellProps }) => {
                const newStyle = [
                    style, { zIndex: data.length - index },
                ];
                return (
                    <View style={newStyle} index={index} {...cellProps}>
                        {children}
                    </View>
                );
            }}
            renderItem={({ item, index }) => {
                const inputRange = [(index - 1) * height, index * height, (index + 1) * height];
                const scale = scrollY.interpolate({
                    inputRange,
                    outputRange: [0.8, 1, 1],
                });
                return (
                    <Animated.View
                        style={{
                            width: ITEM_WIDTH,
                            height: ITEM_HEIGHT,
                            transform: [{ scale }],
                        }}>
                        <Image
                            source={{ uri: item.poster }}
                            style={{
                                width: ITEM_WIDTH,
                                height: ITEM_HEIGHT,
                                borderRadius: 14,
                            }}
                        />
                    </Animated.View>
                );
            }}
        />
    )
}
