import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F4F6F8",
  },

  /* ================= HEADER ================= */

  header: {
    height: 190,
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
    marginRight: 14,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#DBEAFE",
    fontSize: 14,
    marginTop: 4,
  },

  /* ================= PROFILE SECTION ================= */

  profileSection: {
    alignItems: "center",
    marginTop: -60,
  },

  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#FFFFFF",
    backgroundColor: "#E5E7EB",
  },

  name: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 14,
    color: "#111827",
  },

  email: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  editBtn: {
    marginTop: 18,
    backgroundColor: "#2563EB",
    paddingVertical: 10,
    paddingHorizontal: 30,
    borderRadius: 25,
  },

  editText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },

  /* ================= CARD ================= */

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginTop: 35,
    borderRadius: 22,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },

  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 20,
  },

  menuLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    marginLeft: 14,
    fontSize: 15,
    color: "#374151",
  },
});