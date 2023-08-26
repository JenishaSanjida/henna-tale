import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  profileInfo: {
    marginLeft: 16,
  },
  profileName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  profileAddress: {
    fontSize: 14,
    color: 'gray',
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  addTimeSlotContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  inputContainer: {
    flex: 1,
    marginRight: 10,
  },
  addButton: {
    minWidth: 80,
  },
  scheduleDay: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  imageUploadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 10,
    marginLeft: 10
    // justifyContent: 'space-between',
  },
  portfolioImageContainer: {
    width: '32%',
    aspectRatio: 1,
    margin: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  portfolioImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#333',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    justifyContent: 'center',
    marginBottom: 10
  },
  uploadButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: 'red',
    borderRadius: 1,
    padding: 4,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginTop: 10,
    marginBottom: 10,
    paddingHorizontal: 10,
    width: '100%'
  },
  photoGrid: {
    paddingHorizontal: 10,
  },
  photoItem: {
    width: '32%',
    aspectRatio: 1,
    margin: 2,
    borderRadius: 8,
  },
  morePhotosButton: {
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  morePhotosButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#424242',
  },
});