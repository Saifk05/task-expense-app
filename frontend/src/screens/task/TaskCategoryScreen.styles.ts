import { StyleSheet, Dimensions } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

const CARD_SPACING = 16;
const HORIZONTAL_PADDING = 16;

/*
  Strict 2-column layout formula:
  Total width = screen width
  Remove horizontal padding (left + right)
  Remove spacing between two cards (CARD_SPACING)
*/
const CARD_WIDTH =
  (SCREEN_WIDTH - HORIZONTAL_PADDING * 2 - CARD_SPACING) / 2;

export default StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: '#F3F4F6',
  },

  /* ================= HEADER ================= */

  header: {
    backgroundColor: '#10B981',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 35,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#FFFFFF',
    marginLeft: 12,
  },

  headerSubtitle: {
    fontSize: 14,
    color: '#D1FAE5',
    marginTop: 8,
    marginLeft: 34,
  },

  /* ================= GRID ================= */

  gridContainer: {
    paddingHorizontal: HORIZONTAL_PADDING,
    paddingTop: 20,
    paddingBottom: 150, // 🔥 space for bottom tab + FAB
  },

  gridCard: {
    width: CARD_WIDTH,
    marginBottom: CARD_SPACING,
    borderRadius: 20,
    padding: 20,
    minHeight: 120,
    justifyContent: 'space-between',
  },

  gridText: {
    marginTop: 20,
    fontSize: 15,
    fontWeight: '600',
    color: '#111827',
  },

  /* ================= BOTTOM SHEET ================= */

  sheetContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 15,
  },

  sheetTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 20,
  },

  subCard: {
    backgroundColor: '#F9FAFB',
    padding: 14,
    borderRadius: 12,
    marginBottom: 12,
  },

  subText: {
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },

  /* ================= FAB ================= */

  fabContainer: {
    position: 'absolute',
    bottom: 90, // 🔥 sits above bottom tab safely
    right: 20,
    alignItems: 'flex-end',
  },

  fab: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#10B981',
    justifyContent: 'center',
    alignItems: 'center',

    // Android shadow
    elevation: 6,

    // iOS shadow
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 4 },
  },

  fabOption: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 20,
    marginBottom: 12,
    elevation: 4,
  },

  /* ================= FORM ================= */

  input: {
    backgroundColor: '#F3F4F6',
    padding: 14,
    borderRadius: 12,
    marginBottom: 15,
  },

  createBtn: {
    backgroundColor: '#10B981',
    padding: 15,
    borderRadius: 14,
    alignItems: 'center',
  },
});