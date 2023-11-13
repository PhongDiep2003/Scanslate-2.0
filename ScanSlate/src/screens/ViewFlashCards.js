import React from 'react';
import { View, StyleSheet, ScrollView, Pressable} from 'react-native';
import FlashCard from '../components/FlashCard';
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from '../../base';
import { AntDesign } from '@expo/vector-icons'; 
// Mockup data
const flashcards = [
  {
    id: 1,
    imageUrl: 'file:///var/mobile/Containers/Data/Application/7DA7B9D1-635B-4D08-9C7E-6F8D3D990D0B/Library/Caches/ExponentExperienceData/%2540anonymous%252FScanSlate-4591f8de-6b03-4a48-8022-c9c819e2e138/Camera/2D359EDA-05FB-4807-B1A2-D08117B95306.jpg',
    title: 'Title 1',
    correctPercentage: '83%',
  },
  {
    id: 2,
    imageUrl: 'file:///var/mobile/Containers/Data/Application/7DA7B9D1-635B-4D08-9C7E-6F8D3D990D0B/Library/Caches/ExponentExperienceData/%2540anonymous%252FScanSlate-4591f8de-6b03-4a48-8022-c9c819e2e138/Camera/A9EC2DAD-3FC8-414C-A928-62B872FC0DEB.jpg', 
    title: 'Title 2',
    correctPercentage: '93%',
  },
  {
    id: 3,
    imageUrl: 'file:///var/mobile/Containers/Data/Application/7DA7B9D1-635B-4D08-9C7E-6F8D3D990D0B/Library/Caches/ExponentExperienceData/%2540anonymous%252FScanSlate-4591f8de-6b03-4a48-8022-c9c819e2e138/Camera/051CF4B1-00B2-4EC4-AC88-FB8576A53C3A.jpg',
    title: 'Title 3',
    correctPercentage: '80%',
  },
];

const ViewFlashCards = ({navigation}) => {
  const insets = useSafeAreaInsets()
  return (
    <View style={[styles.container, {
                                      paddingTop: insets.top,
                                      paddingBottom: insets.bottom,
                                      paddingLeft: insets.left,
                                      paddingRight: insets.right,
                                    }]}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        {flashcards.map((card) => (
          <FlashCard key={card.id} {...card} />
        ))}
      </ScrollView>
      {/* Icon for setting */}
      <Pressable style={[styles.settingIconContainer, {top: insets.top, right:insets.right}]}
                 onPress={() => navigation.navigate('Setting')}>
                <AntDesign name="user" size={30} color="black" />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.primary
  },
  scrollView: {
    flex: 1,
  },
  settingIconContainer: {
    backgroundColor: colors.bottom_tab,
    padding: 5,
    borderRadius:'100%',
    position:'absolute',
  },
});


export default ViewFlashCards;