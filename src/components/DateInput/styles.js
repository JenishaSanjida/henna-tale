import styled from 'styled-components/native';

export const Container = styled.View``;

export const DateButton = styled.TouchableOpacity`
  padding: 0 15px;
  height: 46px;
  background: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  margin: 0 30px;
  flex-direction: row;
  align-items: center;
`;

export const DateText = styled.Text`
  font-size: 14px;
  color: #fff;
  margin-left: 15px;
`;


export const TimePickerContainer = styled.View`
  flex-direction: row;
  align-items: center;
  margin-bottom: 20px;
`;