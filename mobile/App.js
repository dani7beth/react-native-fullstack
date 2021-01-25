import React, { useState, useEffect } from "react";
import { SafeAreaView, StyleSheet, StatusBar, Text, View } from "react-native";
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
  const renderThings = () => {
    return things.map((thing) => {
      return (
        <View>
          <Text>{thing.name}</Text>
          <Text>{thing.likes}</Text>
        </View>
      );
    });
  };
  const renderContent = () => {
    if (loading) return <Text>loading</Text>;
    if (error) return <Text>error occurred</Text>;
    return renderThings();
  };
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>{renderContent()}</SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
