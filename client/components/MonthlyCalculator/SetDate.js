import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const SetDate = () => {
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDate(currentDate);
  };

  return (
    <View style={styles.container}>
      <DateTimePicker
        testID="dateTimePicker"
        value={date}
        mode={'date'}
        is24Hour={true}
        display="default"
        onChange={onChange}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center', // Center the DateTimePicker
  },
});

export default SetDate;
