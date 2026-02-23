import { UserRepository } from "./user.repository";
import axios from "axios";
import { env } from "../../config/environments";
import bcrypt from "bcrypt";
import { NotificationRepository } from "../notification/notification.repository";
import { NotificationType } from "@prisma/client";

export class UserService {
  private userRepository = new UserRepository();
  private notificationRepository = new NotificationRepository();

  /* ================= OVERVIEW ================= */

  async getOverview(userId: string) {
    const user =
      await this.userRepository.findOverviewById(userId);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  }

  /* ================= ADDRESS UPDATE ================= */

  async updateAddress(userId: string, payload: any) {
    const updated =
      await this.userRepository.updateAddress(
        userId,
        payload
      );

    // 🔔 Create Notification
    await this.notificationRepository.createNotification({
      userId,
      title: "Address Updated",
      message:
        "Your address was updated successfully.",
      type: NotificationType.SYSTEM,
    });

    return updated;
  }

  /* ================= SEARCH LOCATION ================= */

  async searchLocation(name: string) {
    const response = await axios.get(
      `${env.OLA_MAPS_API}/places/v1/autocomplete`,
      {
        params: {
          input: name,
          api_key: env.OLAMAPS_KEY,
        },
      }
    );

    return response.data?.predictions ?? [];
  }

  /* ================= GET ADDRESS ================= */

  async getAddress(userId: string) {
    const address =
      await this.userRepository.findAddressByUserId(
        userId
      );

    if (!address) {
      throw new Error("User not found");
    }

    return address;
  }

  /* ================= REVERSE GEOCODE ================= */

  async reverseGeocode(lat: string, lng: string) {
    const response = await axios.get(
      `${env.OLA_MAPS_API}/places/v1/reverse-geocode`,
      {
        params: {
          latlng: `${lat},${lng}`,
          api_key: env.OLAMAPS_KEY,
        },
      }
    );

    const results = response.data?.results;

    if (!Array.isArray(results) || results.length === 0) {
      return null;
    }

    const firstResult = results[0];

    const address: any = {
      location: firstResult.geometry?.location,
    };

    (firstResult.address_components || []).forEach(
      (component: any) => {
        const types: string[] = component.types || [];

        if (types.includes("country"))
          address.country = component.long_name;

        if (
          types.includes(
            "administrative_area_level_1"
          )
        )
          address.state = component.long_name;

        if (
          types.includes(
            "administrative_area_level_2"
          )
        )
          address.city = component.long_name;

        if (types.includes("locality"))
          address.locality =
            component.long_name;

        if (types.includes("postal_code"))
          address.postal_code =
            component.long_name;
      }
    );

    return address;
  }

  /* ================= PASSWORD CHANGE ================= */

  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ) {
    const user =
      await this.userRepository.findPasswordByUserId(
        userId
      );

    if (!user) {
      throw new Error("User not found");
    }

    const isMatch = await bcrypt.compare(
      currentPassword,
      user.passwordHash
    );

    if (!isMatch) {
      throw new Error("Incorrect current password");
    }

    const newPasswordHash = await bcrypt.hash(
      newPassword,
      10
    );

    await this.userRepository.updatePassword(
      userId,
      newPasswordHash
    );

    // 🔔 Create Notification
    await this.notificationRepository.createNotification({
      userId,
      title: "Password Updated",
      message:
        "Your password was changed successfully.",
      type: NotificationType.SYSTEM,
    });

    return true;
  }

  /* ================= PROFILE PICTURE NOTIFICATION ================= */
  /* Call this method after successful profile image upload */

  async notifyProfilePictureUpdate(userId: string) {
    await this.notificationRepository.createNotification({
      userId,
      title: "Profile Picture Updated",
      message:
        "Your profile picture was updated successfully.",
      type: NotificationType.SYSTEM,
    });
  }
}