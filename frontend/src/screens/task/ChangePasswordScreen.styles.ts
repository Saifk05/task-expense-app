import { StyleSheet } from "react-native";

export default StyleSheet.create({
  /* ---------- SCREEN ---------- */
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* ---------- HEADER ---------- */
  header: {
    backgroundColor: "#10B981",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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

  /* ---------- FORM ---------- */
  form: {
    paddingHorizontal: 20,
    marginTop: 25,
  },

  /* ---------- INPUT WRAPPER ---------- */
  inputWrapper: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    borderWidth: 1.5,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  textInput: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: "#111827",
  },

  /* ---------- BUTTON ---------- */
  button: {
    backgroundColor: "#10B981",
    paddingVertical: 15,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,

    shadowColor: "#10B981",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "600",
  },
});