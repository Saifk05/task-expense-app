import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  scrollContent: {
    paddingBottom: 120,
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

  passwordWrapper: {
    position: "relative",
  },

  input: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 16,
    paddingRight: 45,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  eyeIcon: {
    position: "absolute",
    right: 15,
    top: 18,
  },

  saveBtn: {
    marginTop: 30,
    backgroundColor: "#1D4ED8",
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: "center",
    shadowColor: "#1D4ED8",
    shadowOpacity: 0.4,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 15,
  },
});