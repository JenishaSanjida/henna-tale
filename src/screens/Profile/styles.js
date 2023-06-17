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
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  timeSlot: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#F1F1F1',
    marginBottom: 10,
    borderRadius: 8,
  },
  bookedTimeSlot: {
    backgroundColor: '#FFC1C1',
  },
  timeSlotText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  timeSlotStatus: {
    fontSize: 14,
    color: 'gray',
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
  imageUploadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 10,
    // justifyContent: 'space-between',
  },
  portfolioImageContainer: {
    width: '32%',
    aspectRatio: 1,
    marginBottom: 10,
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
  },
  uploadButtonText: {
    marginLeft: 8,
    color: '#fff',
    fontWeight: 'bold',
  },
});