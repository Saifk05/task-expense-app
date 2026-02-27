import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },

  /* HEADER */

  header: {
    paddingTop: 70,
    paddingBottom: 45,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },

  headerTitle: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "700",
  },

  headerSubtitle: {
    color: "#D1FAE5",
    fontSize: 14,
    marginTop: 6,
  },

  /* STATS CARDS */

  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    marginTop: -30,
    marginBottom: 25,
  },

  statCard: {
    backgroundColor: "#FFFFFF",
    width: "48%",
    paddingVertical: 20,
    borderRadius: 20,
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  statNumber: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111827",
  },

  statLabel: {
    marginTop: 4,
    fontSize: 13,
    color: "#6B7280",
  },

  /* LIVE CARD */

  liveCard: {
    marginHorizontal: 20,
    marginBottom: 25,
    padding: 24,
    borderRadius: 30,

    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 5 },
    elevation: 5,
  },

  liveHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  liveSub: {
    fontSize: 13,
    color: "#334155",
  },

  liveTitle: {
    fontSize: 24,
    fontWeight: "700",
    marginTop: 4,
    color: "#0F172A",
  },

  arcContainer: {
    alignItems: "center",
    marginTop: 30,
  },

  arcPercent: {
    position: "absolute",
    bottom: 10,
    fontSize: 28,
    fontWeight: "700",
    color: "#0F172A",
  },

  /* WEEKLY + PERFORMANCE CARDS */

  scoreCard: {
    marginHorizontal: 20,
    marginTop: 20,
    padding: 24,
    borderRadius: 26,

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  scoreTitle: {
    fontSize: 14,
    color: "#475569",
  },

  scoreValue: {
    fontSize: 34,
    fontWeight: "800",
    marginVertical: 10,
    color: "#0F172A",
  },

  scoreSub: {
    fontSize: 13,
    color: "#64748B",
  },

  /* CATEGORY CARDS */

  categoryContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
    marginBottom: 150,
  },

  categoryCard: {
    borderRadius: 26,
    padding: 22,
    marginBottom: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  categoryTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#0F172A",
  },

  categoryExample: {
    fontSize: 13,
    color: "#475569",
    marginTop: 6,
  },

  circleProgress: {
    width: 65,
    height: 65,
    borderRadius: 32.5,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },

  circleText: {
    fontWeight: "800",
    fontSize: 16,
  },

  /* FLOATING BUTTON */

  fabWrapper: {
    position: "absolute",
    bottom: 100,
    right: 25,
    alignItems: "flex-end",
  },

  fabMenu: {
    position: "absolute",
    bottom: 75,
    right: 0,
    alignItems: "flex-end",
  },

  fabPill: {
    backgroundColor: "#E2E8F0",
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 20,

    shadowColor: "#000",
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },

  fabPillText: {
    fontWeight: "600",
    color: "#0F172A",
  },

  fab: {
    backgroundColor: "#0F172A",
    width: 65,
    height: 65,
    borderRadius: 32.5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 10,
  },

  fabIcon: {
    color: "#fff",
    fontSize: 26,
    fontWeight: "600",
  },
});