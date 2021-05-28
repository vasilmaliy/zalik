import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  ScrollView,
  Text,
  TouchableHighlight,
} from 'react-native';
import Drink from '../Drink/Drink';
import {Appbar, Searchbar} from 'react-native-paper';
import {SwipeRow} from 'react-native-swipe-list-view';
import DrinkDetail from '../DrinkDetail/DrinkDetail';
import AddDrink from '../AddDrink';

const searchURL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=f';

const ListViewController = () => {
  const [drinks, setDrinks] = useState([]);
  const [drink, setDrink] = useState(null);
  const [showDrinkDetail, setShowDrinkDetail] = useState(false);
  const [addDrink, setAddDrink] = useState(false);

  useEffect(() => {
    fetch(searchURL)
      .then(response => response.json())
      .then(json => {
        setDrinks(json.drinks);
      })
      .catch(error => alert(error));
  }, []);

  useEffect(() => {
    if (drink != null) {
      setDrink(drink);
    }
  }, [showDrinkDetail]);

  const deleteDrinkHandler = idDrink => {
    let allDrinks = [...drinks];
    let filteredList = allDrinks.filter(drink => {
      return !(idDrink === drink.idDrink);
    });
    setDrinks(filteredList);
  };

  const closeAddDrinkHandler = () => {
    setAddDrink(!addDrink);
  };


  const addDrinkHandler = (title, subtitle) => {
    let newDrink = {
      strDrink: title,
      strCategory: subtitle,
      strDrinkThumb: null,
    };
    let allDrinks = [...drinks];
    allDrinks.unshift(newDrink);
    
    setDrinks(allDrinks);
  };

  if (addDrink) {
    return (
      <AddDrink
        close={closeAddDrinkHandler.bind(this)}
        addBookHandler={addDrinkHandler.bind(this)}
      />
    );
  }


  if (showDrinkDetail) {
    return (
      <View>
        <Appbar.Header>
          <Appbar.BackAction
            onPress={() => {
              setShowDrinkDetail(false);
            }}
          />
        </Appbar.Header>
        <DrinkDetail drink={drink} />
      </View>
    );
  } else {
    let filteredData = drinks;

    return (
      <SafeAreaView>
          <Appbar.Header>
         
            <View>
              <Appbar.Action icon="plus" onPress={() => setAddDrink(!addDrink)} />
            </View>
          
        </Appbar.Header>
        <ScrollView style={styles.scrollView}>
          {filteredData.length == 0 ? (
            <Text style={{marginLeft: '35%', marginTop: 30}}>
              No items found
            </Text>
          ) : (
            <View></View>
          )}
          {filteredData.map(drink => (
            <View key={drink}>
              <View style={styles.standalone}>
                <SwipeRow rightOpenValue={-75} leftOpenValue={75}>
                  <TouchableOpacity
                    style={styles.standaloneRowBack}
                    onPress={() => {
                      deleteDrinkHandler(drink.idDrink);
                    }}>
                    <Text style={styles.backTextWhite}>Delete</Text>
                    <Text style={styles.backTextWhite}>Delete</Text>
                  </TouchableOpacity>

                  <TouchableHighlight
                    onPress={() => {
                      setShowDrinkDetail(true);
                      setDrink(drink);
                    }}>
                    <Drink key={drink.idDrink} drink={drink} />
                  </TouchableHighlight>
                </SwipeRow>
              </View>
            </View>
          ))}
        </ScrollView>
      </SafeAreaView>
    );
  }
};

const width_proportion = '80%';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  searchbar: {
    width: width_proportion,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  headerbar: {
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    paddingHorizontal: 35,
    paddingBottom: 35,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    marginTop: 25,
  },
  buttonClose: {
    marginLeft: 300,
    backgroundColor: '#F194FF',
    width: 40,
    height: 40,
  },
  buttonAdd: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 1,
    marginTop: 10,
  },
  input: {
    height: 40,
    width: 300,
    margin: 12,
    borderWidth: 1,
    borderRadius: 5,
  },

  standalone: {
    marginVertical: 10,
    flex: 1,
    alignItems: 'stretch',
  },

  standaloneRowBack: {
    alignItems: 'center',
    backgroundColor: 'red',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    height: 165,
    width: '90%',
    marginLeft: '5%',
    marginTop: 10,
    borderRadius: 5,
    fontSize: 32,
  },
  backTextWhite: {
    color: '#FFF',
  },
});

export default ListViewController;
