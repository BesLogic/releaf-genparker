import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styled } from 'nativewind';

const SText = styled(Text);
const SView = styled(View);
const STouchableOpacity = styled(TouchableOpacity);

const ButtonClass = 'bg-green-600 px-8 py-5 rounded-lg';
const TextClass = 'm-auto font-semibold text-white';

const ButtonOutlineClass = 'border-green-600 border-[1px] px-8 py-5 rounded-lg';
const TextOutlineClass = 'text-green-600 font-semibold m-auto';

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
