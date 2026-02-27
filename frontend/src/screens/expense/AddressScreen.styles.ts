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

  form: {
    paddingHorizontal: 20,
    marginTop: 30,
  },

  label: {
    fontSize: 13,
    color: "#6B7280",
    marginBottom: 6,
    marginTop: 15,
  },

  input: {
    backgroundColor: "#fff",
    padding: 14,
    borderRadius: 14,
  },

  saveBtn: {
    marginTop: 30,
    backgroundColor: "#1D4ED8",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 15,
  },
});