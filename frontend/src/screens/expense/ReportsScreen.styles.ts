import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
    padding: 20,
  },

  balanceCard: {
    backgroundColor: "#3985F7",
    borderRadius: 24,
    padding: 25,
    marginBottom: 20,
  },

  balanceLabel: {
    color: "#DCE8FF",
    fontSize: 14,
  },

  balanceAmount: {
    color: "#fff",
    fontSize: 34,
    fontWeight: "700",
    marginBottom: 10,
  },

  expenseLabel: {
    color: "#DCE8FF",
    fontSize: 14,
  },

  expenseAmount: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "600",
  },

  creditCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
  },

  creditTitle: {
    fontSize: 14,
    color: "#6B7280",
  },

  creditAmount: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 4,
  },

  creditBar: {
    height: 8,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginTop: 12,
  },

  creditFill: {
    height: 8,
    backgroundColor: "#3985F7",
    borderRadius: 10,
  },

  weeklyCard: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
  },

  weeklyTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 10,
  },

  weekRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 6,
  },

  insightCard: {
    backgroundColor: "#FEF3C7",
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
  },

  insightTitle: {
    fontSize: 15,
    fontWeight: "600",
    marginBottom: 6,
  },

  insightText: {
    color: "#374151",
  },

  highlight: {
    fontWeight: "700",
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 12,
    color: "#111827",
  },

  categoryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
  },

  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },

  categoryName: {
    fontSize: 16,
    fontWeight: "600",
  },

  amount: {
    fontSize: 16,
    fontWeight: "600",
  },

  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 10,
  },

  transactionTitle: {
    fontSize: 15,
    fontWeight: "500",
  },

  transactionAmount: {
    fontSize: 15,
    fontWeight: "600",
  },
});