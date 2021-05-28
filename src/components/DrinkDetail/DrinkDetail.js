import React from 'react'
import {
    View,
    StyleSheet,
    StatusBar,
    useEffect,
    ActivityIndicator,
    Text,
    Image,
    ScrollView,
} from 'react-native';

function DrinkDetail({drink}) {

    if( drink.idDrink) {
    return (
        <ScrollView>
            <View style={styles.container}>
                <View style={styles.imageBook}>
                    <Image style={styles.imageBook} style={{ width: 150, height: 150 }} source={{uri: drink.strDrinkThumb}}/>
                </View>
                <View style={styles.details}>
                    <Text ><Text style={styles.details}>strInstructions:</Text> {drink.strInstructions} </Text>
                    <Text><Text style={styles.details}>strIngredient1:</Text> {drink.strIngredient1} </Text>
                    <Text><Text style={styles.details}>strMeasure1:</Text> {drink.strMeasure1} </Text>
                    <Text><Text style={styles.details}>strIngredient2:</Text> {drink.strIngredient2} </Text>
                    <Text><Text style={styles.details}>strMeasure2:</Text> {drink.strMeasure2} </Text>
                    <Text><Text style={styles.details}>strIngredient3:</Text> {drink.strIngredient3} </Text>
                    <Text><Text style={styles.details}>strMeasure3:</Text> {drink.strMeasure3} </Text>
                    <Text><Text style={styles.details}>strIngredient3:</Text> {drink.strIngredient3} </Text>
                    <Text><Text style={styles.details}>strMeasure3:</Text> {drink.strMeasure3} </Text>
                   
                </View>
            </View>
        </ScrollView>
    )
    } else {
      return <ActivityIndicator styles={{padding: 24}} size="large" color="#0000ff" />
    }
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: StatusBar.currentHeight || 0,
      marginBottom: 70,
    },
    imageBook: {
      flex: 1,
      alignItems: 'center',
    },
    details: {
      flex: 1,
      fontSize: 14,
      fontWeight: 'bold',
      marginHorizontal: 15,
    },
    block: {
        marginTop: 40
    }
  });

export default DrinkDetail
