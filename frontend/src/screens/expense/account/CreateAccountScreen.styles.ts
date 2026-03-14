import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  /* HEADER */

  header: {
    backgroundColor: "#3B82F6",
    paddingTop: 55,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },

  backButton: {
    backgroundColor: "rgba(255,255,255,0.25)",
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 13,
    color: "#DBEAFE",
    marginTop: 4,
  },

  /* FORM */

  form: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#0F172A",
    marginBottom: 6,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    backgroundColor: "#FFFFFF",
    fontSize: 14,
    marginBottom: 18,
  },

  /* CREATE BUTTON */

  createButton: {
    backgroundColor: "#3B82F6",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 10,

    shadowColor: "#3B82F6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 4,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});