export const primaryBlue = "#3985F7";

export const chartConfig = {
  backgroundColor: "#FFFFFF",
  backgroundGradientFrom: "#FFFFFF",
  backgroundGradientTo: "#FFFFFF",
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(57, 133, 247, ${opacity})`,
  labelColor: () => "#6B7280",
  propsForDots: {
    r: "5",
    strokeWidth: "2",
    stroke: primaryBlue,
  },
};