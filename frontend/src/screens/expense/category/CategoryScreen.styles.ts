import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* ================= HEADER ================= */

  header: {
    paddingTop: 55,
    paddingBottom: 35,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  headerTextContainer: {
    marginLeft: 12,
    flex: 1,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  headerSubtitle: {
    fontSize: 14,
    color: "#E8F1FF",
    marginTop: 4,
  },

  backButton: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
  },

  /* ================= GRID ================= */

  list: {
    padding: 16,
    paddingTop: 20,
    paddingBottom: 180,
  },

  row: {
    justifyContent: "space-between",
  },

  card: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,

    position: "relative",
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1F2937",
  },

  arrow: {
    position: "absolute",
    right: 12,
    top: 12,
  },

  /* ================= MODAL ================= */

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "flex-end",
  },

  modalContainer: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 22,
    maxHeight: "80%",
  },

  closeButton: {
    position: "absolute",
    right: 15,
    top: 15,
    zIndex: 10,
  },

  /* ================= SHEET HEADER ================= */

  sheetHeader: {
    alignItems: "center",
    marginBottom: 10,
  },

  sheetIcon: {
    width: 60,
    height: 60,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  typeChip: {
    marginTop: 6,
    paddingHorizontal: 12,
    paddingVertical: 5,
    backgroundColor: "#EEF4FF",
    borderRadius: 14,
  },

  typeText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#3985F7",
  },

  /* ================= SUBCATEGORY ================= */

  subCard: {
    width: "30%",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 14,
    alignItems: "center",
    marginBottom: 15,
  },

  subIcon: {
    backgroundColor: "#EEF4FF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 6,
  },

  subText: {
    fontSize: 12,
    textAlign: "center",
    fontWeight: "500",
    color: "#374151",
  },

  /* ================= QUICK ADD ================= */

  quickAdd: {
    marginTop: 15,
    backgroundColor: "#3985F7",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 14,
    borderRadius: 14,

    shadowColor: "#3985F7",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
  },

  quickAddText: {
    color: "#FFFFFF",
    marginLeft: 8,
    fontWeight: "600",
  },



  deleteBar: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  paddingHorizontal: 18,
  paddingVertical: 12,
  backgroundColor: "#FEE2E2",
},

deleteCount: {
  fontWeight: "600",
  color: "#991B1B",
},

deleteActions: {
  flexDirection: "row",
  gap: 20,
},

deleteText: {
  color: "#EF4444",
  fontWeight: "700",
},

cancelText: {
  color: "#374151",
  fontWeight: "500",
},

checkbox: {
  position: "absolute",
  top: 10,
  left: 10,
  zIndex: 10,
},

cardSelected: {
  borderWidth: 2,
  borderColor: "#EF4444",
  backgroundColor: "#FEF2F2",
},

  /* ================= FLOATING BUTTON ================= */

  fab: {
    position: "absolute",
    bottom: 100,
    right: 20,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: "#3985F7",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#3985F7",
    shadowOpacity: 0.35,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 10,
    elevation: 10,
  },

  /* ================= FAB MENU ================= */

  fabMenu: {
    position: "absolute",
    bottom: 180,
    right: 20,
    alignItems: "flex-end",
  },

  fabOption: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingVertical: 12,
    paddingHorizontal: 18,
    borderRadius: 30,
    marginBottom: 12,

    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 5,
  },


  input: {
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 12,
  padding: 14,
  marginTop: 20,
  marginBottom: 16,
  backgroundColor: "#F9FAFB",
  fontSize: 15,
},

label: {
  fontSize: 13,
  fontWeight: "600",
  color: "#374151",
  marginBottom: 6,
  marginTop: 12,
},

dropdownContainer: {
  borderWidth: 1,
  borderColor: "#E5E7EB",
  borderRadius: 12,
  backgroundColor: "#F9FAFB",
  marginBottom: 20,
  justifyContent: "center",
},

picker: {
  height: 45,
  paddingHorizontal: 10,
},

typeContainer: {
  flexDirection: "row",
  flexWrap: "wrap",
  gap: 10,
  marginBottom: 20,
},

typeChipActive: {
  backgroundColor: "#3985F7",
  borderColor: "#3985F7",
},

typeTextActive: {
  color: "#FFFFFF",
},

  fabText: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
    marginLeft: 8,
  },


  pickerWrapper: {
  backgroundColor: "#F9FAFB",
  borderRadius: 10,
  borderWidth: 1,
  borderColor: "#E5E7EB",
  marginTop: 5,
  marginBottom: 10,
},
});