import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const SText = styled(Text);
const SView = styled(View);
const STouchableOpacity = styled(TouchableOpacity);

const ButtonClass = 'bg-releaf-green-500 px-20 py-4 rounded-lg';
const TextClass = 'm-auto font-lato-bold text-xl text-white';

const ButtonOutlineClass =
  'border-releaf-green-500 border-[1px] px-20 py-4 rounded-lg';
const TextOutlineClass = 'text-releaf-green-500 font-lato-bold text-xl m-auto';

interface InputButtonProps {
  text: string;
  outline: boolean;
  click: () => void;
}

export const InputButton: React.FC<InputButtonProps> = ({
  text,
  outline,
  click,
}): React.JSX.Element => {
  return (
    <STouchableOpacity onPress={click}>
      <SView className={outline ? ButtonOutlineClass : ButtonClass}>
        <SText className={outline ? TextOutlineClass : TextClass}>{text}</SText>
      </SView>
    </STouchableOpacity>
  );
};
