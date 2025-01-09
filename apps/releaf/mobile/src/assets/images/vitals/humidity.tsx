import Svg, { Path } from "react-native-svg";

export const Humidity = (props: { value: number }) => {
  if (props.value > 0.8) {
    return (
      <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <Path d="M40 46C40 50.4183 36.4183 54 32 54C27.5817 54 24 50.4183 24 46C24 41.5817 32 30 32 30C32 30 40 41.5817 40 46Z" fill="#00C4DF" />
        <Path d="M26.5325 46.2773C26.3786 43.7274 30.5628 36.5822 30.5628 36.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
        <Path d="M60 46C60 50.4183 56.4183 54 52 54C47.5817 54 44 50.4183 44 46C44 41.5817 52 30 52 30C52 30 60 41.5817 60 46Z" fill="#00C4DF" />
        <Path d="M46.5325 46.2773C46.3786 43.7274 50.5628 36.5822 50.5628 36.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
        <Path d="M20 46C20 50.4183 16.4183 54 12 54C7.58172 54 4 50.4183 4 46C4 41.5817 12 30 12 30C12 30 20 41.5817 20 46Z" fill="#00C4DF" />
        <Path d="M6.53255 46.2773C6.37857 43.7274 10.5628 36.5822 10.5628 36.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
        <Path d="M50 26C50 30.4183 46.4183 34 42 34C37.5817 34 34 30.4183 34 26C34 21.5817 42 10 42 10C42 10 50 21.5817 50 26Z" fill="#00C4DF" />
        <Path d="M36.5325 26.2773C36.3786 23.7274 40.5628 16.5822 40.5628 16.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
        <Path d="M30 26C30 30.4183 26.4183 34 22 34C17.5817 34 14 30.4183 14 26C14 21.5817 22 10 22 10C22 10 30 21.5817 30 26Z" fill="#00C4DF" />
        <Path d="M16.5325 26.2773C16.3786 23.7274 20.5628 16.5822 20.5628 16.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
      </Svg>
    )
  } else if (props.value > 0.6) {
    return (
      <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
        <Path d="M40 23C40 27.4183 36.4183 31 32 31C27.5817 31 24 27.4183 24 23C24 18.5817 32 7 32 7C32 7 40 18.5817 40 23Z" fill="#00C4DF" />
        <Path d="M26.5325 23.2773C26.3786 20.7274 30.5628 13.5822 30.5628 13.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
        <Path d="M56 36C56 40.4183 52.4183 44 48 44C43.5817 44 40 40.4183 40 36C40 31.5817 48 20 48 20C48 20 56 31.5817 56 36Z" fill="#00C4DF" />
        <Path d="M42.5325 36.2773C42.3786 33.7274 46.5628 26.5822 46.5628 26.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
        <Path d="M24 36C24 40.4183 20.4183 44 16 44C11.5817 44 8 40.4183 8 36C8 31.5817 16 20 16 20C16 20 24 31.5817 24 36Z" fill="#00C4DF" />
        <Path d="M10.5325 36.2773C10.3786 33.7274 14.5628 26.5822 14.5628 26.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
        <Path d="M40 49C40 53.4183 36.4183 57 32 57C27.5817 57 24 53.4183 24 49C24 44.5817 32 33 32 33C32 33 40 44.5817 40 49Z" fill="#00C4DF" />
        <Path d="M26.5325 49.2773C26.3786 46.7274 30.5628 39.5822 30.5628 39.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
      </Svg>
    )
  } else if (props.value > 0.4) {
    return <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <Path d="M40 36C40 40.4183 36.4183 44 32 44C27.5817 44 24 40.4183 24 36C24 31.5817 32 20 32 20C32 20 40 31.5817 40 36Z" fill="#00C4DF" />
      <Path d="M26.5325 36.2773C26.3786 33.7274 30.5628 26.5822 30.5628 26.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
      <Path d="M60 36C60 40.4183 56.4183 44 52 44C47.5817 44 44 40.4183 44 36C44 31.5817 52 20 52 20C52 20 60 31.5817 60 36Z" fill="#00C4DF" />
      <Path d="M46.5325 36.2773C46.3786 33.7274 50.5628 26.5822 50.5628 26.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
      <Path d="M20 36C20 40.4183 16.4183 44 12 44C7.58172 44 4 40.4183 4 36C4 31.5817 12 20 12 20C12 20 20 31.5817 20 36Z" fill="#00C4DF" />
      <Path d="M6.53255 36.2773C6.37857 33.7274 10.5628 26.5822 10.5628 26.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
    </Svg>
  } else if (props.value > 0.2) {
    return <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <Path d="M50 36C50 40.4183 46.4183 44 42 44C37.5817 44 34 40.4183 34 36C34 31.5817 42 20 42 20C42 20 50 31.5817 50 36Z" fill="#00C4DF" />
      <Path d="M36.5325 36.2773C36.3786 33.7274 40.5628 26.5822 40.5628 26.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
      <Path d="M30 36C30 40.4183 26.4183 44 22 44C17.5817 44 14 40.4183 14 36C14 31.5817 22 20 22 20C22 20 30 31.5817 30 36Z" fill="#00C4DF" />
      <Path d="M16.5325 36.2773C16.3786 33.7274 20.5628 26.5822 20.5628 26.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
    </Svg>
  } else {
    return <Svg width="64" height="64" viewBox="0 0 64 64" fill="none">
      <Path d="M40 36C40 40.4183 36.4183 44 32 44C27.5817 44 24 40.4183 24 36C24 31.5817 32 20 32 20C32 20 40 31.5817 40 36Z" fill="#00C4DF" />
      <Path d="M26.5325 36.2773C26.3786 33.7274 30.5628 26.5822 30.5628 26.5822" stroke="white" stroke-width="2" stroke-linecap="round" />
    </Svg>
  }
}
