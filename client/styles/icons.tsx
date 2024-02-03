import { SocialIcon, SocialMediaType } from "@rneui/themed";
import React from "react";
import { View } from "react-native";

const objectIcons = {
  icon: {
    github: "github",
  },
};

type SocialIconsComponentProps = {};

const SocialIcons: React.FunctionComponent<SocialIconsComponentProps> = () => {
  return (
    <>
      <View>{objectIcons.icon.github}</View>
    </>
  );
};

export { SocialIcons };
