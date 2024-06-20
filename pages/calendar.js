import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const CalendarApp = () => {
  const [date, setDate] = useState(new Date());
  const [month, setMonth] = useState(date.getMonth());
  const [year, setYear] = useState(date.getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay();
  const prevDays = new Date(year, month, 0).getDate();

  const prevMonth = () => {
    setMonth(month - 1);
    if (month === 0) {
      setYear(year - 1);
    }
  };

  const nextMonth = () => {
    setMonth(month + 1);
    if (month === 11) {
      setYear(year + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.calendar}>
        <View style={styles.month}>
          <TouchableOpacity onPress={prevMonth}><Text>Prev</Text></TouchableOpacity>
          <Text>{months[month]} {year}</Text>
          <TouchableOpacity onPress={nextMonth}><Text>Next</Text></TouchableOpacity>
        </View>
        <View style={styles.weekdays}>
          <Text style={styles.weekday}>Sun</Text>
          <Text style={styles.weekday}>Mon</Text>
          <Text style={styles.weekday}>Tue</Text>
          <Text style={styles.weekday}>Wed</Text>
          <Text style={styles.weekday}>Thu</Text>
          <Text style={styles.weekday}>Fri</Text>
          <Text style={styles.weekday}>Sat</Text>
        </View>
        <View style={styles.days}>
          {[...Array(firstDayIndex).keys()].map((_, index) => (
            <Text key={index} style={styles.prevDate}>{prevDays - index}</Text>
          ))}
          {[...Array(daysInMonth).keys()].map((day) => (
            <TouchableOpacity key={day} style={styles.day}><Text>{day + 1}</Text></TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  calendar: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
  },
  month: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  weekdays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  weekday: {
    flex: 1,
    textAlign: 'center',
  },
  days: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  day: {
    width: '14.2857%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: '2%',
  },
  prevDate: {
    width: '14.2857%',
    aspectRatio: 1,
    justifyContent: 'center',
    alignItems: 'center',
    color: '#ccc',
    marginBottom: '2%',
  },
});

export default CalendarApp;
