import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.View`
  flex: 1;
  padding-top: 70px;
`;

export const HourList = styled.FlatList.attrs({
  numColumns: 3,
  showsVerticalScrollIndicator: false,
  columnWrapperStyle: { justifyContent: 'flex-start' },
})`
  padding: 20px 7%;
`;

export const Hour = styled(RectButton)`
  background: #fff;
  border-radius: 4px;
  padding: 10px;
  width: 30%;
  opacity: ${props => (props.disabled ? 0.6 : 1)};

  align-items: center;
  margin: 0 5px 10px;
`;

export const Title = styled.Text`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;