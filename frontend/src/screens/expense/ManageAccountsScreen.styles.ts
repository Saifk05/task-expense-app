import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* HEADER */
  header: {
  backgroundColor: "#3B82F6",
  paddingTop: 55,
  paddingHorizontal: 20,
  paddingBottom: 30,
  borderBottomLeftRadius: 30,
  borderBottomRightRadius: 30,
},

headerRow: {
  flexDirection: "row",
  alignItems: "center",
},

headerText: {
  marginLeft: 12,
},

backButton: {
  backgroundColor: "rgba(255,255,255,0.2)",
  width: 38,
  height: 38,
  borderRadius: 10,
  justifyContent: "center",
  alignItems: "center",
},

headerTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#FFFFFF",
},

headerSubtitle: {
  fontSize: 14,
  color: "#DBEAFE",
  marginTop: 3,
},
  /* BALANCE */

  balanceCard: {
    backgroundColor: "#3985F7",
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 20,
  },

  balanceLabel: {
    color: "#DBEAFE",
    fontSize: 14,
  },

  balanceAmount: {
    fontSize: 34,
    fontWeight: "700",
    color: "#FFFFFF",
    marginTop: 4,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 14,
    color: "#111827",
    paddingHorizontal: 20,
  },

  /* ACCOUNT CARD */

  accountCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginHorizontal: 20,
    marginBottom: 12,
  },

  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  accountInfo: {
    flex: 1,
  },

  accountName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#111827",
  },

  accountType: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 2,
  },

  accountBalance: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },

  /* FLOATING BUTTON */

  addButton: {
    position: "absolute",
    bottom: 90,
    right: 25,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#111827",
    justifyContent: "center",
    alignItems: "center",
    elevation: 6,
  },
});