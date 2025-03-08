// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { Text, PlatformPressable } from '@react-navigation/elements';
// import { useLinkBuilder, useTheme } from '@react-navigation/native';
import { Feather, Fontisto, MaterialCommunityIcons } from '@expo/vector-icons';
import { View, TouchableOpacity, StyleSheet } from 'react-native';

import { appColors } from '~/utils/styles';

type RouteNames = 'index' | 'two' | 'create' | 'account' | 'more';

export default function MyTabBar({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  // const { colors } = useTheme();
  // const { buildHref } = useLinkBuilder();

  const icon = {
    index: (props: any) => (
      <Fontisto name="home" size={22} color={props.color} {...props} />
    ),
    two: (props: any) => (
      <Fontisto name="search" size={22} color={props.color} {...props} />
    ),
    create: (props: any) => (
      <Feather name="plus-square" size={22} color={props.color} {...props} />
    ),
    account: (props: any) => (
      <MaterialCommunityIcons
        name="briefcase-outline"
        size={22}
        color={props.color}
        {...props}
      />
    ),
    more: (props: any) => (
      <Feather
        name="more-horizontal"
        size={22}
        color={props.color}
        {...props}
      />
    ),
  };

  return (
    <View style={styles.tabBar}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        // console.log('route name: ', route.name);

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            // href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabBarButton}>
            {icon[route.name as RouteNames]({
              color: isFocused ? appColors?.gradientTwo : appColors?.grey3,
            })}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

// function MyTabs() {
//   return (
//     <NavigationContainer>
//       <Tab.Navigator tabBar={(props: BottomTabBarProps) => <MyTabBar {...props} />}>
//         <Tab.Screen name="Home" component={Home} />
//         {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}
//       </Tab.Navigator>
//     </NavigationContainer>
//   );
// }

const styles = StyleSheet.create({
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: appColors.white,
    position: 'absolute',
    bottom: 45,
    marginHorizontal: 50,
    paddingVertical: 11,
    borderRadius: 13,
    borderCurve: 'continuous',
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  tabBarButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: 'red',
    // height: 40,
  },
});
