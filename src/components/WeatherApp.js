import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';
import WeatherService from './WeatherServices.js';

const WeatherApp = () => {
  const [cityName, setCityName] = useState('');
  const [forecast, setForecast] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      setError(null);
      const data = await WeatherService.get5DayForecast(cityName);
      setForecast(data);
    } catch (err) {
      setError('Unable to fetch data. Please check the city name.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Weather in your city</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city name"
        value={cityName}
        onChangeText={setCityName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSearch}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <View>
        {forecast.map((day, index) => (
          <View key={index} style={styles.forecastCard}>
            <Text style={styles.dateText}>Date: {day.date}</Text>
            <View style={styles.forecastDetails}>
              <Text style={styles.header}>Temperature : {day.temp}</Text>
              <View style={styles.tempRow}>
                <Text style={styles.tempLabel}>Min</Text>
                <Text style={styles.tempLabel}>Max</Text>
              </View>
              <View style={styles.tempRow}>
                <Text style={styles.tempValue}>{day.tempMin}°C</Text>
                <Text style={styles.tempValue}>{day.tempMax}°C</Text>
              </View>
              <Text style={styles.detailText}>
                Pressure: {day.pressure} hPa
              </Text>
              <Text style={styles.detailText}>Humidity: {day.humidity}%</Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    color: '#e67e22',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#e67e22',
    borderWidth: 1,
    borderRadius: 5,
    width: '80%',
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#e67e22',
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  errorText: {
    color: 'red',
    marginBottom: 20,
  },
  forecastCard: {
    backgroundColor: '#f39c12',
    padding: 15,
    marginBottom: 20,
    width: '100%',
    borderRadius: 5,
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  forecastDetails: {
    backgroundColor: '#bdc3c7',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  header: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  tempRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 5,
  },
  tempLabel: {
    fontWeight: 'bold',
    color: '#333',
  },
  tempValue: {
    color: '#333',
  },
  detailText: {
    color: '#333',
    marginTop: 5,
  },
});

export default WeatherApp;
