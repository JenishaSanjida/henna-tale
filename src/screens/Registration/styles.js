import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {

    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    width: '80%',
    height: 40,
    marginBottom: 10,
    paddingLeft: 10,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 4,
    width: '80%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});          