import { StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardWidth = (width - 60) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
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
    gap: 15,
  },

  headerTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#DBEAFE",
    fontSize: 13,
    marginTop: 4,
  },

  listContainer: {
    padding: 20,
    paddingBottom: 120,
  },

  card: {
    width: cardWidth,
    borderRadius: 22,
    padding: 20,
    marginBottom: 20,
  },

  cardBalance: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 12,
  },

  cardLabel: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 6,
  },

  /* FAB */


  fabContainer: {
  position: "absolute",
  right: 20,
  bottom: 120,
  alignItems: "flex-end",
},

fab: {
  width: 60,
  height: 60,
  borderRadius: 30,
  backgroundColor: "#1D4ED8",
  justifyContent: "center",
  alignItems: "center",
  shadowColor: "#1D4ED8",
  shadowOpacity: 0.4,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 6 },
  elevation: 8,
},

fabMenu: {
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  paddingVertical: 8,
  marginBottom: 12,
  width: 170,
  shadowColor: "#000",
  shadowOpacity: 0.1,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 5 },
  elevation: 8,
},

fabMenuItem: {
  flexDirection: "row",
  alignItems: "center",
  paddingVertical: 12,
  paddingHorizontal: 15,
},

fabMenuText: {
  marginLeft: 10,
  fontSize: 14,
  fontWeight: "600",
  color: "#1F2937",
},
//   fab: {
//     position: "absolute",
//     bottom: 100,
//     right: 25,
//     backgroundColor: "#1D4ED8",
//     width: 60,
//     height: 60,
//     borderRadius: 30,
//     justifyContent: "center",
//     alignItems: "center",
//     shadowColor: "#1D4ED8",
//     shadowOpacity: 0.4,
//     shadowRadius: 8,
//     shadowOffset: { width: 0, height: 6 },
//     elevation: 6,
//   },

  /* MODAL */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    padding: 20,
  },

  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 15,
  },

  input: {
    backgroundColor: "#F3F4F6",
    padding: 14,
    borderRadius: 14,
    marginBottom: 12,
  },

  saveBtn: {
    backgroundColor: "#1D4ED8",
    paddingVertical: 14,
    borderRadius: 25,
    alignItems: "center",
    marginTop: 10,
  },

  saveText: {
    color: "#fff",
    fontWeight: "700",
  },
});