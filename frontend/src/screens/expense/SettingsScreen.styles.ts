import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  /* HEADER */
  header: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },

  headerTop: {
    alignItems: "flex-end",
    marginBottom: 10,
  },

  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 14,
  },

  name: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  subtitle: {
    color: "#DBEAFE",
    fontSize: 13,
    marginTop: 4,
  },

  /* STAT CARDS */
  statsGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: 20,
  },

  statCard: {
    width: "48%",
    borderRadius: 20,
    padding: 18,
  },

  statValue: {
    fontSize: 20,
    fontWeight: "700",
    marginTop: 8,
    color: "#111827",
  },

  statLabel: {
    fontSize: 13,
    marginTop: 4,
    color: "#6B7280",
  },

  /* SETTINGS LIST */
  settingsCard: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 6,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 18,
  },

  settingLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  settingText: {
    fontSize: 15,
    color: "#111827",
    fontWeight: "500",
  },
});