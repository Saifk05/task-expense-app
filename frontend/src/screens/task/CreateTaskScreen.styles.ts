import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
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

  /* ================= CONTENT ================= */

  content: {
    padding: 20,
    paddingBottom: 80,
  },

  /* ================= INFO CARDS ================= */

  infoCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  infoLabel: {
    fontSize: 12,
    color: '#6B7280',
    marginBottom: 4,
  },

  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },

  /* ================= DATE CARD ================= */

  dateCard: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    marginBottom: 16,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  dateLabel: {
    fontSize: 12,
    color: '#6B7280',
  },

  dateValue: {
    fontSize: 15,
    fontWeight: '600',
    marginTop: 4,
    color: '#111827',
  },

  /* ================= DESCRIPTION ================= */

  textArea: {
    backgroundColor: '#FFFFFF',
    padding: 18,
    borderRadius: 18,
    height: 140,
    textAlignVertical: 'top',
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  /* ================= UPLOAD CARD ================= */

  uploadCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,

    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  uploadText: {
    marginLeft: 10,
    fontSize: 15,
    fontWeight: '500',
    color: '#374151',
  },

  /* ================= IMAGE PREVIEW ================= */

  previewCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    marginBottom: 20,

    shadowColor: '#000',
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  previewImage: {
    width: '100%',
    height: 180,
    borderRadius: 14,
  },

  previewName: {
    marginTop: 10,
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },

  removeBtn: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#EF4444',
    borderRadius: 20,
    padding: 6,
    zIndex: 5,
  },

  /* ================= BUTTON ================= */

  createBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 18,
    borderRadius: 22,
    alignItems: 'center',

    shadowColor: '#10B981',
    shadowOpacity: 0.35,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
  },

  createBtnText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 16,
  },
});