import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* HEADER */
  header: {
    backgroundColor: "#10B981",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#D1FAE5",
    marginTop: 8,
    marginLeft: 34,
  },

  /* PROFILE SECTION */
  profileSection: {
    alignItems: "center",
    marginTop: 10, // balanced overlap
    marginBottom: 25,
  },

  avatarWrapper: {
    position: "relative",
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#FFFFFF",
  },

pickerWrapper: {
  backgroundColor: "#FFFFFF",
  borderRadius: 12,
  marginBottom: 16,
  overflow: "visible",   // FIX
  zIndex: 1000,          // FIX
  elevation: 10,
},



picker: {
  height: 50,
},
  cameraIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#10B981",
    padding: 6,
    borderRadius: 20,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    marginTop: 12,
    color: "#111827",
  },

  /* FORM */
  form: {
    paddingHorizontal: 20,
    zIndex: 100,
     marginBottom: 120,
  },

  
  label: {
    fontSize: 13,
    marginBottom: 6,
    color: "#374151",
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
  },

  halfInput: {
    flex: 1,
  },

  saveButton: {
    backgroundColor: "#10B981",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,
    marginBottom: 40,
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 15,
  },

  genderContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
},

genderOption: {
  flex: 1,
  paddingVertical: 12,
  marginRight: 8,
  borderRadius: 10,
  backgroundColor: "#E5E7EB",
  alignItems: "center",
},

genderOptionActive: {
  backgroundColor: "#10B981",
},

genderText: {
  color: "#374151",
  fontWeight: "500",
},

genderTextActive: {
  color: "#FFFFFF",
},
});