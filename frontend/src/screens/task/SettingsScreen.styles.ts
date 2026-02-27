import { StyleSheet } from "react-native";
import { COMMON_COLORS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_COLORS.background,
  },

  /* ================= HEADER ================= */

  header: {
    paddingBottom: 30,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTop: {
    alignItems: "flex-end",
    marginTop: 10,
    marginBottom: 15,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
  },

  email: {
    fontSize: 13,
    color: "#E0F2FE",
    marginTop: 4,
  },

  /* ================= STATS GRID ================= */

  statsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  // statCard: {
  //   width: "48%",
  //   backgroundColor: "#FFFFFF",
  //   borderRadius: 16,
  //   padding: 15,
  //   marginBottom: 15,

  //   shadowColor: "#000",
  //   shadowOpacity: 0.05,
  //   shadowRadius: 8,
  //   shadowOffset: { width: 0, height: 4 },
  //   elevation: 3,
  // },


  statCard: {
  width: "48%",
  borderRadius: 18,
  paddingVertical: 20,
  paddingHorizontal: 16,
  marginBottom: 15,

  shadowColor: "#000",
  shadowOpacity: 0.06,
  shadowRadius: 10,
  shadowOffset: { width: 0, height: 4 },
  elevation: 4,
},


  statIcon: {
    fontSize: 20,
    marginBottom: 8,
  },


  statValue: {
  fontSize: 22,
  fontWeight: "800",
},

  // statValue: {
  //   fontSize: 22,
  //   fontWeight: "800",
  //   color: "#111827",
  // },

  statSubtitle: {
    fontSize: 12,
    color: "#6B7280",
    marginTop: 4,
  },

  /* ================= SETTINGS LIST ================= */

  settingsCard: {
    backgroundColor: COMMON_COLORS.card,
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 20,
    paddingVertical: 10,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 20,
  },

  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  settingText: {
    marginLeft: 12,
    fontSize: 14,
    fontWeight: "500",
    color: COMMON_COLORS.textPrimary,
  },
});