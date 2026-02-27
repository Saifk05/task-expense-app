import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  header: {
    height: 150,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  backBtn: {
    marginRight: 15,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#DBEAFE",
    marginTop: 4,
  },

profileWrapper: {
  alignItems: "center",
  marginTop: -40,
  position: "relative",
},

  avatar: {
    width: 95,
    height: 95,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
  },

cameraBtn: {
  position: "absolute",
  bottom: 0,
  right: "45%",
  transform: [{ translateX: 30 }],
  backgroundColor: "#2563EB",
  width: 32,
  height: 32,
  borderRadius: 16,
  justifyContent: "center",
  alignItems: "center",
  borderWidth: 2,
  borderColor: "#fff",
},

avatarContainer: {
  width: 100,
  height: 100,
  position: "relative",
  alignItems: "center",
  justifyContent: "center",
},
  form: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  half: {
    width: "48%",
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
  },

  input: {
    backgroundColor: "#fff",
    padding: 12,
    borderRadius: 12,
  },

  saveBtn: {
    marginTop: 20,
    backgroundColor: "#1D4ED8",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
  },
});