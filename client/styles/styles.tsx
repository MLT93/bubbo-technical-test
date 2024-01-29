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
  containerModal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#080516",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    /* boxShadow: "0 2px 4px 0 #000000", */
    borderRadius: 20,
    padding: 17,
    width: "90%"
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
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
