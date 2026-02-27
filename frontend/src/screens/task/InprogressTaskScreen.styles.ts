import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  /* HEADER */
  header: {
    backgroundColor: "#3498DB", // Blue for in-progress
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    paddingTop: 50,
    paddingBottom: 25,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButton: {
    marginRight: 15,
  },
  title: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#EAF6FF",
    fontSize: 14,
    marginTop: 4,
  },

  /* LIST */
  listContainer: {
    padding: 20,
  },

  /* CARD */
  card: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 15,
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#3498DB",
    elevation: 3,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
  },
  taskDescription: {
    fontSize: 14,
    color: "#666",
  },
});