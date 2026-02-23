import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F6FA",
  },

  header: {
    backgroundColor: "#20B486",
    paddingTop: 50,
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  backButton: {
    position: "absolute",
    top: 50,
    left: 20,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFF",
    marginLeft: 35,
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#E8F8F3",
    marginTop: 4,
    marginLeft: 35,
  },

  formContainer: {
    padding: 20,
  },

  input: {
    backgroundColor: "#FFF",
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
    fontSize: 15,
    elevation: 2,
  },

  saveButton: {
    backgroundColor: "#20B486",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },

  searchingText: {
  marginBottom: 8,
  color: "#888",
},

suggestionContainer: {
  backgroundColor: "#FFF",
  borderRadius: 10,
  marginBottom: 15,
  maxHeight: 150,
  elevation: 3,
},

suggestionItem: {
  padding: 12,
  borderBottomWidth: 1,
  borderBottomColor: "#EEE",
},

  saveButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
  },
});