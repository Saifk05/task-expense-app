import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* ================= HEADER ================= */
  header: {
    paddingTop: 25,
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    backgroundColor: "#4F8EF7",
  },

  headerTop: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginBottom: 8,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 14,
  },

  name: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  email: {
    color: "#E0E7FF",
    fontSize: 11,
    marginTop: 2,
  },

  /* ================= STATS ================= */
  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 18,
    marginTop: 20,
  },

  statCard: {
    width: "48%",
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  statIcon: {
    fontSize: 16,
  },

  statTitle: {
    fontSize: 14,
    fontWeight: "600",
    marginTop: 8,
    color: "#111827",
  },

  statSubtitle: {
    fontSize: 11,
    color: "#6B7280",
    marginTop: 4,
  },

  /* ================= SETTINGS ================= */
  settingsCard: {
    marginHorizontal: 18,
    marginTop: 12,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 4,
  },

  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },

  settingText: {
    fontSize: 14,
    color: "#111827",
  },

  statValue: {
  fontSize: 15,
  fontWeight: "700",
  marginTop: 6,
  color: "#111827",
},

settingLeft: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
},

logoutButton: {
  marginHorizontal: 20,
  marginTop: 20,
  backgroundColor: "#FFF1F2",
  borderRadius: 16,
  paddingVertical: 14,
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 8,
},

logoutText: {
  color: "#EF4444",
  fontSize: 14,
  fontWeight: "600",
},
});