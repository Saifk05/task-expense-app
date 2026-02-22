import { StyleSheet } from "react-native";

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: "#F3F4F6",
  },

  header: {
    backgroundColor: "#10B981",
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  username: {
  fontSize: 14,
  color: "#6B7280",
  marginTop: 4,
},

editButton: {
  marginTop: 16,
  backgroundColor: "#10B981",
  paddingVertical: 10,
  paddingHorizontal: 30,
  borderRadius: 10,
},

editButtonText: {
  color: "#FFFFFF",
  fontSize: 14,
  fontWeight: "600",
},
  /* NEW ROW */
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
    marginLeft: 34, // aligns subtitle under title (22 icon + gap spacing)
  },

  profileSection: {
    alignItems: "center",
    marginTop: 0,
    marginBottom: 25,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    marginBottom: 12,
  },

  name: {
    fontSize: 18,
    fontWeight: "600",
    color: "#111827",
  },

  email: {
    fontSize: 14,
    color: "#6B7280",
    marginTop: 4,
  },

  card: {
    marginHorizontal: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },

  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 18,
    paddingHorizontal: 18,
  },

  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },

  optionText: {
    fontSize: 15,
    color: "#111827",
  },
});