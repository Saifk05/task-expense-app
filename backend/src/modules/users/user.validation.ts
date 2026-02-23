import { z } from "zod";

/**
 * Update Address Validation
 */
export const updateAddressSchema = z.object({
  address: z.string().min(3, "Address is required"),
  building: z.string().optional(),
  locality: z.string().optional(),
  city: z.string().min(2, "City is required"),
  pincode: z.string().min(4, "Valid pincode required"),
  latitude: z.number().optional(),
  longitude: z.number().optional(),
});

/**
 * Change Password Validation
 */

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(6, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "New password must be at least 8 characters"),
});

/**
 * Search Location Validation
 */
export const searchLocationSchema = z.object({
  name: z.string().min(2, "Search text must be at least 2 characters"),
});

/**
 * Reverse Geocode Validation (coords header)
 */
export const reverseGeocodeSchema = z.object({
  coords: z
    .string()
    .regex(/^-?\d+(\.\d+)?,-?\d+(\.\d+)?$/, "Invalid coords format"),
});