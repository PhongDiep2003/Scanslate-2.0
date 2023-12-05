import { StyleSheet } from "react-native";
import { colors } from "../../base";
export const navigation_styles = StyleSheet.create({
  TabBar: {
    backgroundColor: colors.bottom_tab,
    position: 'absolute',
    bottom: 25,
    left: 20,
    right: 20,
    borderRadius: 100,
    height: 90,
    shadowColor: colors.shadow,
    shadowOffset: {
      width:0,
      height: 5
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 2
  },
  TabBarIconContainer: {
    height:90,
    top: 15,
    justifyContent: 'center',
    alignItems:'center',
   
  },
  TabBarIconContainer_Active: {
    backgroundColor: colors.active_tab,
    borderRadius:100,
    width: 90,
  }
})