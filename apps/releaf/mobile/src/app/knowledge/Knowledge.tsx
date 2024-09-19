import { styled } from 'nativewind';
import React, { useState } from 'react';
import { Text, Button, ScrollView } from 'react-native';
import DatePicker from 'react-native-date-picker'

const StyledText = styled(Text)

export const Knowledge = () => {
  const [date, setDate] = useState(new Date())
  const [open, setOpen] = useState(false)
  return (
    <ScrollView>
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
      <StyledText className='text-5xl'>Latos</StyledText>
      <StyledText className='text-5xl font-lato-black'>Lato-Black</StyledText>
      <StyledText className='text-5xl font-lato-black-italic'>Lato-Black-Italic</StyledText>
      <StyledText className='text-5xl font-lato-bold'>Lato-Bold</StyledText>
      <StyledText className='text-5xl font-lato-bold-italic'>Lato-Bold-Italic</StyledText>
      <StyledText className='text-5xl font-lato-regular'>Lato-Regular</StyledText>
      <StyledText className='text-5xl font-lato-italic'>Lato-Italic</StyledText>
      <StyledText className='text-5xl font-lato-light'>Lato-Light</StyledText>
      <StyledText className='text-5xl font-lato-thin'>Lato-Thin</StyledText>
      <StyledText className='text-5xl font-lato-thin-italic'>Lato-Thin-Italic</StyledText>
      <StyledText className='text-5xl '>Caveat</StyledText>
      <StyledText className='text-5xl font-caveat-regular'>Caveat-Regular</StyledText>
      <StyledText className='text-5xl font-caveat-bold'>Caveat-Bold</StyledText>
      <StyledText className='text-5xl font-caveat-medium'>Caveat-Medium</StyledText>
      <StyledText className='text-5xl font-caveat-semi-bold'>Caveat-Semi-Bold</StyledText>
      <StyledText className='text-5xl '>Inter</StyledText>
      <StyledText className='text-5xl font-inter-black'>Inter-Black</StyledText>
      <StyledText className='text-5xl font-inter-black-italic'>Inter-Black-Italic</StyledText>
      <StyledText className='text-5xl font-inter-bold'>Inter-Bold</StyledText>
      <StyledText className='text-5xl font-inter-bold-italic'>Inter-Bold-Italic</StyledText>
      <StyledText className='text-5xl font-inter-regular'>Inter-Regular</StyledText>
      <StyledText className='text-5xl font-inter-italic'>Inter-Italic</StyledText>
      <StyledText className='text-5xl font-inter-light'>Inter-Light</StyledText>
      <StyledText className='text-5xl font-inter-thin'>Inter-Thin</StyledText>
      <StyledText className='text-5xl font-inter-thin-italic'>Inter-Thin-Italic</StyledText>
    </ScrollView>
  );
};
