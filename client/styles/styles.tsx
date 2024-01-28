import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerBetween: {
    flex: 1,
    alignItems: "stretch",
    justifyContent: "space-between",
  },
  containerCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    textAlign: "center",
    gap: 10,
  },
  containerCenterRow: {
    flexDirection: "row",
    alignItems: "center",
    textAlign: "center",
    justifyContent: "space-between",
    gap: 30,
  },
  button: {
    width: 137,
    textAlign: "center",
    alignItems: "center",
    padding: 13,
    margin: 10,
    backgroundColor: "blue",
    borderRadius: 10,
  },
  buttonStretch: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "blue",
  },
  buttonText: {
    color: "white",
  },
  titleText: {
    fontSize: 21,
    fontWeight: "bold",
    textDecorationLine: "underline",
    marginTop: 16,
  },
  subtitleText: {
    fontSize: 19,
    fontWeight: "bold",
  },
  normalText: {
    fontSize: 17,
    fontWeight: "normal",
  },
});

export { styles };
