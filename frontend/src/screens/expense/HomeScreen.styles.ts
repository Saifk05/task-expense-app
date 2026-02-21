import { StyleSheet } from "react-native";
import { COMMON_COLORS, SPACING, TYPOGRAPHY } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COMMON_COLORS.background,
  },

  content: {
    flex: 1,
    paddingHorizontal: SPACING.lg,
    paddingTop: SPACING.xl,
  },

  sectionTitle: {
    ...TYPOGRAPHY.sectionTitle,
    marginBottom: SPACING.lg,
    color: COMMON_COLORS.textPrimary,
  },

  card: {
    backgroundColor: COMMON_COLORS.card,
    padding: SPACING.lg,
    borderRadius: 14,
    marginBottom: SPACING.md,

    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },

  cardTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: COMMON_COLORS.textPrimary,
  },

  cardSubtitle: {
    marginTop: SPACING.xs,
    color: COMMON_COLORS.textSecondary,
    fontSize: 13,
  },

  scrollContent: {
  paddingHorizontal: 20,
  paddingTop: 25,
  paddingBottom: 120, // space for bottom tab
},

chart: {
  borderRadius: 16,
  marginBottom: 25,
},
});