import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  /* ---------- SCREEN ---------- */
  container: {
    flex: 1,
    backgroundColor: "#F4F6F9",
  },

  /* ---------- HEADER ---------- */

header: {
  backgroundColor: "#10B981", // exact same green
  paddingHorizontal: 20,
  paddingTop: 20,
  paddingBottom: 35,
  borderBottomLeftRadius: 25,
  borderBottomRightRadius: 25,
},

headerRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
},

headerTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#FFFFFF",
},

headerSubtitle: {
  fontSize: 14,
  color: "#D1FAE5",
  marginTop: 8,
  marginLeft: 34, // aligns exactly under title like Profile
},

  headerActions: {
    flexDirection: "row",
    alignItems: "center",
  },

  /* ---------- LIST ---------- */
  listContent: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 40,
  },

  /* ---------- CARD ---------- */
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },

  readCard: {
    opacity: 0.6,
  },

  /* ---------- ICON ---------- */
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 15,
  },

  /* ---------- TEXT ---------- */
  textContainer: {
    flex: 1,
  },

  title: {
    fontSize: 15,
    fontWeight: "600",
    color: "#111827",
  },

  message: {
    fontSize: 13,
    color: "#6B7280",
    marginTop: 4,
  },

  time: {
    fontSize: 11,
    color: "#9CA3AF",
    marginTop: 6,
  },

  /* ---------- SWIPE ACTIONS ---------- */
  deleteAction: {
    backgroundColor: "#EF4444",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 18,
    marginBottom: 16,
  },

  readAction: {
    backgroundColor: "#10B981",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 18,
    marginBottom: 16,
  },
});

export default styles;