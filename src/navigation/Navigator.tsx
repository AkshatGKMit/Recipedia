import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Dashboard from '@screens/dashboard/Dashboard';
import MealPlanner from '@screens/mealPlanner/MealPlanner';
import Favorites from '@screens/favorites/Favorites';
import BottomTabView from '@config/bottomTabView/BottomTabView';
import { Routes } from '@constants';

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const Navigator = () => {
  const {
    Dashboard: DashboardRoute,
    Favorites: FavoritesRoute,
    MealPlanner: MealPlannerRoute,
  } = Routes.BottomTabs;

  return (
    <Tab.Navigator tabBar={(props) => <BottomTabView {...props} />}>
      <Tab.Screen
        name={DashboardRoute}
        component={Dashboard}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={MealPlannerRoute}
        component={MealPlanner}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name={FavoritesRoute}
        component={Favorites}
      />
    </Tab.Navigator>
  );
};

export default Navigator;
