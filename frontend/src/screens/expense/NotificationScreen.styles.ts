import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* ================= HEADER ================= */

  header: {
    height: 150,
    paddingTop: 50,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  backBtn: {
    marginRight: 15,
    marginTop: 14,
  },

  titleContainer: {
    flex: 1,
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

  actions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 2,
  },

  markAllBtn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 9,
    borderRadius: 22,
  },

  deleteBtn: {
    backgroundColor: "rgba(255,255,255,0.25)",
    padding: 9,
    borderRadius: 22,
  },

  /* ================= LIST ================= */

  listContainer: {
    paddingHorizontal: 20,
    paddingTop: 25,
    paddingBottom: 120,
  },

  card: {
    backgroundColor: "#FFFFFF",
    padding: 18,
    borderRadius: 18,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  readCard: {
    opacity: 0.6,
  },

  title: {
    fontWeight: "600",
    fontSize: 15,
    color: "#111827",
  },

  message: {
    marginTop: 4,
    color: "#6B7280",
    fontSize: 13,
  },

  /* ================= SWIPE ACTIONS ================= */

  deleteAction: {
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    borderRadius: 18,
    marginBottom: 15,
  },

  readAction: {
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    width: 90,
    borderRadius: 18,
    marginBottom: 15,
  },

  actionText: {
    color: "#fff",
    fontSize: 12,
    marginTop: 4,
    fontWeight: "600",
  },
});