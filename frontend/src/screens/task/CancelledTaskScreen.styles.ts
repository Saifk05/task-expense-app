import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FA",
  },

  /* HEADER */
  header: {
    backgroundColor: "#20B27A", // Green theme
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
    color: "#E8FFF5",
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
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    borderLeftColor: "#20B27A",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  taskTitle: {
    fontSize: 16,
    fontWeight: "700",
    marginLeft: 8,
    color: "#2D2D2D",
    textDecorationLine: "line-through",
    opacity: 0.6,
  },

  taskDescription: {
    fontSize: 14,
    color: "#555",
    marginBottom: 6,
  },

  reasonLabel: {
    marginTop: 6,
    fontSize: 12,
    fontWeight: "600",
    color: "#20B27A",
  },


  categoryBadge: {
  alignSelf: "flex-start",
  backgroundColor: "#E8FFF5",
  paddingVertical: 4,
  paddingHorizontal: 10,
  borderRadius: 20,
  marginBottom: 10,
},

categoryText: {
  fontSize: 12,
  fontWeight: "600",
  color: "#20B27A",
},

  reasonText: {
    fontSize: 13,
    color: "#20B27A",
    fontStyle: "italic",
    marginTop: 2,
  },
});