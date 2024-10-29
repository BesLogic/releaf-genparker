import { styled } from "nativewind";
import { TouchableOpacity, View, Text, GestureResponderEvent, Dimensions } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { BoxItem } from "../../infrastructure/entities/box";
import { Edit } from '../../../assets/images/edit';
import { Logo } from '../../../assets/images/logo'
import { useState } from "react";

const windowWidth = Dimensions.get('window').width;

const SView = styled(View);
const SText = styled(Text);
const STouchableOpacity = styled(TouchableOpacity);
const SLinearGradient = styled(LinearGradient);

const MAX_NAME_LENGTH = 7;

export function Box({ box }: { box: BoxItem }) {
  console.log('a small updates #2')
  const [boxHoldPosition, setBoxHoldPosition] = useState<number>(0);
  const [boxPosition, setBoxPosition] = useState<number>(0);

  const ontouchstart = (ev: GestureResponderEvent) => {
    setBoxHoldPosition(ev.nativeEvent.locationX)
  }

  const ontouchmove = (ev: GestureResponderEvent) => {
    const diff = ev.nativeEvent.pageX - boxHoldPosition
    const pagePercent = (diff / windowWidth) * 100
    if (pagePercent < -60 || pagePercent > 0) return
    if (Math.abs(diff - boxPosition) < 0.5) return
    setBoxPosition(diff)
  }

  const ontouchend = (ev: GestureResponderEvent) => {
    const pagePercent = (boxPosition / windowWidth) * 100
    const diff = ev.nativeEvent.pageX - boxHoldPosition
    setBoxPosition(diff)
    if (pagePercent < -20) {
      setBoxPosition((-60 / 100) * windowWidth)
    } else {
      setBoxPosition(0)
    }
  }

  return (
    <SLinearGradient
      onTouchStart={ontouchstart}
      onTouchMove={ontouchmove}
      onTouchEnd={ontouchend}
      colors={['#8E7556', '#8E7556']}
      className="rounded-3xl w-vw9/10 h-vw9.21/10 elevation-md mb-10"
      style={{ transform: [{ translateX: boxPosition }] }}
    >
      <SView className="top-0 left-0 right-0 bottom-0 absolute h-full z-40 bg-transparent"></SView>
      <SLinearGradient
        colors={['#FABB72', '#D49953']}
        className="rounded-2xl h-vw9/10"
      >
        <SView className="flex-wrap rounded-3xl h-full gap-1 justify-center ml-vw5/100 mr-vw7/100">
          <SView className="flex-wrap justify-end flex-0.5 h-vw5/100 flex-row">
            <SText className="ml-1 uppercase flex-4 text-base font-lato-bold">
              {box.treeName}
            </SText>
            <SText className="text-end font-lato-bold">
              <SText className='text-base'>{box.dateSinceGermination} </SText>
              <SText className='text-sm'>jours</SText>
            </SText>
          </SView>
          {box.seeds
            .reduce((acc, curr, i) => {
              if (i % 5 == 0) acc.push([]);
              acc[acc.length - 1].push(curr);
              return acc;
            }, [])
            .map((seeds, rowIndex) => (
              <SView key={`${rowIndex}`} className="flex-wrap h-full gap-1 flex-1 flex-row">
                {seeds.map((seed, i) => (
                  <SLinearGradient
                    colors={['#987851', '#f1d4b1']}
                    key={`${rowIndex}-${i}`}
                    className="h-full flex-1 justify-center items-center rounded-md"
                  >
                    <SView className="absolute z-20 top-2 left-0 right-0 bottom-0 bg-releaf-brown-900 rounded-md ml-vw0.5/100 mb-vw0.5/100 mt-vw0.5/100 mr-vw0.5/100"></SView>
                    <SView className="absolute z-10 top-0 left-0 right-0 bottom-0 bg-releaf-brown-800 rounded-md ml-vw0.5/100 mb-vw0.5/100 mt-vw0.5/100 mr-vw0.5/100"></SView>
                    <SView className="h-full z-40 flex-1 bg-transparent justify-end  items-center rounded-md ml-vw0.5/100 mb-vw0.5/100 mt-vw0.5/100 mr-vw0.5/100">
                      <SText className="min-w-full text-center z-30 color-releaf-brown-100">
                        {(seed.name as string).substring(
                          0,
                          MAX_NAME_LENGTH
                        )}
                        {seed.name.length > MAX_NAME_LENGTH ? '.' : ''}
                      </SText>
                    </SView>
                  </SLinearGradient>
                ))}
              </SView>
            ))}
          <SView className="flex-wrap flex-row h-vw7/100 pt-1 pl-1  z-60">
            <SText className="flex-1 text-base font-latoRegular">
              <Logo></Logo>
            </SText>
            <STouchableOpacity
              className='flex-4 flex-row gap-1'
            >
              <SText className="text-center flex-1 text-base font-caveat-bold bg-releaf-brown-500 rounded-l-md">{box.seedsAverageInchHeight} cm</SText>
              <SText className="text-center flex-2 text-base font-caveat-bold bg-releaf-brown-500">{box.germinationDay}</SText>
              <SText className="text-center flex-1 text-base bg-white rounded-r-md elevation-md"><Edit size={20}></Edit></SText>
            </STouchableOpacity>
          </SView>
        </SView>
      </SLinearGradient>
    </SLinearGradient>
  );
}