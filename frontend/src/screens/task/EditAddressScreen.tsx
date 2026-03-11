import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import styles from "./EditAddressScreen.styles";
import Icon from "react-native-vector-icons/Ionicons";
import ApiService from "../../services/api.service";
import { showError, showSuccess } from "../../utils/notification.util";

interface Props {
  navigation: any;
}

interface OlaPrediction {
  description?: string;
  terms?: { value: string }[];
  geometry?: {
    location?: {
      lat?: number;
      lng?: number;
    };
  };
}

const EditAddressScreen: React.FC<Props> = ({ navigation }) => {
  const [address, setAddress] = useState("");
  const [building, setBuilding] = useState("");
  const [locality, setLocality] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [latitude, setLatitude] = useState<number | undefined>();
  const [longitude, setLongitude] = useState<number | undefined>();

  const [suggestions, setSuggestions] = useState<OlaPrediction[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  /* ---------------- LOAD ADDRESS ---------------- */

  useEffect(() => {
    loadAddress();
  }, []);

  const loadAddress = async () => {
    try {
      const response = await ApiService.getUserAddress();
      const data = response?.data;

      if (!data) return;

      setAddress(data.address || "");
      setBuilding(data.building || "");
      setLocality(data.locality || "");
      setCity(data.city || "");
      setPincode(data.pincode || "");

      setLatitude(data.latitude ? Number(data.latitude) : undefined);
      setLongitude(data.longitude ? Number(data.longitude) : undefined);
    } catch (error) {
      console.log("Load error", error);
    } finally {
      setInitialLoading(false);
    }
  };

  /* ---------------- SEARCH ---------------- */

  const handleSearch = async (text: string) => {
    setAddress(text);

    if (text.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    try {
      setSearching(true);
      const response = await ApiService.searchLocation(text);
      setSuggestions(response?.data || []);
      setShowSuggestions(true);
    } catch (error) {
      console.log("Search error", error);
    } finally {
      setSearching(false);
    }
  };

  /* ---------------- PARSER ---------------- */

  const parseAddressFromItem = (item: OlaPrediction) => {
    const values: string[] = (item?.terms || []).map((t) => t.value);

    const fullAddress = item?.description || values.join(", ");

    const pin = values.find((v) => /^\d{6}$/.test(v));
    const pinIndex = pin ? values.findIndex((v) => v === pin) : -1;

    const cityIndex = pinIndex > 0 ? pinIndex - 2 : values.length - 3;

    const localityIndex = cityIndex - 1;

    return {
      fullAddress,
      pin,
      cityValue: cityIndex >= 0 ? values[cityIndex] : "",
      localityValue: localityIndex >= 0 ? values[localityIndex] : "",
      lat: item?.geometry?.location?.lat,
      lng: item?.geometry?.location?.lng,
    };
  };

  /* ---------------- SELECT ---------------- */

  const handleSelectSuggestion = (item: OlaPrediction) => {
    const parsed = parseAddressFromItem(item);

    setAddress(parsed.fullAddress);
    setPincode(parsed.pin || "");
    setCity(parsed.cityValue || "");
    setLocality(parsed.localityValue || "");
    setLatitude(parsed.lat);
    setLongitude(parsed.lng);

    setShowSuggestions(false);
  };

  /* ---------------- VALIDATION ---------------- */

  const validate = (): boolean => {
    if (!address.trim()) {
      showError("Address is required");
      return false;
    }

    if (!city.trim()) {
      showError("City is required");
      return false;
    }

    if (!pincode.trim()) {
      showError("Pincode is required");
      return false;
    }

    if (!/^\d{6}$/.test(pincode)) {
      showError("Enter valid 6-digit pincode");
      return false;
    }

    if (building && !/^\d{4}$/.test(building)) {
      showError("Building number must be exactly 4 digits");
      return false;
    }

    return true;
  };

  /* ---------------- SAVE ---------------- */

  const handleSave = async () => {
    if (!validate()) return;

    try {
      setLoading(true);

      await ApiService.updateAddress({
        address,
        building,
        locality,
        city,
        pincode,
        latitude: Number(latitude),
        longitude: Number(longitude),
      });

      showSuccess("Address updated successfully");
      navigation.goBack();
    } catch (error) {
      console.log("Save error", error);
      showError("Failed to update address");
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={{ textAlign: "center", marginTop: 50 }}>
          Loading address...
        </Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Icon name="arrow-back" size={22} color="#FFF" />
          </TouchableOpacity>

          <Text style={styles.headerTitle}>Edit Address</Text>
          <Text style={styles.headerSubtitle}>
            Update your delivery location
          </Text>
        </View>

        {/* <ScrollView
          contentContainerStyle={styles.formContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        > */}

        <ScrollView
            contentContainerStyle={[
              styles.formContainer,
              { paddingBottom: 140 }
            ]}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
          {/* Address */}
          <Text style={styles.label}>Search Address *</Text>
          <TextInput
            style={styles.input}
            placeholder="Search Address"
            value={address}
            onChangeText={handleSearch}
          />

          {searching && (
            <Text style={styles.searchingText}>Searching...</Text>
          )}

          {showSuggestions && suggestions.length > 0 && (
            <View style={styles.suggestionContainer}>
              <FlatList
                data={suggestions}
                keyExtractor={(_, index) => index.toString()}
                keyboardShouldPersistTaps="handled"
                renderItem={({ item }) => (
                  <TouchableOpacity
                    style={styles.suggestionItem}
                    onPress={() => handleSelectSuggestion(item)}
                  >
                    <Text>{item?.description}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          )}

          {/* Building */}
          <Text style={styles.label}>
            Building / House No. (Optional)
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Example: 1023"
            keyboardType="number-pad"
            maxLength={4}
            value={building}
            onChangeText={(text) =>
              setBuilding(text.replace(/[^0-9]/g, ""))
            }
          />

          {/* Locality */}
          <Text style={styles.label}>Locality / Area</Text>
          <TextInput
            style={styles.input}
            placeholder="Locality"
            value={locality}
            onChangeText={setLocality}
          />

          {/* City */}
          <Text style={styles.label}>City *</Text>
          <TextInput
            style={styles.input}
            placeholder="City"
            value={city}
            onChangeText={setCity}
          />

          {/* Pincode */}
          <Text style={styles.label}>Pincode *</Text>
          <TextInput
            style={styles.input}
            placeholder="6 digit pincode"
            keyboardType="number-pad"
            maxLength={6}
            value={pincode}
            onChangeText={(text) =>
              setPincode(text.replace(/[^0-9]/g, ""))
            }
          />

          {/* Save Button */}
          <TouchableOpacity
            style={[
              styles.saveButton,
              loading && { opacity: 0.6 },
            ]}
            onPress={handleSave}
            disabled={loading}
          >
            <Text style={styles.saveButtonText}>
              {loading ? "Saving..." : "Save Address"}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default EditAddressScreen;