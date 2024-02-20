import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  containerBetween: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  containerCenter: {
    alignItems: "center",
    justifyContent: "center",
    margin: 1,
    padding: 10,
  },
  containerCenterRow: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  containerFlatListCenter: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    width: "90%",
  },
  containerCenterEnd: {
    alignItems: "center",
    justifyContent: "flex-end",
  },
  containerModal: {
    justifyContent: "center",
    alignItems: "center",
    margin: 20,
    backgroundColor: "#13117a",
    shadowColor: "#7a93a550",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
    borderRadius: 20,
    padding: 17,
    width: "90%",
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
  containerStretch: {
    width: "100%",
    textAlign: "center",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#13117a",
  },
  buttonText: {
    color: "white",
  },
  titleText: {
    color: "#5a9ae6",
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
  placeholderContainer: {
    appearance: "none",
    margin: 0,
    alignItems: "stretch",
    border: "0px solid black",
    flexBasis: "auto",
    flexShrink: 0,
    boxSizing: "border-box",
    resize: "none",
    paddingLeft: 10,
    paddingRight: 10,
    justifyContent: "center",
  },
  placeholderText: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    color: "#86939e",
    fontSize: 18,
    flex: 1,
    minHeight: 40,
    paddingTop: 10,
  },
  placeholderBottom: {
    borderTopWidth: 1,
    borderColor: "#86939e",
  },
  placeholderBottomText: {
    margin: 5,
  },
});

export { styles };
