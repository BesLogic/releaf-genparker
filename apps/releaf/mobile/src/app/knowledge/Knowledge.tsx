import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import DatePicker from 'react-native-date-picker'

export const Knowledge = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  return (
    <View>
      <Text>Knowledge</Text>
      <>
        <Button title="Open" onPress={() => setOpen(true)} />
        <DatePicker
          modal
          open={open}
          date={date}
          onConfirm={(date) => {
            setOpen(false)
            setDate(date)
          }}
          onCancel={() => {
            setOpen(false)
          }}
        />
      </>
    </View>
  );
};
