import React, { useState, useEffect } from "react";
import {
  ActivityIndicator,
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import axios from "axios";

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from "react-native/Libraries/NewAppScreen";

const App = () => {
  const [things, setThings] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getThings();
  }, []);

  const getThings = async () => {
    try {
      let res = await axios.get(`http://localhost:3001/api/things`);
      setThings(res.data);
      setLoading(false);
      setError(null);
    } catch (err) {
      setError("Error occured");
      setLoading(false);
    }
  };

  const likeClicked = async (id) => {
    try {
      let res = await axios.put(`http://localhost:3001/api/like/${id}`);
      let updatedthings = things.map((thing) =>
        thing.id == id ? res.data : thing
      );
      setThings(updatedthings.sort((a, b) => b.likes - a.likes));
    } catch (err) {
      console.log(err);
    }
  };
  const renderThings = () => {
    return things.map((thing) => {
      return (
        <View style={styles.card} key={thing.id}>
          <View style={styles.cardheader}>
            <Text style={styles.header} >{thing.name}</Text>
            <Text style={styles.paragraph}>likes: {thing.likes}</Text>
          </View>
          <View>
            <TouchableOpacity onPress={() => likeClicked(thing.id)} style={styles.button}>
              <Text>Like</Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    });
  };
  const renderContent = () => {
    if (loading)
      return (
        <>
          <ActivityIndicator size="large" color="#00ff00" />
          <Text style={styles.header}>loading</Text>
        </>
      );
    if (error) return <Text>error occurred</Text>;
    return <ScrollView>{renderThings()}</ScrollView>;
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>{renderContent()}</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    fontSize: 34,
    paddingVertical: 12,
  },
  paragraph: {
    fontSize: 25,
    padding: 10,
  },
  card: {
    flex: 1,
    justifyContent: "space-between",
    flexDirection: 'column',
    marginVertical: 5,
    marginHorizontal: 10,
    borderWidth: 2,
    borderColor: "#ccc",
    minHeight: 200,
  },
  cardheader: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    borderWidth: 1,
    borderColor: '#ccc',
    alignItems: 'center',
    padding: 14,
    shadowColor: '#ddd',
    shadowOffset: {width: 3, height: 3},
    shadowRadius: 3,
    shadowOpacity: 5,
    backgroundColor: 'white',
    margin: 10
  }

});

export default App;
